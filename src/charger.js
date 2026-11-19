const API = "https://dummyjson.com";

export async function chargerUtilisateurs(
  limite = 5,
  base = API
) {
  try {
    const reponse = await fetch(`${base}/users?limit=${limite}`);

    if (!reponse.ok) {
      throw new Error(`Erreur HTTP ${reponse.status}`);
    }

    const donnees = await reponse.json();

    return donnees.users.map((utilisateur) => ({
      id: utilisateur.id,
      prenom: utilisateur.firstName,
      nom: utilisateur.lastName,
      email: utilisateur.email
    }));
  } catch (erreur) {
    console.error("Impossible de charger les utilisateurs :", erreur.message);
    return [];
  }
}

export async function chargerUtilisateur(id, base = API) {
  try {
    const reponse = await fetch(`${base}/users/${id}`);

    if (reponse.status === 404) {
      console.error("Utilisateur introuvable (404).");
      return null;
    }

    if (!reponse.ok) {
      throw new Error(`Erreur HTTP ${reponse.status}`);
    }

    const utilisateur = await reponse.json();

    return {
      id: utilisateur.id,
      prenom: utilisateur.firstName,
      nom: utilisateur.lastName,
      email: utilisateur.email
    };
  } catch (erreur) {
    console.error("Erreur lors du chargement de l'utilisateur :", erreur.message);
    return null;
  }
}
