export default function SearchBar({ value, onChange }) {
  return (
    <label className="block">
      <span className="sr-only">Search notes</span>
      <input
        className="w-full rounded-xl border border-notelite-border bg-notelite-panelSoft px-3 py-2.5 text-sm text-zinc-100 outline-none transition duration-200 placeholder:text-notelite-faint focus:border-zinc-500"
        placeholder="Search notes"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
