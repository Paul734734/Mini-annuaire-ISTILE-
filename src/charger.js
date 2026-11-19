function versUtilisateur(donnees) {
  const { id, firstName, lastName, email } = donnees;
  return { id, prenom: firstName, nom: lastName, email };
}

export async function chargerUtilisateurs(limite = 5, base = "https://dummyjson.com") {
  try {
    const reponse = await fetch(`${base}/users?limit=${limite}`);
    if (!reponse.ok) {
      console.error(`Erreur : le serveur a répondu ${reponse.status}`);
      return [];
    }
    const donnees = await reponse.json();
    return donnees.users.map(versUtilisateur);
  } catch (erreur) {
    console.error(`Erreur réseau : ${erreur.message}`);
    return [];
  }
}

export async function chargerUtilisateur(id, base = "https://dummyjson.com") {
  try {
    const reponse = await fetch(`${base}/users/${id}`);
    if (reponse.status === 404) {
      console.error(`Utilisateur ${id} introuvable (404)`);
      return null;
    }
    if (!reponse.ok) {
      console.error(`Erreur : le serveur a répondu ${reponse.status}`);
      return null;
    }
    return versUtilisateur(await reponse.json());
  } catch (erreur) {
    console.error(`Erreur réseau : ${erreur.message}`);
    return null;
  }
}
