import { relativeTime } from "../utils/date.js";

export default function Header({ note, showPreview, onDelete, onDuplicate, onTogglePin, onTogglePreview }) {
  return (
    <header className="mb-10 flex flex-col gap-4 border-b border-notelite-border pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-notelite-muted">Edited {relativeTime(note.updatedAt)}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button className="quiet-button" type="button" onClick={onTogglePreview}>
          {showPreview ? "Hide preview" : "Show preview"}
        </button>
        <button className="quiet-button" type="button" onClick={onTogglePin}>
          {note.pinned ? "Unpin" : "Pin"}
        </button>
        <button className="quiet-button" type="button" onClick={onDuplicate}>
          Duplicate
        </button>
        <button className="danger-button" type="button" onClick={onDelete}>
          Delete
        </button>
      </div>
    </header>
  );
}
