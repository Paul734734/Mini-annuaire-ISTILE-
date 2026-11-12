import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const racine = fileURLToPath(new URL("../", import.meta.url));
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

const serveur = http.createServer(async (requete, reponse) => {
  try {
    const chemin = decodeURIComponent((requete.url || "/").split("?")[0]);
    const fichier = normalize(join(racine, chemin === "/" ? "index.html" : chemin));

    if (!fichier.startsWith(racine)) {
      reponse.writeHead(403);
      reponse.end("Accès interdit");
      return;
    }

    const contenu = await readFile(fichier);
    reponse.writeHead(200, { "Content-Type": types[extname(fichier)] || "application/octet-stream" });
    reponse.end(contenu);
  } catch {
    reponse.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    reponse.end("Fichier introuvable");
  }
});

serveur.listen(3000, () => {
  console.log("Annuaire disponible sur http://localhost:3000");
});
