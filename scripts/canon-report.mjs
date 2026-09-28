import { createCanonReport } from "../dist/server/lib/canon/report.js";

const report = createCanonReport();

console.log("");
console.log("RAKAN CANON REPORT");
console.log("────────────────────────────────────");
console.log("");

console.log("WORLD");

report.worlds.forEach((world) => {
  console.log(
    `${world.title.padEnd(12)} ${String(world.nodeCount).padStart(2)} Node   ${String(
      world.articleCount
    ).padStart(2)} Artikel`
  );
});

console.log("");
console.log("NODE");

console.log(`Total               ${report.nodes.total}`);
console.log(`Published           ${report.nodes.published}`);
console.log(`Draft               ${report.nodes.draft}`);

if (report.nodes.withoutArticles > 0) {
  console.log(`Tanpa artikel       ${report.nodes.withoutArticles}`);
}

console.log("");
console.log("ARTIKEL");

console.log(`Total               ${report.articles.total}`);
console.log(`Connected           ${report.articles.connected}`);

if (report.articles.orphan > 0) {
  console.log(`Orphan              ${report.articles.orphan}`);
}

console.log("");
console.log("EDITION");

if (report.editions.length === 0) {
  console.log("Belum ada Edition.");
} else {
  report.editions.forEach((edition) => {
    console.log(`Edition ${edition.id.padEnd(5)} ${edition.articleCount} artikel`);
  });
}

console.log("");
console.log("Canon Reporter selesai.");
console.log("");