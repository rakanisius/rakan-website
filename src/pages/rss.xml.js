import rss from "@astrojs/rss";
import { articles } from "../data/articles";

export async function GET(context) {
  const sorted = [...articles].sort((a, b) => b.number - a.number);

  return rss({
    title: "RAKAN",
    description:
      "Catatan tentang tubuh, pikiran, kesehatan, obat, dan kehidupan.",
    site: context.site,
    items: sorted.map((article) => ({
      title: article.title,
      description: article.description,
      link: article.href,
    })),
    customData: `<language>id-ID</language>`,
  });
}