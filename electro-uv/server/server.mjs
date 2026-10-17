// Minimal Wisp backend. Deploy this to a host that supports WebSockets
// (Render, Fly.io, Railway, a VPS...). NOT to Firebase Hosting.
import http from "node:http";
import wisp from "wisp-server-node";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("wisp ok");
});

server.on("upgrade", (req, socket, head) => {
  if (req.url.endsWith("/wisp/")) wisp.routeRequest(req, socket, head);
  else socket.end();
});

const port = process.env.PORT || 8080;
server.listen(port, () => console.log("wisp listening on", port));
