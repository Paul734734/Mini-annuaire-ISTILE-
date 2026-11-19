export function moyenneGenerale(liste) {
  const somme = liste.reduce((total, etudiant) => total + etudiant.note, 0);
  return Number((somme / liste.length).toFixed(2));
}

export function admis(liste) {
  return liste.filter((etudiant) => etudiant.note >= 10);
}

export function nomsFormates(liste) {
  return liste.map((etudiant) => `${etudiant.nom.toUpperCase()} ${etudiant.prenom}`);
}

export function effectifParFiliere(liste) {
  return liste.reduce((effectifs, etudiant) => {
    const filiere = etudiant.filiere;
    return { ...effectifs, [filiere]: (effectifs[filiere] || 0) + 1 };
  }, {});
}

export function moyenneParFiliere(liste) {
  const totaux = liste.reduce((resultat, etudiant) => {
    const { filiere, note } = etudiant;
    const ancien = resultat[filiere] || { somme: 0, nombre: 0 };
    return { ...resultat, [filiere]: { somme: ancien.somme + note, nombre: ancien.nombre + 1 } };
  }, {});

  return Object.entries(totaux).reduce((moyennes, [filiere, { somme, nombre }]) => {
    return { ...moyennes, [filiere]: Number((somme / nombre).toFixed(2)) };
  }, {});
}

export function classementParNote(liste) {
  return [...liste].sort((a, b) => b.note - a.note);
}

export function majNote(liste, id, note) {
  return liste.map((etudiant) => (etudiant.id === id ? { ...etudiant, note } : etudiant));
}
