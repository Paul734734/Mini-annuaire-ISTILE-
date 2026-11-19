import { readFile } from "node:fs/promises";
import {
  moyenneGenerale,
  admis,
  nomsFormates,
  effectifParFiliere,
  moyenneParFiliere,
  classementParNote,
  majNote
} from "./etudiants.js";
import { chargerUtilisateurs, chargerUtilisateur } from "./charger.js";

// En cas d'absence de connexion Internet, décommentez ces deux lignes :
// import { simulerFetch } from "../outils/simulerFetch.js";
// globalThis.fetch = simulerFetch;

const contenu = await readFile(
  new URL("../data/etudiants.json", import.meta.url),
  "utf8"
);
const etudiants = JSON.parse(contenu);

console.log("Moyenne générale :", moyenneGenerale(etudiants));
console.log("Étudiants admis :", admis(etudiants));
console.log("Noms formatés :", nomsFormates(etudiants));
console.log("Effectif par filière :", effectifParFiliere(etudiants));
console.log("Moyenne par filière :", moyenneParFiliere(etudiants));
console.log("Classement par note :", classementParNote(etudiants));

// Vérification : les fonctions ne modifient pas la liste d'origine.
const premiereNote = etudiants[0].note;
const classement = classementParNote(etudiants);
const listeModifiee = majNote(etudiants, etudiants[0].id, 20);

console.log("La liste d'origine est conservée :", etudiants[0].note === premiereNote);
console.log(
  "La note est modifiée uniquement dans la nouvelle liste :",
  listeModifiee[0].note === 20 && etudiants[0].note === premiereNote
);
console.log("Les deux listes sont différentes :", listeModifiee !== etudiants);
console.log("Le classement ne modifie pas la liste :", classement !== etudiants);

// Tests des trois situations de l'API.
async function testerAPI() {
  console.log("1. Test de chargement de trois utilisateurs :");
  console.log(await chargerUtilisateurs(3));

  console.log("2. Test d'un utilisateur inexistant :");
  console.log(await chargerUtilisateur(999999));

  console.log("3. Test d'une adresse invalide :");
  console.log(await chargerUtilisateur(1, "https://url-invalide.example"));
}

await testerAPI();
