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

const etudiants = JSON.parse(
  await readFile(new URL("../data/etudiants.json", import.meta.url), "utf8")
);

console.log("Moyenne générale :", moyenneGenerale(etudiants));
console.log("Admis :", admis(etudiants));
console.log("Noms formatés :", nomsFormates(etudiants));
console.log("Effectif par filière :", effectifParFiliere(etudiants));
console.log("Moyenne par filière :", moyenneParFiliere(etudiants));

const classement = classementParNote(etudiants);
console.log("Classement par note :", classement);
console.log("Premier de la liste d'origine inchangé :", etudiants[0].prenom, etudiants[0].nom);

const nouvelleListe = majNote(etudiants, 1, 20);
console.log("Ancien étudiant :", etudiants[0]);
console.log("Nouvel étudiant :", nouvelleListe[0]);
console.log("Objets différents :", etudiants[0] !== nouvelleListe[0]);
console.log("Ancienne note inchangée :", etudiants[0].note);

console.log("Scénario 1 : succès");
console.log(await chargerUtilisateurs(3));

console.log("Scénario 2 : utilisateur inexistant");
console.log(await chargerUtilisateur(99999));

console.log("Scénario 3 : erreur réseau");
console.log(await chargerUtilisateurs(3, "https://hote-invalide.exemple"));
