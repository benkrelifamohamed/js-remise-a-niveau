/* ============================================================
   JOUR 3 - Async / API REST : fetch, await, try/catch
   ------------------------------------------------------------
   On appelle de VRAIES API sur internet :
   - jsonplaceholder (fausse API d'entraînement, ultra-fiable)
   - wilaya.json (les 58 wilayas DZ, noms FR + AR)
   Lancement : node jour-3-async.js (connexion internet requise !)
   ============================================================ */

const API_USERS = "https://jsonplaceholder.typicode.com/users"; // URL GET : liste des utilisateurs
const API_POSTS = "https://jsonplaceholder.typicode.com/posts"; // URL GET/POST : articles (posts)
const API_WILAYAS =
  "https://raw.githubusercontent.com/lamaridev/Algeria-wilaya-cities/master/wilaya.json"; // URL GET : 58 wilayas DZ

// ---------- EXO 1 : Promise + await (attendre 1 seconde) ----------
// Crée attendre(ms) qui retourne new Promise + setTimeout(resolve, ms).
// Puis : affiche "Début...", await attendre(1000), affiche "Fin (après 1s)".
// Attendu : les 2 lignes avec 1 seconde d'écart.
function attendre(ms) {
  // ms = durée en millisecondes (1000 = 1 seconde)
  return new Promise((resolve) => setTimeout(resolve, ms));
  // new Promise : on crée une "promesse" (travail pas encore fini)
  // resolve : fonction à appeler quand le travail EST fini
  // setTimeout(resolve, ms) : après ms millisecondes, on appelle resolve() → la Promise devient "tenue"
}

async function exo1() {
  // async : cette fonction PEUT utiliser await (pause jusqu'à ce qu'une Promise finisse)
  console.log("Début..."); // affiche tout de suite
  await attendre(1000); // PAUSE ici 1 seconde (sans bloquer Node : il peut faire autre chose)
  console.log("Fin (après 1s)"); // s'affiche seulement APRÈS la pause
}

// ---------- EXO 2 : fetch GET (liste des utilisateurs) ----------
// Récupère API_USERS, convertis en JSON, affiche le NOMBRE + tous les noms.
// Attendu : "Nombre d'utilisateurs : 10" puis 10 noms (map).
async function exo2() {
  const res = await fetch(API_USERS); // GET HTTP : on attend la réponse (pas encore les données)
  const users = await res.json(); // 2e await : on lit le corps et on le transforme en tableau JS
  console.log(`Nombre d'utilisateurs : ${users.length}`); // .length = nombre d'éléments (10)
  users.map((u) => u.name).forEach((nom) => console.log(nom));
  // .map : nouveau tableau avec seulement les noms
  // .forEach : pour chaque nom, on l'affiche
}

// ---------- EXO 3 : fetch + find (Jour 2 recyclé !) ----------
// Récupère les users, TROUVE celui dont l'email est "Sincere@april.biz".
// Attendu : "Trouvé : Leanne Graham"
async function exo3() {
  const res = await fetch(API_USERS); // même GET que l'exo 2
  const users = await res.json(); // tableau d'objets { id, name, email, ... }
  const user = users.find((u) => u.email === "Sincere@april.biz");
  // .find : PREMIER élément dont la condition est vraie (ou undefined si aucun)
  console.log(`Trouvé : ${user.name}`); // interpoler le nom dans le message
}

// ---------- EXO 4 : response.ok (LE PIÈGE : fetch ne rejette PAS les 404) ----------
// Appelle https://jsonplaceholder.typicode.com/route-inexistante.
// Vérifie response.ok : si faux, affiche "Erreur 404 attrapée proprement".
// SANS le if (!res.ok), ton code croirait que tout va bien. Teste !
async function exo4() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/route-inexistante", // URL qui n'existe pas → HTTP 404
  );
  if (!res.ok) {
    // res.ok = true seulement si status 200-299. Un 404 → ok = false
    // fetch RÉUSSIT quand même (pas d'exception) : d'où le if obligatoire
    console.log("Erreur 404 attrapée proprement");
  }
}

