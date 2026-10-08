/* ============================================================
   JOUR 1 - Windev vers JavaScript moderne (ES6+)
   ------------------------------------------------------------
   CONSIGNE : sous chaque bloc Windev, écris l'équivalent JS.
   Puis lance avec :  node jour-1-windev-to-js.js
   Objectif : les 10 console.log affichent le bon résultat.
   ============================================================ */

// ---------- EXO 1 : SI / SINON simple ----------
// Windev :
//   SI montant > 100000 ALORS
//     remise = 10
//   SINON
//     remise = 0
//   FIN
// Traduis en JS avec montant = 150000, affiche "Remise : 10%"

const montant = 150000;
let remise;
if (montant > 100000) {
  remise = 10;
} else {
  remise = 0;
}
console.log(`Remise : ${remise}%`);
// ---------- EXO 2 : SI / SINON en chaîne + ternaire ----------
// Windev :
//   SI typeClient = "VIP" ALORS message = "Livraison gratuite + cadeau"
//   SINON SI typeClient = "Fidele" ALORS message = "Livraison gratuite"
//   SINON message = "Livraison 500 DA"
// Fais-le 1 fois avec if/else, 1 fois avec ternaire imbriqué.

const typeClient = "Fidele";
let message;
if(typeClient==="VIP"){
message = "Livraison gratuite + cadeau";
  }else if(typeClient==="Fidele"){
  message = "Livraison gratuite";
}else{
message = "Livraison 500 DA";
}
console.log(message);


// ---------- EXO 3 : BOUCLE POUR - total d'un tableau ----------
// Windev :
//   total = 0
//   POUR i = 1 A TableauOccurrence(montants)
//     total += montants[i]
//   FIN
// Traduis avec une boucle for classique.

const montants = [12000, 8500, 43000, 6200];
let somme = 0;
for (let i = 0; i < montants.length; i++) {
  somme += montants[i];
}
console.log(`Total = ${somme}`);

// ---------- EXO 4 : POUR TOUT - afficher chaque produit ----------
// Windev :
//   POUR TOUT produit DE produits
//     Info(produit)
//   FIN
// Traduis avec for...of : affiche "- <nom> : <prix> DA"

const produits = [
  { nom: "Clavier", prix: 3500 },
  { nom: "Souris", prix: 1800 },
  { nom: "Écran", prix: 28000 },
];
for (const produit of produits) {
  console.log(`- ${produit.nom} : ${produit.prix} DA`);
}

// ---------- EXO 5 : TANT QUE ----------
// Windev :
//   i = 1
//   TANTQUE i <= 5
//     Info("Facture N° " + i)
//     i++
//   FIN
// Traduis avec while.

let i = 1;
while(i <= 5){
  console.log(`Facture N° ${i}`);
  i++;
}
// TODO exo 5 :

// ---------- EXO 6 : Fonction -> fonction fléchée (calcul TVA DZ) ----------
// Windev :
//   PROCÉDURE CalculTTC(prixHT)
//   RENVOYER prixHT * 1.19
// Crée une arrow function calculTTC et teste avec 10000 (attendu : 11900).

// TODO exo 6 :
const calculTTC = (prixHT) => prixHT * 1.19;
console.log(calculTTC(10000));

// ---------- EXO 7 : Concaténation -> template literals ----------
// Windev : "Facture " + numéro + " : " + total + " DA (" + client + ")"
// Refais cette phrase avec des backticks ` ` et ${ }.

const numero = 1024,
  total = 23800,
  client = "SARL Numidia";
// TODO exo 7 (attendu : Facture 1024 : 23800 DA (SARL Numidia)) :
console.log(`Facture N° ${numero} : ${total} DA ${client}`);
// ---------- EXO 8 : Destructuring - extraire d'un objet ----------
// Windev : nom = MonClient.Nom ; tel = MonClient.Tel
// En JS, extrais nom et tel en UNE ligne avec { }.

const monClient = { nom: "Amine Benali", tel: "0550 12 34 56", wilaya: "Oran" };
// TODO exo 8 (affiche : Amine Benali - 0550 12 34 56) :  
const { nom, tel } = monClient;
console.log(`${nom} - ${tel}`);
// ---------- EXO 9 : Spread - copier sans modifier (BASE DE REACT) ----------
// En Windev tu modifies directement. En React c'est INTERDIT.
// Crée un NOUVEAU tableau avec "Chargeur" en plus, sans toucher l'original.
// Affiche les 2 tableaux pour prouver que l'original n'a pas changé.

const panier = ["PC", "Souris"]
// TODO exo 9 : const nouveauPanier = [...panier, "Chargeur"];
const nouveauPanier = [...panier, "Chargeur"];
console.log(nouveauPanier);
console.log(panier);

// ---------- EXO 10 : BONUS - reduce (avant-goût de demain) ----------
// Calcule le total du panier ci-dessous en UNE ligne avec .reduce().
// Détail : chaque ligne = prix * quantite. Attendu : 33500.

const lignes = [
  { designation: "RAM 8Go", prix: 6000, quantite: 2 },
  { designation: "SSD 512Go", prix: 9500, quantite: 1 },
  { designation: "Souris", prix: 1800, quantite: 5 },
  { designation: "Tapis", prix: 600, quantite: 5 },
];
// TODO exo 10 :          
const totalPanier = lignes.reduce((acc, ligne) => acc + ligne.prix * ligne.quantite, 0);
console.log(`Total = ${totalPanier}`);

/* ============================================================
   FIN - Quand tout s'affiche correctement :
   1. git add . / git commit -m "Jour 1 : 10 exos Windev vers JS"
   2. git push vers ton repo js-remise-a-niveau
   3. Envoie-moi ton code ou le lien GitHub pour correction !
   ============================================================ */
