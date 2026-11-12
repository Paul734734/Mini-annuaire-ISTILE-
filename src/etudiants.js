export function rechercherEtudiants(etudiants, terme) {
  const recherche = terme.trim().toLocaleLowerCase("fr");

  if (!recherche) return etudiants;

  return etudiants.filter((etudiant) => {
    const nomComplet = `${etudiant.prenom || ""} ${etudiant.nom}`.toLocaleLowerCase("fr");
    const filiere = etudiant.filiere.toLocaleLowerCase("fr");
    const note = String(etudiant.note).replace(".", ",");

    return nomComplet.includes(recherche)
      || filiere.includes(recherche)
      || note.includes(recherche)
      || String(etudiant.note).includes(recherche);
  });
}

export function trierEtudiants(etudiants, critere) {
  const copie = [...etudiants];

  if (critere === "grade") return copie.sort((a, b) => b.note - a.note);
  if (critere === "grade-asc") return copie.sort((a, b) => a.note - b.note);

  return copie.sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
}

export function obtenirStatistiques(etudiants) {
  const total = etudiants.length;
  const somme = etudiants.reduce((acc, { note }) => acc + note, 0);
  const moyenne = total ? somme / total : 0;

  const filieres = etudiants.reduce((resultat, { filiere }) => {
    resultat[filiere] = (resultat[filiere] || 0) + 1;
    return resultat;
  }, {});

  const tauxReussite = total
    ? etudiants.filter(({ note }) => note >= 10).length / total * 100
    : 0;

  return { total, moyenne, filieres, tauxReussite };
}

export function obtenirFilieres(etudiants) {
  return [...new Set(etudiants.map(({ filiere }) => filiere))].sort((a, b) => a.localeCompare(b, "fr"));
}
