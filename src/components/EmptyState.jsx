export default function EmptyState({ onCreate }) {
  return (
    <section className="grid min-h-screen place-items-center px-5">
      <div className="max-w-lg rounded-3xl border border-notelite-border bg-notelite-panel/80 p-8 shadow-glow">
        <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-notelite-border bg-notelite-panelSoft text-xl">
          N
        </div>
        <h1 className="mb-3 text-3xl font-semibold text-zinc-100">Select or create a note</h1>
        <p className="mb-6 text-notelite-muted">
          Notelite keeps your notes local, clean, and ready for a focused workshop demo.
        </p>
        <button className="soft-button" type="button" onClick={onCreate}>
          Create a note
        </button>
      </div>
    </section>
  );
}
