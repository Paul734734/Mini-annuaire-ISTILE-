import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const racine = fileURLToPath(new URL("../", import.meta.url));
const port = process.env.PORT || 3000;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

const serveur = http.createServer(async (requete, reponse) => {
  try {
    const url = decodeURIComponent((requete.url || "/").split("?")[0]);
    const fichier = normalize(join(racine, url === "/" ? "index.html" : url));

    if (!fichier.startsWith(racine)) {
      reponse.writeHead(403);
      reponse.end("Accès interdit");
      return;
    }

    const contenu = await readFile(fichier);
    reponse.writeHead(200, {
      "Content-Type": types[extname(fichier)] || "application/octet-stream"
    });
    reponse.end(contenu);
  } catch {
    reponse.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    reponse.end("Fichier introuvable");
  }
});

serveur.listen(port, "0.0.0.0", () => {
  console.log(`Annuaire disponible sur http://localhost:${port}`);
});
