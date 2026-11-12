function creerAvatar(prenom, nom) {
  const initiales = `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" rx="80" fill="#e8efff"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="Arial,sans-serif" font-size="54" font-weight="700" fill="#1745a5">${initiales}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export async function chargerEtudiants() {
  try {
    const reponse = await fetch("./data/etudiants.json");

    if (!reponse.ok) {
      throw new Error(`Erreur HTTP : ${reponse.status}`);
    }

    const donnees = await reponse.json();

    if (!Array.isArray(donnees)) {
      throw new Error("Le fichier des étudiants n'a pas le format attendu.");
    }

    return donnees.map(({ id, prenom, nom, email, filiere, niveau, note }) => ({
      id,
      prenom,
      nom: `${prenom} ${nom}`,
      email,
      filiere,
      niveau,
      note: Number(note),
      photo: creerAvatar(prenom, nom),
      statut: "Actif",
      telephone: "Non renseigné"
    }));
  } catch (erreur) {
    throw new Error(`Impossible de charger les étudiants : ${erreur.message}`);
  }
}
