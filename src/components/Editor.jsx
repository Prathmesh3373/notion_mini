import Header from "./Header.jsx";

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderInline(value) {
  return escapeHtml(value).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

function markdownToHtml(markdown) {
  const lines = markdown.split("\n");
  const html = [];
  let inList = false;

  lines.forEach((line) => {
    if (line.startsWith("- ")) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }

      html.push(`<li>${renderInline(line.slice(2)) || "&nbsp;"}</li>`);
      return;
    }

    if (inList) {
      html.push("</ul>");
      inList = false;
    }

    if (line.startsWith("# ")) {
      html.push(`<h1>${renderInline(line.slice(2))}</h1>`);
    } else if (line.startsWith("## ")) {
      html.push(`<h2>${renderInline(line.slice(3))}</h2>`);
    } else if (line.trim()) {
      html.push(`<p>${renderInline(line)}</p>`);
    } else {
      html.push("<p>&nbsp;</p>");
    }
  });

  if (inList) {
    html.push("</ul>");
  }

  return html.join("");
}

export default function Editor({
  note,
  showPreview,
  onChange,
  onDelete,
  onDuplicate,
  onTogglePin,
  onTogglePreview,
}) {
  return (
    <article className="mx-auto min-h-screen w-full max-w-6xl px-5 py-8 sm:px-8 lg:px-14">
      <Header
        note={note}
        showPreview={showPreview}
        onDelete={() => onDelete(note.id)}
        onDuplicate={() => onDuplicate(note.id)}
        onTogglePin={() => onTogglePin(note.id)}
        onTogglePreview={onTogglePreview}
      />

      <div className="mb-7 flex items-start gap-4">
        <input
          aria-label="Note icon"
          className="h-14 w-14 rounded-2xl border border-notelite-border bg-notelite-panelSoft text-center text-2xl outline-none transition duration-200 focus:border-zinc-500"
          maxLength={2}
          value={note.icon}
          onChange={(event) => onChange(note.id, { icon: event.target.value.slice(0, 2) || "N" })}
        />

        <input
          aria-label="Note title"
          className="min-w-0 flex-1 bg-transparent text-4xl font-semibold leading-tight text-zinc-100 outline-none placeholder:text-notelite-faint sm:text-5xl"
          placeholder="Untitled"
          value={note.title}
          onChange={(event) => onChange(note.id, { title: event.target.value || "Untitled" })}
        />
      </div>

      <section className={`grid gap-5 ${showPreview ? "xl:grid-cols-[minmax(0,1fr)_420px]" : ""}`}>
        <div className="rounded-2xl border border-notelite-border bg-notelite-panel/70 p-4">
          <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.14em] text-notelite-faint">
            Write
          </label>
          <textarea
            className="min-h-[540px] w-full resize-y bg-transparent text-[1rem] leading-7 text-zinc-100 outline-none placeholder:text-notelite-faint"
            placeholder="# Heading&#10;&#10;Write with **bold** text and - list items."
            value={note.content}
            onChange={(event) => onChange(note.id, { content: event.target.value })}
          />
        </div>

        {showPreview && (
          <aside className="rounded-2xl border border-notelite-border bg-notelite-panelSoft/80 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-notelite-faint">
              Preview
            </p>
            <div
              className="markdown-preview"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(note.content || "") }}
            />
          </aside>
        )}
      </section>
    </article>
  );
}
