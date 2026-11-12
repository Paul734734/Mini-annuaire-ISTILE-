export async function chargerEtudiants() {
  const reponse = await fetch("./data/etudiants.json");

  if (!reponse.ok) {
    throw new Error("Impossible de charger la liste des étudiants.");
  }

  return reponse.json();
}
