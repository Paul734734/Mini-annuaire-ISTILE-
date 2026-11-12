# Mini-annuaire ISTILE

Mini-annuaire des étudiants de niveau 3 réalisé avec HTML5, CSS3 et JavaScript ES6.

## Prérequis

- Node.js
- npm
- Git

## Installation

```bash
git clone https://github.com/Paul734734/Mini-annuaire-ISTILE-.git
cd Mini-annuaire-ISTILE-
npm start
```

Ouvrir ensuite http://localhost:3000 dans le navigateur.

## Fonctionnalités

- Présentation de l'annuaire
- Liste des 20 étudiants fournis dans le kit de départ
- Consultation des profils
- Recherche par nom, filière ou note
- Filtrage par filière et tri des résultats
- Statistiques calculées à partir du fichier JSON
- Formulaire de contact de démonstration
- Affichage responsive et thème sombre

## Organisation

- `data/etudiants.json` : données officielles du kit de départ
- `src/charger.js` : récupération et préparation des données avec Fetch API
- `src/etudiants.js` : recherche, tri et calcul des statistiques
- `src/main.js` : interactions et affichage des pages
- `outils/simulerFetch.js` : simulation de réponses Fetch pour les exercices sur l'API

Le serveur local est lancé par `npm start`. Le fichier `outils/simulerFetch.js` est un outil séparé destiné aux exercices de simulation d'API ; il n'est pas nécessaire pour charger le fichier JSON local.
