import { chargerEtudiants } from "./charger.js";
import {
  obtenirFilieres,
  obtenirStatistiques,
  rechercherEtudiants,
  trierEtudiants
} from "./etudiants.js";

const elements = {
  nav: document.querySelector("#main-nav"),
  menuToggle: document.querySelector("#menu-toggle"),
  themeToggle: document.querySelector("#theme-toggle"),
  studentList: document.querySelector("#student-list"),
  featuredStudents: document.querySelector("#featured-students"),
  searchInput: document.querySelector("#student-search"),
  fieldFilter: document.querySelector("#field-filter"),
  sortSelect: document.querySelector("#sort-students"),
  studentCount: document.querySelector("#student-count"),
  emptyState: document.querySelector("#empty-state"),
  globalSearch: document.querySelector("#global-search"),
  searchResults: document.querySelector("#search-results"),
  searchSummary: document.querySelector("#search-summary"),
  dialog: document.querySelector("#profile-dialog"),
  profileContent: document.querySelector("#profile-content")
};

let etudiants = [];

function afficherCarte(etudiant) {
  const { id, nom, filiere, note, photo, statut } = etudiant;

  return `
    <article class="student-card">
      <img class="student-photo" src="${photo}" alt="Photo de ${nom}" loading="lazy">
      <div class="student-info">
        <h3>${nom}</h3>
        <p>${filiere}</p>
        <div class="student-grade"><span>★</span> ${note.toFixed(1)} / 20</div>
        <button class="profile-button" data-profile="${id}">Voir profil →</button>
      </div>
      <span class="student-status">● ${statut}</span>
    </article>
  `;
}

function afficherListe(liste, conteneur) {
  conteneur.innerHTML = liste.map(afficherCarte).join("");
}

function afficherStatistiques() {
  const stats = obtenirStatistiques(etudiants);
  const moyenne = stats.moyenne.toFixed(1);
  const cartes = [
    ["♟", stats.total, "Étudiants"],
    ["▰", Object.keys(stats.filieres).length, "Filières"],
    ["★", moyenne + "/20", "Moyenne générale"],
    ["🏆", stats.tauxReussite.toFixed(0) + "%", "Taux de réussite"]
  ];

  const html = cartes.map(([icone, valeur, libelle]) => `
    <article class="stat-card"><span class="stat-icon">${icone}</span>
      <div><strong>${valeur}</strong><small>${libelle}</small></div>
    </article>
  `).join("");

  document.querySelector("#home-stats").innerHTML = html;
  document.querySelector("#stats-cards").innerHTML = html;
  document.querySelector("#donut-total").textContent = stats.total;
  document.querySelector("#chart-average").textContent = moyenne;

  const couleurs = ["#2563eb", "#f02b62", "#12a57a", "#f6bd16", "#f58220", "#8b5cf6"];
  const total = stats.total || 1;
  let depart = 0;
  const parts = Object.entries(stats.filieres).map(([filiere, nombre], index) => {
    const fin = depart + nombre / total * 100;
    const couleur = couleurs[index % couleurs.length];
    depart = fin;
    return { filiere, nombre, couleur, fin };
  });

  document.querySelector("#donut-chart").style.background = parts
    .map((part, index) => `${part.couleur} ${index ? parts[index - 1].fin : 0}% ${part.fin}%`)
    .join(", ");

  document.querySelector("#field-legend").innerHTML = parts.map((part) => `
    <li><i style="background:${part.couleur}"></i><span>${part.filiere}</span><b>${Math.round(part.nombre / total * 100)}%</b></li>
  `).join("");

  const moyenneParSemestre = [15.2, 15.8, 16.4, stats.moyenne];
  const points = moyenneParSemestre.map((note, index) => {
    const x = 10 + index * 130;
    const y = 195 - (note - 12) * 18;
    return `${x},${y}`;
  }).join(" ");

  document.querySelector("#grade-line").setAttribute("points", points);
  document.querySelector("#grade-dots").innerHTML = moyenneParSemestre.map((note, index) => {
    const x = 10 + index * 130;
    const y = 195 - (note - 12) * 18;
    return `<circle cx="${x}" cy="${y}" r="5"></circle>`;
  }).join("");
}

function remplirFilieres() {
  const options = obtenirFilieres(etudiants)
    .map((filiere) => `<option value="${filiere}">${filiere}</option>`)
    .join("");

  elements.fieldFilter.insertAdjacentHTML("beforeend", options);
}

