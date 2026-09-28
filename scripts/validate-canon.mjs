/* =====================================================
   RAKAN Canon Validation Pipeline
   TR-04
===================================================== */

import { articles } from "../src/data/articles.js";
import { nodes } from "../src/data/nodes.js";
import { graph } from "../src/data/graph.js";
import { paths } from "../src/data/paths.js";

import {
  isValidNodeId,
  isValidEditionId,
  isValidSlug,
  isValidWorld,
  isValidReadingTime
} from "../src/data/schema.js";

let errors = [];
let warnings = [];

/* ---------- Helpers ---------- */

const nodeIds = new Set(nodes.map(n => n.id));
const slugs = new Set();

/* =====================================================
   Articles
===================================================== */

for (const article of articles) {

  if (slugs.has(article.slug)) {
    errors.push(`Duplicate slug: ${article.slug}`);
  }

  slugs.add(article.slug);

  if (!isValidSlug(article.slug))
    errors.push(`Invalid slug: ${article.slug}`);

  if (!isValidWorld(article.world))
    errors.push(`Invalid world: ${article.world}`);

  if (!isValidNodeId(article.node))
    errors.push(`Invalid node: ${article.node}`);

  if (!nodeIds.has(article.node))
    errors.push(`Missing node: ${article.node}`);

  if (article.edition && !isValidEditionId(article.edition))
    errors.push(`Invalid edition: ${article.edition}`);

  if (!isValidReadingTime(article.readingTime))
    errors.push(`Invalid reading time: ${article.readingTime}`);

  if (article.archive !== article.node)
    warnings.push(
      `Archive differs from Node: ${article.slug}`
    );
}

/* =====================================================
   Nodes
===================================================== */

for (const node of nodes) {

  if (!isValidNodeId(node.id))
    errors.push(`Invalid NodeId: ${node.id}`);

  if (!isValidWorld(node.world))
    errors.push(`Invalid World: ${node.world}`);

  for (const related of node.related) {

    if (!nodeIds.has(related))
      errors.push(`Broken relation: ${node.id} → ${related}`);

  }
}

/* =====================================================
   Graph
===================================================== */

for (const edge of graph) {

  if (!nodeIds.has(edge.from))
    errors.push(`Graph source missing: ${edge.from}`);

  if (!nodeIds.has(edge.to))
    errors.push(`Graph target missing: ${edge.to}`);

}

/* =====================================================
   Reading Paths
===================================================== */

for (const path of paths) {

  for (const node of path.nodes) {

    if (!nodeIds.has(node))
      errors.push(
        `Path "${path.title}" references missing node: ${node}`
      );

  }
}

/* =====================================================
   Coverage
===================================================== */

const coverage = {
  tubuh:0,
  otak:0,
  pikiran:0,
  kehidupan:0
};

for (const article of articles) {
  coverage[article.world]++;
}

console.log("");
console.log("RAKAN Canon Report");
console.log("------------------");
console.table(coverage);

if (warnings.length) {

  console.log("");
  console.log("Warnings");

  warnings.forEach(w => console.log(`- ${w}`));

}

if (errors.length) {

  console.log("");
  console.log("Errors");

  errors.forEach(e => console.log(`- ${e}`));

  process.exit(1);

}

console.log("");
console.log("Canon Integrity: PASS");