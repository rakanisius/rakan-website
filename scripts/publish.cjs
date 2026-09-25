const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");

function run(cmd) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, {
    cwd: root,
    stdio: "inherit",
  });
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

console.log("\n🚀 RAKAN Publish v1.0\n");

try {
  console.log("🔍 Audit proyek...");

  const checks = [
    "src/pages/index.astro",
    "src/pages/tulisan/index.astro",
    "src/pages/buku.astro",
    "public/robots.txt",
  ];

  for (const file of checks) {
    if (!exists(file)) {
      throw new Error(`File hilang: ${file}`);
    }
  }

  console.log("✅ Struktur proyek OK");

  run("npm run build");

  run("npx wrangler deploy");

  const changelogPath = path.join(root, "CHANGELOG.md");

  if (fs.existsSync(changelogPath)) {
    const today = new Date().toLocaleDateString("id-ID");

    const entry = `

### Publish ${today}

- Deploy berhasil ke Cloudflare.
`;

    fs.appendFileSync(changelogPath, entry);

    console.log("📝 CHANGELOG diperbarui");
  }

  console.log("\n🎉 Publish selesai!");
} catch (err) {
  console.error("\n❌ Publish gagal");
  console.error(err.message);
  process.exit(1);
}