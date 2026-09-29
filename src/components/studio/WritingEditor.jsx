import { useEffect, useMemo, useState } from "react";
import { marked } from "marked";
import "./WritingEditor.css";

const STORAGE = "rakan-writing-draft";

const categories = [
  "Kehidupan",
  "Tubuh & Kesehatan",
  "Pikiran & Emosi",
  "Farmasi",
  "Holistik",
  "Catatan Praktisi"
];

marked.setOptions({ async: false });

export default function WritingEditor() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [body, setBody] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE);
    if (!saved) return;

    try {
      const data = JSON.parse(saved);
      setTitle(data.title || "");
      setCategory(data.category || categories[0]);
      setBody(data.body || "");
    } catch {}
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      STORAGE,
      JSON.stringify({ title, category, body })
    );
  }, [title, category, body]);

  const slug = useMemo(() => {
    return (title || "artikel-baru")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }, [title]);

  const reading = useMemo(() => {
    return Math.max(
      1,
      Math.ceil(body.split(/\s+/).filter(Boolean).length / 200)
    );
  }, [body]);

  const preview = useMemo(() => {
    try {
      return marked.parse(body || "_Mulai menulis untuk melihat preview._");
    } catch {
      return "<p>Preview tidak tersedia.</p>";
    }
  }, [body]);

  function wrap(before, after = "") {
    const textarea = document.getElementById("editor");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selected = body.slice(start, end);

    const next =
      body.slice(0, start) +
      before +
      selected +
      after +
      body.slice(end);

    setBody(next);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.selectionStart = start + before.length;
      textarea.selectionEnd = end + before.length;
    });
  }

  async function saveDraft() {
    try {
      const res = await fetch("http://localhost:8788/draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          category,
          slug,
          body,
          description: body.split("\n").find(Boolean) || ""
        })
      });

      const data = await res.json();

      if (data.ok) {
        alert(`Draft tersimpan.\n\n${slug}.md`);
      } else {
        alert(`Gagal menyimpan.\n\n${data.error}`);
      }
    } catch {
      alert("Studio Agent belum berjalan di http://localhost:8788");
    }
  }

  return (
    <div className="workspace">
      <section className="editor-panel">
        <div className="toolbar">
          <button onClick={() => wrap("# ")}>H1</button>
          <button onClick={() => wrap("## ")}>H2</button>
          <button onClick={() => wrap("**", "**")}>B</button>
          <button onClick={() => wrap("*", "*")}>I</button>
          <button onClick={() => wrap("> ")}>❝</button>
          <button onClick={() => wrap("- ")}>•</button>

          <div className="spacer" />

          <button className="save" onClick={saveDraft}>
            💾 Simpan Draft
          </button>
        </div>

        <label>Judul</label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul artikel..."
        />

        <label>Kategori</label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <label>Markdown</label>

        <textarea
          id="editor"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Mulai menulis..."
        />
      </section>

      <aside className="side">
        <section className="meta">
          <h2>Metadata</h2>

          <div>
            <span>Slug</span>
            <strong>{slug}</strong>
          </div>

          <div>
            <span>Nama File</span>
            <strong>{slug}.md</strong>
          </div>

          <div>
            <span>Estimasi Baca</span>
            <strong>{reading} menit</strong>
          </div>
        </section>

        <section className="preview">
          <h2>Preview</h2>

          <h1>{title || "Judul artikel"}</h1>

          <div className="badge">{category}</div>

          <div
            className="article"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </section>
      </aside>
    </div>
  );
}