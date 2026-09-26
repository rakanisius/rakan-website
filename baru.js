import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (q) => new Promise((r) => rl.question(q, r));

const CATEGORY = {
  "1": { title: "Tubuh & Kesehatan", slug: "tubuh-kesehatan" },
  "2": { title: "Pikiran & Emosi", slug: "pikiran-emosi" },
  "3": { title: "Obat & Farmasi", slug: "farmasi" },
  "4": { title: "Kesehatan Holistik", slug: "holistik" },
  "5": { title: "Kehidupan", slug: "kehidupan" },
  "6": { title: "Catatan Praktisi", slug: "catatan-praktisi" },
};

(async () => {
  console.log("\n=== RAKAN • ARTIKEL BARU ===\n");

  const title = await ask("Judul : ");
  const slug = await ask("Slug  : ");

  console.log(`
1. Tubuh & Kesehatan
2. Pikiran & Emosi
3. Obat & Farmasi
4. Kesehatan Holistik
5. Kehidupan
6. Catatan Praktisi
`);

  const pick = await ask("Kategori (1-6): ");
  rl.close();

  const cat = CATEGORY[pick];

  if (!cat) {
    console.log("Kategori tidak valid.");
    process.exit(1);
  }

  const templatePath = path.join(
    __dirname,
    "src/pages/tulisan/_template.astro"
  );

  const articlePath = path.join(
    __dirname,
    "src/pages/tulisan",
    `${slug}.astro`
  );

  const dataPath = path.join(__dirname, "src/data/articles.ts");

  if (fs.existsSync(articlePath)) {
    console.log("\nSlug sudah ada.");
    process.exit(1);
  }

  // ======================
  // Nomor artikel otomatis
  // ======================

  const dataText = fs.readFileSync(dataPath, "utf8");

  const numbers = [
    ...dataText.matchAll(/number:\s*(\d+)/g),
  ].map((m) => Number(m[1]));

  const next = numbers.length ? Math.max(...numbers) + 1 : 1;

  // ======================
  // Buat file artikel
  // ======================

  let article = fs.readFileSync(templatePath, "utf8");

  article = article
    .replace(/number:\s*\d+/, `number: ${next}`)
    .replace(/archive:\s*"[^"]*"/, `archive: "K-${String(next).padStart(3, "0")}"`)
    .replace(/category:\s*"[^"]*"/, `category: "${cat.title}"`)
    .replace(/slug:\s*"[^"]*"/, `slug: "${cat.slug}"`)
    .replace(/path:\s*"[^"]*"/, `path: "${slug}"`)
    .replace(/title:\s*"[^"]*"/, `title: "${title}"`)
    .replace(/description:\s*"[^"]*"/, `description: "Tulis deskripsi singkat di sini."`)
    .replace(/\/images\/[^"]+/, `/images/${slug}.png`);

  fs.writeFileSync(articlePath, article);

  // ======================
  // Tambah ke articles.ts
  // ======================

  const newObject = `
  {
    number: ${next},
    category: "${cat.title}",
    slug: "${cat.slug}",
    title: "${title}",
    description: "Tulis deskripsi singkat di sini.",
    href: "/tulisan/${slug}",
  },`;

  const updated = dataText.replace(
    /export const articles = \[/,
    `export const articles = [${newObject}`
  );

  fs.writeFileSync(dataPath, updated);

  console.log("\n==============================");
  console.log("✓ Artikel dibuat");
  console.log(`✓ Nomor : ${next}`);
  console.log("✓ Masuk menu Tulisan");
  console.log("✓ Masuk kategori");
  console.log("==============================");
})();