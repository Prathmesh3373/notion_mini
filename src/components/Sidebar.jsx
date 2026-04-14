import NoteList from "./NoteList.jsx";
import SearchBar from "./SearchBar.jsx";

export default function Sidebar({
  activeNoteId,
  notes,
  query,
  onAddNote,
  onDeleteNote,
  onDuplicateNote,
  onQueryChange,
  onSelectNote,
  onTogglePin,
}) {
  const pinnedNotes = notes.filter((note) => note.pinned);
  const regularNotes = notes.filter((note) => !note.pinned);

  return (
    <aside className="flex max-h-[52vh] w-full shrink-0 flex-col border-b border-notelite-border bg-notelite-panel/95 p-4 md:h-screen md:max-h-none md:w-80 md:border-b-0 md:border-r">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl border border-notelite-border bg-notelite-panelSoft font-semibold">
            N
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100">Notelite</p>
            <p className="text-xs text-notelite-muted">Private workspace</p>
          </div>
        </div>
      </div>

      <button className="soft-button mb-3 w-full text-left" type="button" onClick={onAddNote}>
        + New note
      </button>

      <SearchBar value={query} onChange={onQueryChange} />

      <div className="mt-5 min-h-0 flex-1 overflow-y-auto pr-1">
        {pinnedNotes.length > 0 && (
          <NoteList
            activeNoteId={activeNoteId}
            label="Pinned"
            notes={pinnedNotes}
            onDeleteNote={onDeleteNote}
            onDuplicateNote={onDuplicateNote}
            onSelectNote={onSelectNote}
            onTogglePin={onTogglePin}
          />
        )}

        <NoteList
          activeNoteId={activeNoteId}
          label="Pages"
          notes={regularNotes}
          onDeleteNote={onDeleteNote}
          onDuplicateNote={onDuplicateNote}
          onSelectNote={onSelectNote}
          onTogglePin={onTogglePin}
        />
      </div>

      <p className="mt-4 rounded-xl border border-notelite-border bg-notelite-panelSoft p-3 text-xs leading-relaxed text-notelite-muted">
        Autosaved locally. Press Ctrl+N or Cmd+N for a new note.
      </p>
    </aside>
  );
}
