const fs = require("fs");
const path = require("path");

const out = path.join(__dirname, "data", "training.json");

const categories = [
  {
    intent: "greeting",
    questions: [
      "Salama",
      "Miarahaba tompoko",
      "Bonjour",
      "Bonsoir",
      "Manao ahoana",
      "Salama tompoko",
      "Hello",
      "Slt",
      "Miarahaba",
      "Ahoana tompoko?"
    ],
    answers: [
      "Miarahaba tompoko 😊 Faly miarahaba anao. Inona no tianao ho fantatra momba ny FAST CASHPOINT?",
      "Salama tompoko 👋 Vonona hanampy anao aho. Inona no fanontanianao?",
      "Miarahaba 😊 Lazao fotsiny izay tianao ho fantatra momba ny FAST CASHPOINT.",
      "Bonjour tompoko 👋 Inona no vaovao tianao ho fantatra momba ny application?",
      "Manao ahoana tompoko 😊 Ahoana no ahafahako manampy anao?"
    ]
  },

  {
    intent: "pricing",
    questions: [
      "Ohatrinona ny application?",
      "Firy ny vidin'ny FAST CASHPOINT?",
      "Ohatrinona no hividianana azy?",
      "Manao ahoana ny tarif?",
      "Combien coûte l'application?",
      "Quel est le prix?",
      "Vidiny azafady",
      "Ohatrinona izy?",
      "Ohatrinona no aloako?",
      "Misy tarif ve?"
    ],
    answers: [
      "Ny FAST CASHPOINT dia **20 000 Ar**. Izy io dia natao hanamorana ny asan'ny Agent Cash Point.",
      "20 000 Ar ny vidin'ny FAST CASHPOINT tompoko. Raha mila fanazavana momba ny application dia afaka manontany ianao.",
      "Ny tarif dia **20 000 Ar**. Afaka hazavaiko aminao koa ireo tombony azonao amin'ny application.",
      "20 000 Ar ihany tompoko no vidin'ny application. Ny tanjony dia ny hanamora sy hanafaingana ny opérations Cash Point."
    ]
  },

  {
    intent: "advantages",
    questions: [
      "Inona no tombony amin'ny FAST CASHPOINT?",
      "Fa maninona aho no mila an'ity application ity?",
      "Inona no mahasoa azy?",
      "Pourquoi utiliser FAST CASHPOINT?",
      "Inona no azoko amin'ity application ity?",
      "Tena ilaina amin'ny agent ve izy?",
      "Mampihena fotoana ve izy?",
      "Inona no maha samy hafa azy?",
      "Ahoana no hanamorany ny asako?",
      "Mety amin'ny agent cash point ve?"
    ],
    answers: [
      "Ny FAST CASHPOINT dia natao hanamora ny asan'ny Agent Cash Point, indrindra amin'ireo opérations miverimberina toy ny transfert, dépôt, crédit ary offres.",
      "Ny tanjony dia ny hampihena ny fotoana lany amin'ny fanoratana sy fitadiavana kaody USSD, ka hahatonga ny asa ho tsotra kokoa.",
      "Raha Agent Cash Point ianao dia afaka mampiasa azy hanamorana ireo opérations ilainao isan'andro.",
      "Ny tombony lehibe dia ny fahatsorana sy ny fahafahana miditra haingana amin'ireo fonctions ilain'ny Agent Cash Point."
    ]
  },

  {
    intent: "transfert",
    questions: [
      "Ahoana ny transfert?",
      "Afaka manao transfert ve?",
      "Misy transfert ao amin'ilay application?",
      "Ahoana no handefasana vola?",
      "Afaka mandefa vola amin'ny client ve aho?",
      "Manao transfert ahoana?",
      "Aiza ny transfert?",
      "Misy fonction fandefasana vola ve?",
      "Manamora transfert ve izy?",
      "Ahoana ny fanaovana transfert amin'ny FAST CASHPOINT?"
    ],
    answers: [
      "Eny tompoko. Ao amin'ny FAST CASHPOINT dia misy ny fonction **Transfert**, natao hanamorana ny asa ataon'ny Agent Cash Point.",
      "Ny Transfert dia iray amin'ireo opérations lehibe ao amin'ny application. Afaka miditra amin'ilay fonction ianao rehefa mila mandefa vola.",
      "Eny, natao hanamorana ny transfert ny application, ka tsy voatery hiantehitra amin'ny fanoratana kaody lava foana.",
      "Raha mila manao transfert ianao dia safidio ny **Transfert** ao amin'ny application ary araho ireo dingana aseho."
    ]
  },

  {
    intent: "depot",
    questions: [
      "Misy dépôt ve?",
      "Ahoana ny dépôt?",
      "Afaka manao dépôt ve aho?",
      "Aiza ny dépôt?",
      "Manamora dépôt ve ny application?",
      "Manao dépôt amin'ny client ahoana?",
      "Misy fonction cash in ve?",
      "Afaka mametraka vola ve?",
      "Ahoana no hanaovana dépôt?",
      "Misy dépôt ao amin'ny FAST CASHPOINT?"
    ],
    answers: [
      "Eny tompoko, misy ny **Dépôt** ao amin'ny FAST CASHPOINT mba hanamorana ny opération ataon'ny Agent Cash Point.",
      "Ny fonction Dépôt dia natao hanampiana anao rehefa manao dépôt ho an'ny client.",
      "Eny, afaka miditra amin'ny fonction Dépôt ianao ary manaraka ny dingana asehon'ny application.",
      "FAST CASHPOINT dia mampivondrona ireo opérations ilain'ny Agent Cash Point, anisan'izany ny Dépôt."
    ]
  },

  {
    intent: "credit",
    questions: [
      "Afaka mividy crédit ve?",
      "Misy achat crédit ve?",
      "Ahoana ny fividianana crédit?",
      "Misy crédit YAS ve?",
      "Afaka mivarotra crédit amin'ny client ve?",
      "Aiza ny crédit?",
      "Manamora achat crédit ve?",
      "Misy fonction crédit ve?",
      "Ahoana ny achat crédit?",
      "Afaka manao crédit YAS ve aho?"
    ],
    answers: [
      "Eny tompoko. Misy ny **Crédit/YAS** ao amin'ny FAST CASHPOINT mba hanamorana ny achat crédit.",
      "Ny fonction Crédit dia natao hanampiana ny Agent rehefa mividy na mivarotra crédit amin'ny client.",
      "Eny, misy fonction manokana ho an'ny crédit/YAS ao amin'ny application.",
      "Raha mila manao achat crédit ianao dia fidio ny **Crédit** ao amin'ny application ary araho ny dingana."
    ]
  },

  {
    intent: "offres",
    questions: [
      "Misy offre ve?",
      "Afaka mivarotra offre ve?",
      "Misy Mora ve?",
      "Misy Mora One ve?",
      "Misy Mora Plus ve?",
      "Ahoana ny vente offre?",
      "Misy First ve?",
      "Misy Yellow ve?",
      "Afaka mivarotra forfait ve?",
      "Aiza ny offres?"
    ],
    answers: [
      "Eny tompoko. Misy ny **Offres** ao amin'ny FAST CASHPOINT, natao hanamorana ny fivarotana offres.",
      "Ao amin'ny application dia misy ny fonction Vente d'offres, miaraka amin'ireo catégories ilaina toy ny Mora, First ary Yellow.",
      "Eny, natao hanamorana ny fitadiavana sy fampiasana ireo offres ilain'ny Agent Cash Point ilay fonction.",
      "Raha hivarotra offre ianao dia midira ao amin'ny **Offres**, dia safidio ilay offre mifanaraka amin'ny filan'ny client."
    ]
  },

  {
    intent: "solde",
    questions: [
      "Ahoana ny fijerena solde?",
      "Misy consultation solde ve?",
      "Afaka mijery balance ve?",
      "Aiza ny solde?",
      "Ahoana no ahitako ny vola sisa?",
      "Misy fonction solde ve?",
      "Afaka manao solde ve?",
      "Ahoana ny saldo?",
      "Misy balance ve?",
      "Ahoana no hijerena MVola solde?"
    ],
    answers: [
      "Eny tompoko, misy ny **Solde** ao amin'ny application mba hahafahanao miditra haingana amin'ny consultation solde.",
      "Raha te hijery ny solde ianao dia safidio ny fonction **Solde** ao amin'ny FAST CASHPOINT.",
      "Eny, misy consultation solde natao hanamora ny asa isan'andro.",
      "Ny fonction Solde dia natao hahafahanao mijery haingana ny balance ilainao."
    ]
  },

  {
    intent: "contacts",
    questions: [
      "Misy contact ve?",
      "Afaka mitady numéro ve?",
      "Ahoana ny fitadiavana client?",
      "Misy répertoire ve?",
      "Afaka mampiasa contact ve?",
      "Aiza ny contacts?",
      "Misy numéro client ve?",
      "Afaka miantso client ve?",
      "Ahoana ny fampiasana contact?",
      "Misy carnet d'adresses ve?"
    ],
    answers: [
      "Eny tompoko. Misy **Contacts/Répertoire** ao amin'ny application mba hanamorana ny fitadiavana numéro ilainao.",
      "Afaka mampiasa ny fonction Contacts ianao rehefa mila mitady na mampiasa numéro an'ny client.",
      "Ny Contacts dia manampy amin'ny fitantanana ireo numéro ilainao rehefa manao opération.",
      "Eny, natao hanamorana ny fitadiavana contact ny fonction Répertoire."
    ]
  },

  {
    intent: "historique",
    questions: [
      "Misy historique ve?",
      "Afaka mijery transaction taloha ve?",
      "Aiza ny historique?",
      "Afaka mahita opération natao ve?",
      "Misy history ve?",
      "Ahoana ny fijerena transaction?",
      "Afaka mitahiry historique ve?",
      "Misy lisitry ny opération ve?",
      "Ahoana ny transaction history?",
      "Afaka manara-maso opération ve?"
    ],
    answers: [
      "Eny tompoko. Misy **Historique** ao amin'ny FAST CASHPOINT mba hanamorana ny fanarahana ireo opérations.",
      "Ny Historique dia natao hanampiana anao hahita ireo transactions voatahiry ao amin'ny application.",
      "Eny, afaka mijery ny historique ianao rehefa mila manamarina opération iray.",
      "Ny tanjona dia ny hanananao toerana iray ahafahanao manaraka ireo opérations natao."
    ]
  },

  {
    intent: "facturation",
    questions: [
      "Misy facture ve?",
      "Afaka manao facture ve?",
      "Misy facturation ve?",
      "Afaka manao PDF ve?",
      "Afaka manao impression ve?",
      "Ahoana ny facture?",
      "Misy invoice ve?",
      "Afaka manonta transaction ve?",
      "Ahoana ny export PDF?",
      "Misy facturation ao amin'ny application?"
    ],
    answers: [
      "Eny tompoko. Misy ny fonction **Facturation** natao hanampiana amin'ny fanomanana sy fanondranana antontan-taratasy mifandraika amin'ny opérations.",
      "Misy fonction Facturation/PDF ao amin'ny application. Afaka mampiasa azy rehefa mila document momba ny opération.",
      "Eny, ny application dia manana fonction mifandraika amin'ny facturation sy export PDF.",
      "Raha mila facture na document ianao dia azonao jerena ao amin'ny **Facturation**."
    ]
  },

  {
    intent: "frais",
    questions: [
      "Ahoana ny frais?",
      "Misy frais agent ve?",
      "Afaka mijery frais ve?",
      "Aiza ny tarif frais?",
      "Inona ny frais de service?",
      "Misy calcul frais ve?",
      "Ahoana no hahafantarako ny frais?",
      "Misy tarif ao amin'ny application?",
      "Firy ny frais amin'ny opération?",
      "Misy frais Cash Point ve?"
    ],
    answers: [
      "Eny tompoko. Misy fizarana **Frais Agent** ao amin'ny FAST CASHPOINT hanampiana anao amin'ny fitantanana ny frais.",
      "Ny application dia manavaka ny frais de service Agent/Cash Point sy ny tarif operator. Izany dia manampy amin'ny fahazoana mazava kokoa ny calcul.",
      "Raha mila mijery frais ianao dia midira ao amin'ny fizarana **Frais Agent**.",
      "Ny frais dia tokony hojerena araka ny opération sy ny tarif ampiasainao. FAST CASHPOINT dia manampy amin'ny fandaminana izany."
    ]
  },

  {
    intent: "benefice",
    questions: [
      "Ahoana ny bénéfice?",
      "Afaka manao calcul bénéfice ve?",
      "Misy tombony net ve?",
      "Ahoana no hahafantarako ny gain?",
      "Misy profit ve?",
      "Ahoana ny bénéfice net?",
      "Afaka manao calcul gain ve?",
      "Inona ny tombony amin'ny opération?",
      "Misy bénéfice ao amin'ny application?",
      "Ahoana ny kajy tombony?"
    ],
    answers: [
      "Eny tompoko. Misy fizarana **Bénéfice** hanampiana anao hahatakatra ny tombony azo amin'ny opérations.",
      "Ny calcul bénéfice dia miankina amin'ny montant sy ny frais ampiharina. Ohatra, ny opération 20 000 Ar dia mety hahazo bénéfice net 750 Ar araka ny formule ampiasaina.",
      "FAST CASHPOINT dia natao hanampy anao hahita mazava kokoa ny bénéfice rehefa manao opération.",
      "Raha mila kajy bénéfice ianao dia azonao ampiasaina ny fizarana **Bénéfice** ao amin'ny application."
    ]
  },

  {
    intent: "installation",
    questions: [
      "Ahoana ny installation?",
      "Ahoana no hametrahana azy?",
      "Ahoana ny télécharger?",
      "Aiza no maka APK?",
      "Ahoana ny fametrahana FAST CASHPOINT?",
      "Afaka apetraka amin'ny Android ve?",
      "Mila APK ve?",
      "Ahoana no hanombohana mampiasa azy?",
      "Ahoana ny téléchargement?",
      "Mety amin'ny téléphone Android ve?"
    ],
    answers: [
      "FAST CASHPOINT dia application natao ho an'ny Android. Rehefa manana ny APK ianao dia afaka mametraka azy amin'ny téléphone mifanaraka aminy.",
      "Raha efa manana ny APK ianao dia alao ao amin'ny téléphone, sokafy, ary araho ny dingana installation.",
      "Raha mila fanampiana amin'ny installation ianao dia afaka milaza amiko ny modèle Android ampiasainao.",
      "Ny dingana installation dia miankina amin'ny Android sy ny fichier APK anananao. Afaka manampy anao tsikelikely aho."
    ]
  },

  {
    intent: "security",
    questions: [
      "Azo antoka ve ny application?",
      "Manao ahoana ny sécurité?",
      "Mila autorisation ve?",
      "Ahoana ny permission?",
      "Mandeha amin'ny données ve?",
      "Azo itokisana ve?",
      "Misy sécurité ve?",
      "Mila accès contact ve?",
      "Mila permission SMS ve?",
      "Ahoana ny confidentialité?"
    ],
    answers: [
      "Ny autorisations ilaina dia miankina amin'ireo fonctionnalités ampiasain'ny application. Tokony homena ihany ireo permissions ilaina amin'ny fonction ampiasainao.",
      "Momba ny sécurité, tsara foana ny mamaky sy manamarina ny permissions alohan'ny hanomezana autorisation.",
      "Raha misy permission tsy azonao dia lazao amiko hoe inona ilay permission miseho, dia hazavaiko aminao ny antony mety ilàna azy.",
      "Ny tanjona dia ny hampiasa permissions mifanaraka amin'ny fonctionnalités ilain'ny application."
    ]
  },

  {
    intent: "target",
    questions: [
      "Ho an'iza ity application ity?",
      "Agent cash point ve no mampiasa azy?",
      "Mety amin'ny vendeur ve?",
      "Iza no tokony hampiasa FAST CASHPOINT?",
      "Mety amin'ny professionnel ve?",
      "Ho an'ny agent ihany ve?",
      "Afaka mampiasa azy ve ny cash point?",
      "Mety amin'ny mpivarotra ve?",
      "Iza no tena ilainy?",
      "Application ho an'ny agent ve?"
    ],
    answers: [
      "FAST CASHPOINT dia natao indrindra ho an'ny **Agent Cash Point** sy ireo olona mitantana opérations Cash Point.",
      "Raha Agent Cash Point ianao dia natao hanampy anao amin'ny asa andavanandro ity application ity.",
      "Ny application dia mifantoka amin'ny filan'ny professionnel manao opérations Cash Point.",
      "Eny tompoko, ny Agent Cash Point no tena kendrena amin'ny FAST CASHPOINT."
    ]
  },

  {
    intent: "sales",
    questions: [
      "Te hividy aho",
      "Ahoana raha te hividy?",
      "Aiza no commande?",
      "Te haka application aho",
      "Ahoana ny fividianana?",
      "Afaka mividy izao ve?",
      "Ahoana no hahazoako azy?",
      "Te hampiasa FAST CASHPOINT aho",
      "Aiza no hividianana azy?",
      "Afaka manao commande ve?"
    ],
    answers: [
      "Faly izahay tompoko 😊 Ny vidin'ny FAST CASHPOINT dia **20 000 Ar**. Raha te hividy ianao dia afaka manohy amin'ny dingana commande.",
      "Eny tompoko. Raha vonona hividy ianao dia lazao fotsiny fa homeko anao ny dingana manaraka.",
      "20 000 Ar ny vidiny. Raha te haka azy ianao dia afaka manomboka amin'ny commande.",
      "Tsara tompoko 😊 Raha vonona ianao dia afaka manohy amin'ny fividianana FAST CASHPOINT."
    ]
  },

  {
    intent: "help",
    questions: [
      "Afaka manampy ahy ve?",
      "Mila fanampiana aho",
      "Ahoana no fampiasana azy?",
      "Tsy haiko ny mampiasa azy",
      "Ampio aho azafady",
      "Mila aide aho",
      "Afaka manazava ve?",
      "Ahoana no hanombohana?",
      "Misy guide ve?",
      "Azonao ampianarina ve aho?"
    ],
    answers: [
      "Mazava tompoko 😊 Afaka manampy anao tsikelikely aho. Lazao fotsiny izay fonction tianao hampiasaina.",
      "Eny tompoko. Lazao amiko raha Transfert, Dépôt, Crédit, Offres, Solde, Historique na Bénéfice no tianao ho fantatra.",
      "Aza manahy 😊 Afaka manazava aminao tsikelikely ny fampiasana FAST CASHPOINT aho.",
      "Vonona hanampy anao aho. Lazao fotsiny izay zavatra tsy mazava aminao."
    ]
  },

  {
    intent: "unknown",
    questions: [
      "Tsy azoko",
      "Mba hazavao",
      "Inona izany?",
      "Azafady mba manazava",
      "Mbola tsy azoko",
      "Inona no atao?",
      "Ahoana izany?",
      "Mba ampio aho",
      "Mila fanazavana",
      "Tsy haiko"
    ],
    answers: [
      "Mazava tompoko 😊 Mba lazao kely hoe inona no tianao ho fantatra: prix, installation, transfert, dépôt, crédit, offres, solde, historique na bénéfice?",
      "Afaka manampy anao aho. Lazao fotsiny ilay zavatra tadiavinao momba ny FAST CASHPOINT.",
      "Mba omeo fanazavana kely kokoa ilay fanontaniana tompoko dia ho mora kokoa amiko ny manampy anao.",
      "Tsy maninona tompoko 😊 Avereno amin'ny teny tsotra ilay fanontaniana dia andramako valiana."
    ]
  }
];

