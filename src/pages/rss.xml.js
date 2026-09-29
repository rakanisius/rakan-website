import rss from "@astrojs/rss";
import { articles } from "../data/manifest";

export function GET(context) {
  return rss({
    title: "RAKAN",
    description:
      "Catatan tentang tubuh, otak, pikiran, kehidupan, dan penyembuhan holistik.",

    site: context.site,

    items: articles
      .slice()
      .sort((a, b) => b.number - a.number)
      .map((article) => ({
        title: article.title,
        description: article.description,
        link: article.href,
      })),

    customData: `<language>id-id</language>`,
  });
}