function mettreAJourListe() {
  let resultat = rechercherEtudiants(etudiants, elements.searchInput.value);

  if (elements.fieldFilter.value) {
    resultat = resultat.filter((etudiant) => etudiant.filiere === elements.fieldFilter.value);
  }

  resultat = trierEtudiants(resultat, elements.sortSelect.value);
  afficherListe(resultat, elements.studentList);
  elements.studentCount.textContent = `${resultat.length} étudiant(s)`;
  elements.emptyState.classList.toggle("hidden", resultat.length !== 0);
}

function afficherProfil(id) {
  const etudiant = etudiants.find((element) => element.id === Number(id));
  if (!etudiant) return;

  const { nom, filiere, note, photo, email, telephone, statut } = etudiant;
  elements.profileContent.innerHTML = `
    <div class="profile-detail">
      <img src="${photo}" alt="Photo de ${nom}">
      <h2>${nom}</h2>
      <p>${filiere}</p>
      <div class="student-grade"><span>★</span> ${note.toFixed(1)} / 20</div>
      <div class="profile-meta">
        <div><small>Adresse email</small><strong>${email}</strong></div>
        <div><small>Téléphone</small><strong>${telephone}</strong></div>
        <div><small>Statut</small><strong>${statut}</strong></div>
        <div><small>Niveau</small><strong>Licence 3</strong></div>
      </div>
    </div>
  `;

  elements.dialog.showModal();
}

function changerPage(page) {
  document.querySelectorAll(".page-section").forEach((section) => {
    section.classList.toggle("active", section.id === `page-${page}`);
  });

  document.querySelectorAll(".nav-link").forEach((lien) => {
    lien.classList.toggle("active", lien.dataset.page === page);
  });

  elements.nav.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (page === "etudiants") mettreAJourListe();
}

function lancerRecherche() {
  const terme = elements.globalSearch.value.trim();
  const resultat = rechercherEtudiants(etudiants, terme);
  afficherListe(resultat, elements.searchResults);
  elements.searchSummary.textContent = `${resultat.length} étudiant(s) trouvé(s)`;
}

function initialiserNavigation() {
  document.querySelectorAll("[data-page], a[href^='#']").forEach((lien) => {
    lien.addEventListener("click", (event) => {
      const page = lien.dataset.page || lien.getAttribute("href").slice(1);
      if (!document.querySelector(`#page-${page}`)) return;
      event.preventDefault();
      history.replaceState(null, "", `#${page}`);
      changerPage(page);
    });
  });

  elements.menuToggle.addEventListener("click", () => {
    elements.nav.classList.toggle("open");
  });

  const pageInitiale = location.hash.slice(1);
  if (pageInitiale && document.querySelector(`#page-${pageInitiale}`)) {
    changerPage(pageInitiale);
  }
}

function initialiserEvenements() {
  elements.searchInput.addEventListener("input", mettreAJourListe);
  elements.fieldFilter.addEventListener("change", mettreAJourListe);
  elements.sortSelect.addEventListener("change", mettreAJourListe);

  elements.globalSearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") lancerRecherche();
  });
  document.querySelector("#global-search-button").addEventListener("click", lancerRecherche);

  document.addEventListener("click", (event) => {
    const bouton = event.target.closest("[data-profile]");
    if (bouton) afficherProfil(bouton.dataset.profile);
  });

  document.querySelector("#dialog-close").addEventListener("click", () => elements.dialog.close());
  elements.dialog.addEventListener("click", (event) => {
    if (event.target === elements.dialog) elements.dialog.close();
  });

  elements.themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    elements.themeToggle.textContent = document.body.classList.contains("dark") ? "☀" : "☾";
  });

  document.querySelector("#contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector("#form-feedback").textContent = "Votre message a bien été enregistré dans cette démonstration.";
    event.target.reset();
  });
}

async function demarrer() {
  try {
    etudiants = await chargerEtudiants();
    afficherListe(etudiants, elements.studentList);
    afficherListe(etudiants.slice(0, 3), elements.featuredStudents);
    remplirFilieres();
    afficherStatistiques();
    mettreAJourListe();
    initialiserNavigation();
    initialiserEvenements();
  } catch (erreur) {
    document.querySelector("main").innerHTML = `<p class="empty-state">${erreur.message}</p>`;
    console.error(erreur);
  }
}

demarrer();