// ---------- EXO 5 : try/catch réseau (domaine inexistant) ----------
// Appelle https://domaine-qui-nexiste-pas-12345.com dans try/catch.
// Attendu : "Erreur réseau attrapée : ..." (message exact variable, pas de crash).
// C'est le filet de sécurité de TOUTES tes futures apps.
async function exo5() {
  try {
    // try : "tente ce code, s'il explose on va dans catch"
    await fetch("https://domaine-qui-nexiste-pas-12345.com"); // DNS / réseau impossible → THROW
  } catch (err) {
    // catch : on récupère l'erreur au lieu de crasher le script
    console.log("Erreur réseau attrapée :", err.message); // .message = texte lisible de l'erreur
  }
}

// ---------- EXO 6 : fetch POST (créer une ressource) ----------
// Envoie { title: "Ma facture", body: "Contenu test", userId: 1 } vers API_POSTS.
// Méthode POST + headers Content-Type application/json + body JSON.stringify.
// Attendu : "Post créé avec id : 101"
async function exo6() {
  const res = await fetch(API_POSTS, {
    // 2e argument = options (méthode, headers, body)
    method: "POST", // POST = créer une ressource (GET = lire)
    headers: { "Content-Type": "application/json" }, // on prévient le serveur : le body est du JSON
    body: JSON.stringify({
      // body doit être une CHAÎNE, pas un objet → stringify
      title: "Ma facture", // champ titre
      body: "Contenu test", // champ contenu
      userId: 1, // auteur fictif
    }),
  });
  const post = await res.json(); // la fausse API renvoie l'objet créé + un id
  console.log(`Post créé avec id : ${post.id}`); // jsonplaceholder donne toujours 101
}

// ---------- EXO 7 : les 58 wilayas DZ (le fun !) ----------
// 7a. Récupère API_WILAYAS (tableau de { nom_fr, nom_ar }), affiche le nombre.
// 7b. TROUVE "Oran" et affiche son code (= index + 1, car pas de champ code).
// Attendu : "58 wilayas chargées" + "Oran = wilaya N°31"

async function exo7() {
  const res = await fetch(API_WILAYAS); // GET le JSON des wilayas
  const wilayas = await res.json(); // tableau [{ nom_fr, nom_ar }, ...]
  console.log(`${wilayas.length} wilayas chargées`); // 58
  const indexOran = wilayas.findIndex((w) => w.nom_fr === "Oran");
  // findIndex : position dans le tableau (0 = Adrar, 30 = Oran). -1 si introuvable
  console.log(`Oran = wilaya N°${indexOran + 1}`); // code officiel = index + 1 → 31
}

// ---------- EXO 8 : BONUS Promise.all (parallèle = 2x plus vite) ----------
// Charge API_USERS et API_POSTS EN PARALLÈLE avec Promise.all.
// Attendu : "10 users + 100 posts (chargés en parallèle)"
// (En séquentiel : 2 attentes. En parallèle : 1 seule. Mesure la différence !)
async function exo8() {
  const t0 = Date.now(); // horloge maintenant (ms) pour mesurer la durée
  const [resUsers, resPosts] = await Promise.all([
    // Promise.all : lance les 2 fetch EN MÊME TEMPS, attend que les 2 finissent
    fetch(API_USERS), // requête 1 (démarre tout de suite)
    fetch(API_POSTS), // requête 2 (démarre aussi tout de suite, pas après la 1)
  ]); // [resUsers, resPosts] : déstructuration du tableau renvoyé par Promise.all
  const [users, posts] = await Promise.all([resUsers.json(), resPosts.json()]);
  // pareil : parser les 2 JSON en parallèle
  const duree = Date.now() - t0; // temps écoulé depuis t0
  console.log(
    `${users.length} users + ${posts.length} posts (chargés en parallèle)`,
  );
  console.log(`(durée parallèle : ${duree} ms)`); // souvent ~ le temps du PLUS LENT, pas la somme
}

// ---------- Programme principal : TOUT le code async vit ici ----------
// Règle : await INTERDIT hors d'une fonction async → on met tout dans main().
async function main() {
  try {
    // si UN exo throw, on saute ici dans le catch (les suivants ne s'exécutent pas)
    await exo1(); // on attend la fin de l'exo 1 avant de passer au 2
    await exo2();
    await exo3();
    await exo4();
    await exo5();
    await exo6();
    await exo7();
    await exo8();
  } catch (err) {
    console.error("Problème :", err.message); // filet global : erreur non gérée dans un exo
  }
}

main(); // lance le programme (sans await ici : main() retourne une Promise, Node attend quand même)

/* ============================================================
   FIN - Puis : git add . / commit "Jour 3 : async et API"
   / push vers js-remise-a-niveau. Envoie-moi le lien !
   ============================================================ */
