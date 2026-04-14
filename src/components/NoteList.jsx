import NoteItem from "./NoteItem.jsx";

export default function NoteList({
  activeNoteId,
  label,
  notes,
  onDeleteNote,
  onDuplicateNote,
  onSelectNote,
  onTogglePin,
}) {
  if (notes.length === 0) {
    return null;
  }

  return (
    <section className="mb-5">
      <h2 className="mb-2 px-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-notelite-faint">
        {label}
      </h2>
      <div className="grid gap-1">
        {notes.map((note) => (
          <NoteItem
            active={note.id === activeNoteId}
            key={note.id}
            note={note}
            onDelete={() => onDeleteNote(note.id)}
            onDuplicate={() => onDuplicateNote(note.id)}
            onSelect={() => onSelectNote(note.id)}
            onTogglePin={() => onTogglePin(note.id)}
          />
        ))}
      </div>
    </section>
  );
}
