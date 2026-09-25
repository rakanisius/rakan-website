const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");

let score = 100;
let warnings = 0;
let errors = 0;

function ok(msg) {
  console.log(`✔ ${msg}`);
}

function warn(msg, penalty = 2) {
  console.log(`⚠ ${msg}`);
  score -= Math.min(penalty, 2);
  warnings++;
}

function fail(msg, penalty = 8) {
  console.log(`✖ ${msg}`);
  score -= penalty;
  errors++;
}

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function walk(dir, ext, result = []) {
  if (!fs.existsSync(dir)) return result;

  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      walk(full, ext, result);
    } else if (file.endsWith(ext)) {
      result.push(full);
    }
  }

  return result;
}

console.log("\n🩺 RAKAN Doctor v1.2\n");

try {

  /* ======================
     HALAMAN
  ====================== */

  console.log("📄 Halaman");

  const pages = walk(path.join(root, "src", "pages"), ".astro");

  if (pages.length) {
    ok(`${pages.length} halaman ditemukan`);
  } else {
    fail("Tidak ada halaman ditemukan");
  }

  /* ======================
     STRUKTUR
  ====================== */

  console.log("\n🧭 Struktur");

  exists("src/components/Nav.astro")
    ? ok("Navbar ditemukan")
    : fail("Navbar hilang");

  exists("src/components/Footer.astro")
    ? ok("Footer ditemukan")
    : fail("Footer hilang");

  exists("public/robots.txt")
    ? ok("robots.txt ditemukan")
    : fail("robots.txt hilang");

  exists("dist/client/sitemap-index.xml")
    ? ok("sitemap-index.xml tersedia")
    : warn("Build belum menghasilkan sitemap");

  /* ======================
     ARTIKEL
  ====================== */

  console.log("\n📚 Artikel");

  const articleDir = path.join(root, "src", "pages", "tulisan");

  const articles = walk(articleDir, ".astro").filter((file) => {
    const relative = path.relative(articleDir, file).replace(/\\/g, "/");
    const name = path.basename(file);

    // Abaikan halaman daftar
    if (relative === "index.astro") return false;

    // Abaikan seluruh folder kategori
    if (relative.startsWith("kategori/")) return false;

    // Abaikan route dinamis
    if (name.startsWith("[")) return false;

    // Abaikan file tersembunyi
    if (name.startsWith(".")) return false;

    return true;
  });

  ok(`${articles.length} artikel ditemukan`);

  articles.forEach((file) => {
    const text = fs.readFileSync(file, "utf8");
    const name = path.basename(file);

    if (!text.includes("description")) {
      warn(`${name} belum memiliki description`);
    }

    if (!text.includes("category")) {
      warn(`${name} belum memiliki category`);
    }

    const isArticle =
      text.includes("const article") ||
      text.includes('og:type" content="article') ||
      text.includes("og:type\" content=\"article");

    if (isArticle && !text.includes("canonical")) {
      warn(`${name} belum memiliki canonical`, 1);
    }
  });

  /* ======================
     GAMBAR
  ====================== */

  console.log("\n🖼 Gambar");

  const imgDir = path.join(root, "public", "images", "books");

  if (fs.existsSync(imgDir)) {
    const images = fs.readdirSync(imgDir);

    ok(`${images.length} sampul ditemukan`);

    images.forEach((img) => {
      const full = path.join(imgDir, img);
      const sizeKB = fs.statSync(full).size / 1024;

      if (sizeKB > 250) {
        warn(`${img} ${Math.round(sizeKB)} KB (terlalu besar)`, 3);
      }
    });
  }

  /* ======================
     BUILD TEST
  ====================== */

  console.log("\n🏗 Build");

  try {
    execSync("npm run build", {
      cwd: root,
      stdio: "ignore",
    });

    ok("Build berhasil");
  } catch {
    fail("Build gagal", 15);
  }

} catch (e) {
  fail(e.message, 20);
}

if (score < 0) score = 0;

/* ======================
   HASIL
====================== */

console.log("\n────────────────────────");

console.log(`Health Score: ${score}/100`);
console.log(`Warning: ${warnings}`);
console.log(`Error: ${errors}`);

if (errors > 0) {
  console.log("\n🔴 Perbaiki error sebelum deploy.");
} else if (warnings > 5) {
  console.log("\n🟡 Layak deploy, ada optimasi yang disarankan.");
} else {
  console.log("\n🟢 Siap publish.");
}

console.log();