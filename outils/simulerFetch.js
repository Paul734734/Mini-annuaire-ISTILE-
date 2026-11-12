// À utiliser uniquement si l'API de démonstration n'est pas accessible.
// import { simulerFetch } from "../outils/simulerFetch.js";
// globalThis.fetch = simulerFetch;

const PRENOMS = ["Emily", "Michael", "Sophia", "James", "Olivia", "Liam", "Ava", "Noah"];
const NOMS = ["Johnson", "Williams", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"];

const fabriquer = (id) => ({
  id,
  firstName: PRENOMS[(id - 1) % 8],
  lastName: NOMS[(id - 1) % 8],
  email: `${PRENOMS[(id - 1) % 8].toLowerCase()}.${NOMS[(id - 1) % 8].toLowerCase()}@x.dummyjson.com`
});

const reponse = (status, corps) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => corps
});

export function simulerFetch(url) {
  const adresse = new URL(url);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (adresse.hostname.includes("invalide")) {
        reject(new TypeError("fetch failed"));
        return;
      }

      const correspondance = adresse.pathname.match(/^\/users\/(\d+)$/);

      if (correspondance) {
        const id = Number(correspondance[1]);
        resolve(id > 208
          ? reponse(404, { message: `User with id '${id}' not found` })
          : reponse(200, fabriquer(id)));
        return;
      }

      if (adresse.pathname === "/users") {
        const limite = Number(adresse.searchParams.get("limit") ?? 30);
        const users = Array.from(
          { length: Math.min(limite, 208) },
          (_, index) => fabriquer(index + 1)
        );

        resolve(reponse(200, { users, total: 208, skip: 0, limit: limite }));
        return;
      }

      resolve(reponse(404, { message: "Not found" }));
    }, 150);
  });
}
