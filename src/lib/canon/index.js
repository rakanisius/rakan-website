import { knowledge } from "../../data/knowledge";
import { nodes } from "../../data/nodes";
import { articles } from "../../data/articles";

export function createCanonReport() {
  const worlds = knowledge.map((world) => {
    const worldNodes = nodes.filter((n) => n.world === world.slug);
    const worldArticles = articles.filter((a) => a.slug === world.slug);

    return {
      slug: world.slug,
      title: world.title,
      nodeCount: worldNodes.length,
      publishedNodeCount: worldNodes.filter((n) => n.status === "published").length,
      articleCount: worldArticles.length,
    };
  });

  const published = nodes.filter((n) => n.status === "published");
  const draft = nodes.filter((n) => n.status === "draft");

  const withoutArticles = nodes.filter(
    (n) => n.status === "published" && n.articleSlugs.length === 0
  );

  const editionsMap = new Map();

  nodes.forEach((node) => {
    if (!node.edition) return;

    editionsMap.set(
      node.edition,
      (editionsMap.get(node.edition) || 0) + node.articleSlugs.length
    );
  });

  return {
    worlds,

    nodes: {
      total: nodes.length,
      published: published.length,
      draft: draft.length,
      withoutArticles: withoutArticles.length,
    },

    articles: {
      total: articles.length,
      connected: articles.filter((a) => a.node).length,
      orphan: articles.filter((a) => !a.node).length,
    },

    editions: [...editionsMap.entries()].map(([id, articleCount]) => ({
      id,
      articleCount,
    })),
  };
}