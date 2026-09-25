import { buildMetadata } from "./metadata.js";

export function buildMarkdown(title, category, body) {
  const meta = buildMetadata(title, body, category);

  const today = new Date().toISOString().split("T")[0];

  return `---
title: "${title}"
kategori: "${category}"
status: "Draft"
tanggal: ${today}
excerpt: "${meta.excerpt}"
readingTime: ${meta.readingTime}
featured: false
---

# ${title}

${body}
`;
}