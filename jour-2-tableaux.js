/* ============================================================
   JOUR 2 - Tableaux & Objets : map / filter / find / reduce...
   ------------------------------------------------------------
   Base : 8 factures d'une gestion commerciale DZ.
   Consigne : UNE méthode par exo (sauf exo 7 = chaînage).
   Lancement : node jour-2-tableaux.js
   ============================================================ */

const factures = [
  {
    id: 1,
    client: "SARL Numidia",
    wilaya: "Alger",
    montantHT: 120000,
    payee: true,
  },
  {
    id: 2,
    client: "Amine Benali",
    wilaya: "Oran",
    montantHT: 8500,
    payee: false,
  },
  {
    id: 3,
    client: "ETS El Baraka",
    wilaya: "Sétif",
    montantHT: 43000,
    payee: true,
  },
  {
    id: 4,
    client: "SARL Numidia",
    wilaya: "Alger",
    montantHT: 62000,
    payee: false,
  },
  {
    id: 5,
    client: "Pharmacie El Nour",
    wilaya: "Blida",
    montantHT: 15000,
    payee: false,
  },
  {
    id: 6,
    client: "Amine Benali",
    wilaya: "Oran",
    montantHT: 210000,
    payee: true,
  },
  {
    id: 7,
    client: "ETS El Baraka",
    wilaya: "Sétif",
    montantHT: 9500,
    payee: false,
  },
  {
    id: 8,
    client: "SARL Atlas",
    wilaya: "Alger",
    montantHT: 78000,
    payee: true,
  },
];
const TVA = 1.19;

// ---------- EXO 1 : map (transformer) ----------
// Windev : POUR TOUT f DE factures → nouveau tableau des montants TTC.
// Avec .map, crée le tableau des 8 montants TTC (montantHT * 1.19).
// Attendu : [142800, 10115, 51170, 73780, 17850, 249900, 11305, 92820]
const montantsTTC = factures.map((f) => f.montantHT * TVA);
console.log("Exo 1 - montants TTC :", montantsTTC);

// ---------- EXO 2 : filter (filtrer = WHERE) ----------
// Windev : requête "SELECT * FROM factures WHERE payee = Faux".
// Avec .filter, récupère les factures IMPAYÉES (4 objets complets).
// Attendu : ids 2, 4, 5, 7 → affiche-les avec console.table() !
// TODO exo 2 (astuce : console.table() affiche un beau tableau) :
const impayés = factures.filter((f) => !f.payee);
console.table(impayés);

// ---------- EXO 3 : find (trouver UN = HLitRecherche) ----------
// Trouve LA facture du client "Pharmacie El Nour" (un seul objet).
// Attendu : { id: 5, ... } → affiche `Trouvée : facture N°5 - 15000 DA`
// TODO exo 3 :
const factureclient = factures.find((f) => f.client == "Pharmacie El Nour");
console.log(
  `trouvée : Facture N° ${factureclient.id} - ${factureclient.montantHT} DA pour ${factureclient.client}  `,
);

// ---------- EXO 4 : reduce (agréger = SUM) ----------
// Calcule avec .reduce : (a) le CA total HT, (b) le total des impayés HT.
// Attendu : CA total = 546000 | Impayés = 95000
// TODO exo 4a (CA total) :
// TODO exo 4b (impayés : astuce = if dans le reduce, ou filter + reduce) :
const catotal = factures.reduce((acc, f) => acc + f.montantHT, 0);
console.log(`CA total : ${catotal} DA`);
const impayésHT = impayés.reduce((acc, f) => acc + f.montantHT, 0);
console.log(`Impayés : ${impayésHT} DA`);

// ---------- EXO 5 : sort (trier + LE PIÈGE) ----------
// 5a. Trie les montants avec .sort() SANS comparateur, affiche → observe le bug !
// 5b. Trie les factures par montantHT DÉCROISSANT (comparateur (a, b) => b - a).
// Attendu 5b : ids dans l'ordre 6, 1, 8, 4, 3, 5, 7, 2.
// ⚠️ .sort() modifie l'original ! Copie d'abord avec [...factures].
const montantsTest = [120000, 8500, 43000, 62000];
const triBizarre = montantsTest.sort();
console.log(
  "5a - tri SANS comparateur (ordre alphabétique, pas numérique) :",
  triBizarre,
);

const facturesTriees = [...factures].sort((a, b) => b.montantHT - a.montantHT);
console.log(
  "5b - ids par montantHT décroissant :",
  facturesTriees.map((f) => f.id),
);
// ---------- EXO 6 : some / every (EXISTE ? / TOUS ?) ----------
// 6a. Y a-t-il AU MOINS une facture > 100000 ? (some → true/false)
// 6b. TOUTES les factures sont-elles payées ? (every → true/false)
// Attendu : 6a = true | 6b = false
// TODO exo 6 :
for (const f of factures) {
  if (f.montantHT > 100000) {
    some = true;
    //return true;
  }
}
for (const f of factures) {
  if (!f.payee) {
    every = false;
    // return false;
  }
}
//return true;
console.log("6a - Y a-t-il AU MOINS une facture > 100000 ? :", some);
console.log("6b - TOUTES les factures sont-elles payées ? :", every);

// ---------- EXO 7 : CHAÎNAGE (le one-liner de pro) ----------
// En UNE expression : impayées → triées par montant décroissant → top 2 →
// affiche "client : montant DA". Équivalent Windev : requête + tri + TOP 2.
// Attendu :
//   SARL Numidia : 62000 DA
//   Pharmacie El Nour : 15000 DA
factures
  .filter((f) => !f.payee)
  .sort((a,b) => b.montantHT - a.montantHT)
  .slice(0,2)
  //.forEach((f) => console.log(`${f.client} : ${f.montantHT} DA`));
  .map((f) => `${f.client} : ${f.montantHT} DA`)

// ---------- EXO 8 : JSON (parler aux API) ----------
// 8a. Transforme les impayées en texte JSON (JSON.stringify), affiche.
// 8b. Re-transforme ce texte en tableau (JSON.parse), affiche le nombre.
// Attendu 8b : "Reçu : 4 factures" (c'est comme ça que front et API échangent).
const impayésJSON = JSON.stringify(impayés);
console.log("8a - JSON :", impayésJSON);
const impayésRecues = JSON.parse(impayésJSON);
console.log(`Reçu : ${impayésRecues.length} factures`);

// ---------- EXO 9 : BONUS - GROUP BY (regrouper par wilaya) ----------
// Équivalent Windev : SELECT wilaya, SUM(montant) GROUP BY wilaya.
// Avec .reduce, construis : { Alger: 260000, Oran: 218500, ... } (totaux HT).
// Attendu : Alger = 260000 | Oran = 218500 | Sétif = 52500 | Blida = 15000

const totauxParWilaya = factures.reduce((acc, f) => {
  acc[f.wilaya] =(acc[f.wilaya]||0) + f.montantHT;
  return acc;
}, {});
console.log("9 - totaux HT par wilaya :", totauxParWilaya);

/* ============================================================
   FIN - Puis : git add . / commit "Jour 2 : tableaux et objets"
   / push vers js-remise-a-niveau (MÊME repo qu'hier).
   Envoie-moi le lien pour correction + note !
   ============================================================ */
