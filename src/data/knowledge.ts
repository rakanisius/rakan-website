export type World = "Tubuh" | "Otak" | "Pikiran" | "Kehidupan";

export type Category = {
  slug: string;
  title: World;
  description: string;
};

export type Article = {
  number: number;
  title: string;
  href: string;
  slug: string;
  category: World;
  world: World;
  edition: string;
  node: string;
  archive: string;
  description: string;
};

export type Node = {
  id: string;
  world: World;
  title: string;
  summary: string;
  related: string[];
};

export const categories: Category[] = [
  {
    slug: "tubuh",
    title: "Tubuh",
    description: "Obat, farmasi, nutrisi, aktivitas, tidur, dan proses pemulihan."
  },
  {
    slug: "otak",
    title: "Otak",
    description: "Tidur, memori, perhatian, regulasi, dan cara sistem saraf mendukung kehidupan sehari-hari."
  },
  {
    slug: "pikiran",
    title: "Pikiran",
    description: "Emosi, stres, kebiasaan, makna, dan cara kita merespons pengalaman."
  },
  {
    slug: "kehidupan",
    title: "Kehidupan",
    description: "Relasi, keluarga, pekerjaan, lingkungan, dan ruang bertumbuh."
  }
];

export const articles: Article[] = [
  {
    number: 5,
    title: "Tubuh Tidak Pernah Benar-benar Diam",
    href: "/tulisan/tubuh-tidak-pernah-benar-benar-diam",
    slug: "tubuh-tidak-pernah-benar-benar-diam",
    category: "Tubuh",
    world: "Tubuh",
    edition: "001",
    node: "T-001",
    archive: "T-001",
    description: "Tubuh terus bekerja bahkan ketika kita merasa tidak melakukan apa pun."
  },
  {
    number: 4,
    title: "Mengapa Kita Sulit Mengubah Kebiasaan",
    href: "/tulisan/mengapa-kita-sulit-mengubah-kebiasaan",
    slug: "mengapa-kita-sulit-mengubah-kebiasaan",
    category: "Pikiran",
    world: "Pikiran",
    edition: "001",
    node: "P-002",
    archive: "P-002",
    description: "Perubahan lebih sering lahir dari langkah kecil daripada solusi instan."
  },
  {
    number: 3,
    title: "Stres Tidak Selalu Berasal dari Pikiran",
    href: "/tulisan/stres-tidak-selalu-berasal-dari-pikiran",
    slug: "stres-tidak-selalu-berasal-dari-pikiran",
    category: "Pikiran",
    world: "Pikiran",
    edition: "001",
    node: "P-001",
    archive: "P-001",
    description: "Melihat stres sebagai pertemuan antara tubuh, otak, pikiran, dan kehidupan."
  },
  {
    number: 2,
    title: "Otak Tidak Lelah karena Berpikir",
    href: "/tulisan/otak-tidak-lelah-karena-berpikir",
    slug: "otak-tidak-lelah-karena-berpikir",
    category: "Otak",
    world: "Otak",
    edition: "001",
    node: "O-002",
    archive: "O-002",
    description: "Memahami kelelahan mental melalui cara kerja otak."
  },
  {
    number: 1,
    title: "Tidur Bukan Sekadar Istirahat",
    href: "/tulisan/tidur-bukan-sekadar-istirahat",
    slug: "tidur-bukan-sekadar-istirahat",
    category: "Otak",
    world: "Otak",
    edition: "001",
    node: "O-001",
    archive: "O-001",
    description: "Mengapa tidur menjadi fondasi bagi pemulihan tubuh dan fungsi otak."
  }
];

/* ====================================================
   NODES (derived from SSOT)
==================================================== */

export const nodes: Node[] = articles.map((article) => ({
  id: article.node,
  world: article.world,
  title: article.title,
  summary: article.description,
  related: []
}));

/* ====================================================
   EDITIONS (derived from SSOT)
==================================================== */

export const editions = [...new Set(articles.map((article) => article.edition))]
  .sort()
  .map((id) => ({
    id,
    title: `Edition ${id}`
  }));

/* ====================================================
   HELPERS
==================================================== */

export function getWorldNodes(world: World) {
  return nodes.filter((node) => node.world === world);
}

export function getArticlesByNode(nodeId: string) {
  return articles.filter((article) => article.node === nodeId);
}

/* ====================================================
   WORLD STATS (AUTO)
==================================================== */

export type WorldStat = Category & {
  articleCount: number;
  nodeCount: number;
};

export const worldStats: WorldStat[] = categories.map((world) => {

  const worldArticles = articles.filter(
    (article) => article.world === world.title
  );

  const worldNodes = new Set(
    worldArticles.map((article) => article.node)
  );

  return {
    ...world,
    articleCount: worldArticles.length,
    nodeCount: worldNodes.size
  };

});