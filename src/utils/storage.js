const NOTES_KEY = "notelite.notes.v1";
const ACTIVE_NOTE_KEY = "notelite.activeNote.v1";

export function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(NOTES_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function saveNotes(notes) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export function loadActiveNoteId() {
  return localStorage.getItem(ACTIVE_NOTE_KEY);
}

export function saveActiveNoteId(noteId) {
  if (noteId) {
    localStorage.setItem(ACTIVE_NOTE_KEY, noteId);
  } else {
    localStorage.removeItem(ACTIVE_NOTE_KEY);
  }
}
