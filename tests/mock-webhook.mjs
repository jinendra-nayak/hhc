// Tiny stand-in for the real enquiry destination. POST /hook records; GET /_received lists; POST /_reset clears.
import http from "node:http";
let received = [];
http.createServer((req, res) => {
  let b = "";
  req.on("data", (c) => (b += c));
  req.on("end", () => {
    if (req.method === "POST" && req.url === "/hook") { received.push(JSON.parse(b)); return res.writeHead(200).end("ok"); }
    if (req.method === "POST" && req.url === "/_reset") { received = []; return res.writeHead(200).end("ok"); }
    if (req.url === "/_received") return res.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify(received));
    res.writeHead(404).end();
  });
}).listen(4010, "127.0.0.1", () => console.log("mock webhook on 4010"));
