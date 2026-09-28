import http from "node:http";
import fs from "node:fs";
import { CONFIG } from "./config.mjs";
import { state } from "./state.mjs";

const json = (res, data, status = 200) => {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:4321",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });

  res.end(JSON.stringify(data, null, 2));
};

const server = http.createServer((req, res) => {

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === "GET" && req.url === "/health") {

    return json(res, {
      agent: "RAKAN Local Publish Agent",
      version: CONFIG.agentVersion,
      status: "ready"
    });

  }

  if (req.method === "GET" && req.url === "/status") {

    return json(res, {
      ...state,
      repository: CONFIG.repository,
      repositoryExists: fs.existsSync(CONFIG.repository)
    });

  }

  json(res, {
    error: "NOT_FOUND"
  }, 404);

});

server.listen(CONFIG.port, CONFIG.host, () => {

  console.log("");
  console.log("RAKAN Local Publish Agent");
  console.log("-------------------------");
  console.log(`Repository : ${CONFIG.repository}`);
  console.log(`Listening  : http://${CONFIG.host}:${CONFIG.port}`);
  console.log("");

});