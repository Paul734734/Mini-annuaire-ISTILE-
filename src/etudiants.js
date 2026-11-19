export function moyenneGenerale(liste) {
  const notes = liste
    .map((etudiant) => etudiant.note)
    .filter((note) => Number.isFinite(note));

  if (notes.length === 0) return 0;

  const somme = notes.reduce((total, note) => total + note, 0);
  return Number((somme / notes.length).toFixed(2));
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
    effectifs[filiere] = (effectifs[filiere] || 0) + 1;
    return effectifs;
  }, {});
}

export function moyenneParFiliere(liste) {
  const groupes = liste.reduce((resultat, etudiant) => {
    if (Number.isFinite(etudiant.note)) {
      const filiere = etudiant.filiere;
      resultat[filiere] = resultat[filiere] || [];
      resultat[filiere] = [...resultat[filiere], etudiant.note];
    }
    return resultat;
  }, {});

  return Object.entries(groupes).reduce((moyennes, [filiere, notes]) => {
    const somme = notes.reduce((total, note) => total + note, 0);
    moyennes[filiere] = Number((somme / notes.length).toFixed(2));
    return moyennes;
  }, {});
}

export function classementParNote(liste) {
  return [...liste].sort((a, b) => (b.note ?? -1) - (a.note ?? -1));
}

export function majNote(liste, id, note) {
  return liste.map((etudiant) =>
    etudiant.id === id ? { ...etudiant, note } : etudiant
  );
}
