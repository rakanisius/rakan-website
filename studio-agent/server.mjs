import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const PORT = 8788;
const ROOT = path.resolve(process.cwd(), "..");
const DRAFT_DIR = path.join(ROOT, "src", "content", "drafts");

await fs.mkdir(DRAFT_DIR, { recursive: true });

const server = http.createServer(async (req, res) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ ok: true }));
  }

  if (req.url === "/draft" && req.method === "POST") {

    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", async () => {

      try {

        const data = JSON.parse(body);

        const file = path.join(DRAFT_DIR, `${data.slug}.md`);

        const markdown =
`---
title: "${data.title}"
description: "${data.description || ""}"
category: "${data.category}"
status: draft
---

${data.body}
`;

        await fs.writeFile(file, markdown, "utf8");

        res.writeHead(200, { "Content-Type": "application/json" });

        res.end(JSON.stringify({
          ok: true,
          file
        }));

      } catch (err) {

        res.writeHead(500, { "Content-Type": "application/json" });

        res.end(JSON.stringify({
          ok: false,
          error: String(err)
        }));

      }

    });

    return;
  }

  res.writeHead(404);
  res.end();

});

server.listen(PORT, () => {
  console.log(`Studio Agent running http://localhost:${PORT}`);
});