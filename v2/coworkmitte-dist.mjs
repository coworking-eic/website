// Baut aus dist/ die eigenständige Website für www.coworkmitte.com (Ordner dist-coworkmitte/).
// Aufruf über `npm run build:coworkmitte`; genutzt vom Workflow im Repo coworking-eic/coworkmitte.
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";

const von = new URL("./dist/", import.meta.url);
const nach = new URL("./dist-coworkmitte/", import.meta.url);

if (!existsSync(new URL("coworkmitte/index.html", von))) {
  throw new Error("dist/coworkmitte/index.html fehlt – zuerst mit COWORKMITTE=1 bauen.");
}

rmSync(nach, { recursive: true, force: true });
mkdirSync(nach);
cpSync(new URL("coworkmitte/index.html", von), new URL("index.html", nach));
cpSync(new URL("coworkmitte/index.html", von), new URL("404.html", nach));
for (const datei of ["_astro", "favicon-32.png", "apple-touch-icon.png"]) {
  cpSync(new URL(datei, von), new URL(datei, nach), { recursive: true });
}
writeFileSync(new URL("CNAME", nach), "www.coworkmitte.com\n");
console.log("dist-coworkmitte/ fertig");
