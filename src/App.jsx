import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Editor from "./components/Editor.jsx";
import EmptyState from "./components/EmptyState.jsx";
import { loadActiveNoteId, loadNotes, saveActiveNoteId, saveNotes } from "./utils/storage.js";

function createNote(seed = {}) {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    icon: "N",
    title: "Untitled",
    content: "# Untitled\n\nStart writing here.",
    pinned: false,
    createdAt: now,
    updatedAt: now,
    ...seed,
  };
}

function starterNotes() {
  return [
    createNote({
      icon: "N",
      title: "Welcome to Notelite",
      pinned: true,
      content:
        "# Welcome to Notelite\n\nA quiet, dark notes workspace for fast thinking.\n\n- Search notes from the sidebar\n- Pin important pages\n- Toggle markdown preview\n\nUse **Ctrl + N** or **Cmd + N** to create a note.",
    }),
  ];
}

export default function App() {
  const [notes, setNotes] = useState(() => {
    const saved = loadNotes();
    return saved.length ? saved : starterNotes();
  });
  const [activeNoteId, setActiveNoteId] = useState(() => loadActiveNoteId());
  const [query, setQuery] = useState("");
  const [showPreview, setShowPreview] = useState(true);

  const activeNote = notes.find((note) => note.id === activeNoteId) ?? notes[0] ?? null;

  useEffect(() => {
    if (!activeNoteId && notes[0]) {
      setActiveNoteId(notes[0].id);
    }
  }, [activeNoteId, notes]);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  useEffect(() => {
    saveActiveNoteId(activeNote?.id ?? null);
  }, [activeNote?.id]);

  useEffect(() => {
    function handleShortcut(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "n") {
        event.preventDefault();
        addNote();
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  });

  const filteredNotes = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return notes;
    }

    return notes.filter((note) => {
      const haystack = `${note.title} ${note.content}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [notes, query]);

  function persistNote(noteId, updates) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : note
      )
    );
  }

  function addNote() {
    const note = createNote();
    setNotes((currentNotes) => [note, ...currentNotes]);
    setActiveNoteId(note.id);
  }

  function deleteNote(noteId) {
    const note = notes.find((item) => item.id === noteId);

    if (!note || !window.confirm(`Delete "${note.title || "Untitled"}"?`)) {
      return;
    }

    const remaining = notes.filter((item) => item.id !== noteId);
    setNotes(remaining);

    if (activeNoteId === noteId) {
      setActiveNoteId(remaining[0]?.id ?? null);
    }
  }

  function duplicateNote(noteId) {
    const note = notes.find((item) => item.id === noteId);

    if (!note) {
      return;
    }

    const duplicate = createNote({
      icon: note.icon,
      title: `${note.title || "Untitled"} copy`,
      content: note.content,
      pinned: false,
    });

    setNotes((currentNotes) => [duplicate, ...currentNotes]);
    setActiveNoteId(duplicate.id);
  }

  function togglePin(noteId) {
    const note = notes.find((item) => item.id === noteId);

    if (note) {
      persistNote(noteId, { pinned: !note.pinned });
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-notelite-bg text-zinc-100 md:flex-row">
      <Sidebar
        activeNoteId={activeNote?.id ?? null}
        notes={filteredNotes}
        query={query}
        onAddNote={addNote}
        onDeleteNote={deleteNote}
        onDuplicateNote={duplicateNote}
        onQueryChange={setQuery}
        onSelectNote={setActiveNoteId}
        onTogglePin={togglePin}
      />

      <main className="min-w-0 flex-1">
        {activeNote ? (
          <Editor
            note={activeNote}
            showPreview={showPreview}
            onChange={persistNote}
            onDelete={deleteNote}
            onDuplicate={duplicateNote}
            onTogglePin={togglePin}
            onTogglePreview={() => setShowPreview((current) => !current)}
          />
        ) : (
          <EmptyState onCreate={addNote} />
        )}
      </main>
    </div>
  );
}
