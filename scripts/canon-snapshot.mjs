import fs from "node:fs";
import path from "node:path";

import { knowledge } from "../src/data/knowledge.js";
import { nodes } from "../src/data/nodes.js";
import { articles } from "../src/data/articles.js";
import { books } from "../src/data/books.js";

const snapshot = {
  version: "1.0",
  generatedAt: new Date().toISOString(),

  summary: {
    worlds: knowledge.length,
    nodes: nodes.length,
    articles: articles.length,
    books: books.length
  },

  worlds: knowledge,

  nodes,

  articles,

  books,

  coverage: knowledge.map(world => {

    const worldNodes = nodes.filter(n => n.world === world.slug);

    const worldArticles = articles.filter(a => a.slug === world.slug);

    return {

      slug: world.slug,

      title: world.title,

      nodeCount: worldNodes.length,

      publishedNodeCount: worldNodes.filter(n => n.status === "published").length,

      articleCount: worldArticles.length

    };

  }),

  editions: [...new Set(nodes.filter(n=>n.edition).map(n=>n.edition))]
    .map(id=>({

      id,

      articleCount:nodes
        .filter(n=>n.edition===id)
        .reduce((s,n)=>s+n.articleSlugs.length,0)

    }))
};

const outDir = path.resolve("src/generated");

fs.mkdirSync(outDir,{recursive:true});

fs.writeFileSync(
  path.join(outDir,"canon.json"),
  JSON.stringify(snapshot,null,2)
);

console.log("✓ Canon Snapshot dibuat.");