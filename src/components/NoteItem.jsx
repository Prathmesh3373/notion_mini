import { relativeTime } from "../utils/date.js";

export default function NoteItem({ active, note, onDelete, onDuplicate, onSelect, onTogglePin }) {
  return (
    <div
      className={`group rounded-xl border transition duration-200 ${
        active
          ? "border-zinc-600 bg-notelite-card shadow-glow"
          : "border-transparent hover:border-notelite-border hover:bg-notelite-panelSoft"
      }`}
    >
      <button className="w-full p-2 text-left" type="button" onClick={onSelect}>
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-notelite-border bg-notelite-panel text-sm">
            {note.icon || "N"}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm text-zinc-100">{note.title || "Untitled"}</span>
            <span className="block truncate text-xs text-notelite-muted">{relativeTime(note.updatedAt)}</span>
          </span>
        </div>
      </button>

      <div className="flex items-center gap-1 px-2 pb-2 opacity-0 transition duration-200 group-hover:opacity-100">
        <button className="quiet-button px-2 py-1 text-xs" type="button" onClick={onTogglePin}>
          {note.pinned ? "Unpin" : "Pin"}
        </button>
        <button className="quiet-button px-2 py-1 text-xs" type="button" onClick={onDuplicate}>
          Duplicate
        </button>
        <button className="danger-button px-2 py-1 text-xs" type="button" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
