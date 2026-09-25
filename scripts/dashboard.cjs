const http = require("http");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const root = path.join(__dirname, "..");
const dashboardDir = path.join(root, "dashboard");

function walk(dir, ext, result = []) {
  if (!fs.existsSync(dir)) return result;

  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) walk(full, ext, result);
    else if (file.endsWith(ext)) result.push(full);
  }

  return result;
}

function runCommand(command, args = []) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: root,
      shell: true,
    });

    let output = "";

    child.stdout.on("data", (d) => (output += d.toString()));
    child.stderr.on("data", (d) => (output += d.toString()));

    child.on("close", () => resolve(output));
  });
}

async function getHealthScore() {
  const output = await runCommand("npm", ["run", "doctor"]);
  const match = output.match(/Health Score:\s*(\d+)/);

  return {
    score: match ? Number(match[1]) : "--",
    output,
  };
}

async function stats() {
  const doctor = await getHealthScore();

  const articleDir = path.join(root, "src/pages/tulisan");

  const articles = walk(articleDir, ".astro").filter((file) => {
    const relative = path.relative(articleDir, file).replace(/\\/g, "/");
    const name = path.basename(file);

    if (relative === "index.astro") return false;
    if (relative.startsWith("kategori/")) return false;
    if (name.startsWith("[")) return false;
    if (name.startsWith(".")) return false;

    return true;
  });

  return {
    pages: walk(path.join(root, "src/pages"), ".astro").length,
    articles: articles.length,
    books: walk(path.join(root, "src/pages"), ".astro").filter((f) =>
      path.basename(f).startsWith("buku-")
    ).length,
    score: doctor.score,
  };
}

const server = http.createServer(async (req, res) => {

  if (req.url === "/stats") {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(await stats()));
    return;
  }

  if (req.url === "/run/doctor" && req.method === "POST") {
    res.end(await runCommand("npm", ["run", "doctor"]));
    return;
  }

  if (req.url === "/run/publish" && req.method === "POST") {
    res.end(await runCommand("npm", ["run", "publish"]));
    return;
  }

  if (req.url === "/run/new" && req.method === "POST") {
    res.end(
      "Artikel baru dibuat melalui terminal:\n\nnpm run new-article"
    );
    return;
  }

  let file = req.url === "/" ? "index.html" : req.url.slice(1);
  const filePath = path.join(dashboardDir, file);

  if (!fs.existsSync(filePath)) {
    res.statusCode = 404;
    res.end("404");
    return;
  }

  const ext = path.extname(filePath);

  const types = {
    ".css": "text/css",
    ".js": "application/javascript",
    ".html": "text/html",
  };

  res.setHeader("Content-Type", types[ext] || "text/plain");
  res.end(fs.readFileSync(filePath));
});

server.listen(4322, () => {
  console.log("\n🚀 RAKAN Dashboard");
  console.log("http://localhost:4322\n");
});