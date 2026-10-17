// Copies Ultraviolet, BareMux and the Epoxy transport from node_modules into public/,
// then writes public/uv/uv.config.js. Run with: npm run setup
import { cpSync, rmSync, mkdirSync, writeFileSync } from "node:fs";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";

const copies = [[uvPath, "public/uv"], [baremuxPath, "public/baremux"], [epoxyPath, "public/epoxy"]];
for (const [from, to] of copies) {
  rmSync(to, { recursive: true, force: true });
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true });
  console.log("copied", to);
}

writeFileSync("public/uv/uv.config.js", `self.__uv$config = {
  prefix: "/service/",
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/uv/uv.handler.js",
  client: "/uv/uv.client.js",
  bundle: "/uv/uv.bundle.js",
  config: "/uv/uv.config.js",
  sw: "/uv/uv.sw.js"
};
`);
console.log("wrote public/uv/uv.config.js");
