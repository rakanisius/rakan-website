import { articles } from "../src/data/manifest.ts";

const worlds = ["Tubuh", "Otak", "Pikiran", "Kehidupan"];

const report = {};

for (const world of worlds) {
  report[world] = articles.filter((a) => a.world === world).length;
}

const slugSet = new Set();
const nodeSet = new Set();
const errors = [];

for (const article of articles) {
  if (slugSet.has(article.slug)) {
    errors.push(`Duplicate slug: ${article.slug}`);
  }
  slugSet.add(article.slug);

  if (nodeSet.has(article.node)) {
    errors.push(`Duplicate node: ${article.node}`);
  }
  nodeSet.add(article.node);
}

console.log("\nRAKAN Canon Report");
console.log("------------------");
console.table(report);

console.log(`Articles: ${articles.length}`);
console.log(`Nodes referenced by articles: ${nodeSet.size}`);
console.log(`Article slugs: ${slugSet.size}`);

if (errors.length > 0) {
  console.log("\nCanon Integrity: FAILED\n");
  errors.forEach((e) => console.log(`• ${e}`));
  process.exit(1);
}

console.log("\nCanon Integrity: PASS");