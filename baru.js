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

// ======================
// Buat ilustrasi otomatis
// ======================

async function generateIllustration(title, slug) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.log("⚠ OPENAI_API_KEY belum ditemukan. Ilustrasi dilewati.");
    return;
  }

  const prompt = `
Editorial illustration for RAKAN.

Style:
- minimalist editorial
- cream paper texture (#F7F4EE)
- deep maroon accent (#7A2635)
- elegant literary magazine aesthetic
- symbolic composition
- soft cinematic lighting
- no text
- no logo
- high-end magazine illustration

Article title:
"${title}"
`;

  console.log("\n🎨 Membuat ilustrasi...");

  try {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        size: "1536x1536",
        quality: "medium",
      }),
    });

    if (!res.ok) {
      console.log("⚠ Gagal membuat ilustrasi.");
      console.log(await res.text());
      return;
    }

    const json = await res.json();

    const imageBase64 = json.data[0].b64_json;

    const imagePath = path.join(
      __dirname,
      "public",
      "images",
      `${slug}.png`
    );

    fs.writeFileSync(imagePath, Buffer.from(imageBase64, "base64"));

    console.log(`✓ Ilustrasi: public/images/${slug}.png`);
  } catch (err) {
    console.log("⚠ Gagal membuat ilustrasi.");
    console.log(err.message);
  }
}

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
    .replace(/const slug = "slug-artikel"/, `const slug = "${slug}"`)
    .replace(
      /const title = "JUDUL ARTIKEL \| RAKAN"/,
      `const title = "${title} | RAKAN"`
    )
    .replace(
      /const description = "Deskripsi singkat artikel\."/,
      `const description = "Tulis deskripsi singkat di sini."`
    )
    .replace(
      /const image = "\/images\/nama-gambar\.png"/,
      `const image = "/images/${slug}.png"`
    )
    .replace(
      /const category = "Kehidupan"/,
      `const category = "${cat.title}"`
    )
    .replace(
      /const archive = "K-000"/,
      `const archive = "K-${String(next).padStart(3, "0")}"`
    )
    .replace(
      /<h1>JUDUL ARTIKEL<\/h1>/,
      `<h1>${title}</h1>`
    )
    .replace(
      /alt="Judul Artikel"/,
      `alt="${title}"`
    );

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

  // ======================
  // Buat ilustrasi AI
  // ======================

  await generateIllustration(title, slug);

  console.log("\n==============================");
  console.log("✓ Artikel dibuat");
  console.log(`✓ Nomor : ${next}`);
  console.log(`✓ Arsip : K-${String(next).padStart(3, "0")}`);
  console.log("✓ Slug otomatis");
  console.log("✓ Canonical otomatis");
  console.log("✓ Related Content otomatis");
  console.log("✓ Masuk menu Tulisan");
  console.log("✓ Masuk kategori");
  console.log("✓ Ilustrasi otomatis (jika API aktif)");
  console.log("==============================");
})();