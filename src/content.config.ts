import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/articles",
  }),
  schema: z.object({
    title: z.string(),
    kategori: z.enum(["Tubuh", "Pikiran", "Kehidupan"]),
    status: z.enum(["Draft", "Published"]),
    tanggal: z.coerce.date(),
  }),
});

export const collections = {
  articles,
};