export async function simulerFetch(chemin) {
  try {
    const reponse = await fetch(chemin);

    if (!reponse.ok) {
      throw new Error(`Erreur HTTP : ${reponse.status}`);
    }

    return await reponse.json();
  } catch (erreur) {
    throw new Error(`La récupération des données a échoué : ${erreur.message}`);
  }
}
