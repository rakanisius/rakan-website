import { slugify } from "./slug.js";

export function articleCommit(title = "") {
  return `feat: tambah artikel ${slugify(title || "artikel")}`;
}

export function buildCommands(title = "") {
  return {
    commit: articleCommit(title),
    commands: [
      "git add .",
      `git commit -m "${articleCommit(title)}"`,
      "git push origin main"
    ]
  };
}