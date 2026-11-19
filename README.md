# Mini-annuaire ISTILE

Réalisé par Paul Jovani.
Ce projet présente les étudiants de niveau 3 de l'ISTILE.
La page utilise HTML5 et CSS3 pour une présentation simple et responsive.
JavaScript ES6 lit les données JSON, calcule les résultats et teste une API.

## Lancer le programme

```bash
npm start
```

Cette commande exécute `src/main.js` et affiche les résultats dans le terminal.

Pour consulter la page web, ouvrez le fichier `index.html` dans votre navigateur.

## Organisation des fichiers

- `index.html` : structure de la page.
- `style.css` : mise en forme responsive.
- `data/etudiants.json` : liste des étudiants.
- `src/etudiants.js` : fonctions de traitement des données.
- `src/charger.js` : fonctions de chargement depuis l'API.
- `src/main.js` : programme principal.
- `outils/simulerFetch.js` : simulation de l'API en cas d'absence de connexion.
