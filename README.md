# Mini-annuaire ISTILE

Réalisé par Paul Jovani.
Ce projet présente les étudiants de niveau 3 de l'ISTILE.
La page utilise HTML5 et CSS3, et JavaScript calcule les résultats à partir du JSON.

## Lancer le programme

```bash
npm start
```

Cette commande exécute `src/main.js` et affiche les résultats dans le terminal.
Pour voir la page web, ouvrez `index.html` dans le navigateur.

Sans connexion Internet, ajoutez en haut de `src/main.js` :
`import { simulerFetch } from "../outils/simulerFetch.js"; globalThis.fetch = simulerFetch;`