const variations = [
  "azafady",
  "tompoko",
  "mba",
  "fa",
  "kosa",
  "izao",
  "ve",
  "ahoana",
  "azafady tompoko",
  "mba lazao"
];

const training = [];
let id = 1;

function clean(s) {
  return s.replace(/\s+/g, " ").trim();
}

for (const category of categories) {
  let count = 0;

  for (let i = 0; i < 50; i++) {
    const baseQ = category.questions[i % category.questions.length];
    const baseA = category.answers[i % category.answers.length];

    let question;

    if (i < category.questions.length) {
      question = baseQ;
    } else {
      const v = variations[i % variations.length];

      if (i % 4 === 0) {
        question = clean(v + " " + baseQ);
      } else if (i % 4 === 1) {
        question = clean(baseQ + " " + v);
      } else if (i % 4 === 2) {
        question = clean(baseQ.replace("?", "") + " " + v + "?");
      } else {
        question = clean("Mba " + baseQ.replace("?", "") + " azafady?");
      }
    }

    training.push({
      id: id++,
      intent: category.intent,
      question,
      answer: baseA,
      language: /[àéèùô]/i.test(question) ? "mixed" : "mg-fr",
      active: true
    });

    count++;
  }
}

fs.writeFileSync(out, JSON.stringify(training, null, 2), "utf8");

console.log("======================================");
console.log("🤖 FAST CASHPOINT TRAINING");
console.log("======================================");
console.log("✅ Questions :", training.length);
console.log("✅ Réponses  :", training.length);
console.log("📁 Fichier   :", out);
console.log("======================================");
