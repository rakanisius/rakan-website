import { slugify } from "./slug.js";

export function calculateReadingTime(text = "") {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function createExcerpt(text = "", length = 140) {
  return text
    .replace(/\n+/g, " ")
    .trim()
    .slice(0, length);
}

export function buildMetadata(title = "", body = "", category = "Kehidupan") {
  return {
    slug: slugify(title || "artikel-baru"),
    filename: `${slugify(title || "artikel-baru")}.md`,
    excerpt: createExcerpt(body),
    readingTime: calculateReadingTime(body),
    category
  };
}