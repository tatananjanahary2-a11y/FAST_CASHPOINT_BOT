const fs = require("fs");
const path = require("path");

const out = path.join(__dirname, "data", "training.json");

const data = {
greeting: {
q: [
"Salama","Miarahaba tompoko","Bonjour","Bonsoir","Manao ahoana",
"Salama tompoko","Hello","Slt","Miarahaba anao","Ahoana tompoko?",
"Bonjour tompoko","Salama ve","Manao ahoana ianareo","Miarahaba anao tompoko",
"Bonsoir tompoko","Hello tompoko","Slt tompoko","Salama ô","Miarahaba",
"Manahoana tompoko"
],
a: [
"Miarahaba tompoko 😊 Faly miarahaba anao. Inona no tianao ho fantatra momba ny FAST CASHPOINT?",
"Salama tompoko 👋 Vonona hanampy anao aho. Lazao fotsiny izay fanontanianao.",
"Miarahaba 😊 Inona no tianao ho fantatra momba ny application?",
"Bonjour tompoko. Afaka manampy anao amin'ny fanazavana momba ny FAST CASHPOINT aho.",
"Manao ahoana tompoko 😊 Lazao izay ilainao dia andramako hazavaina aminao.",
"Faly miarahaba anao tompoko 👋 Inona no vaovao tadiavinao momba ny FAST CASHPOINT?"
]
},

pricing: {
q: [
"Ohatrinona ny application?","Firy ny vidin'ny FAST CASHPOINT?",
"Ohatrinona no hividianana azy?","Manao ahoana ny tarif?",
"Combien coûte l'application?","Quel est le prix?",
"Vidiny azafady","Ohatrinona izy?","Ohatrinona no aloako?",
"Misy tarif ve?","Firy ny prix?","Prix FAST CASHPOINT azafady",
"Vidiny firy?","Mivarotra amin'ny ohatrinona ianareo?",
"20 000 Ar ve ny vidiny?","Ohatrinona no tokony haloako?",
"Misy promotion ve?","Quel est le tarif de l'application?",
"Je veux connaître le prix","Ahoana ny vidiny?"
],
a: [
"Ny FAST CASHPOINT dia **20 000 Ar** tompoko. Izy io dia natao hanamorana ny asan'ny Agent Cash Point.",
"20 000 Ar ny vidiny 😊 Raha mila fanazavana fanampiny dia afaka manontany ianao.",
"Ny tarif dia 20 000 Ar tompoko. Ny tanjona dia ny hanamora sy hanafaingana ny opérations Cash Point.",
"20 000 Ar ihany ny vidin'ny application. Raha vonona hividy ianao dia afaka manohy amin'ny commande.",
"Ny prix officiel ampiasaintsika amin'izao dia **20 000 Ar**."
]
},

advantages: {
q: [
"Inona no tombony amin'ny FAST CASHPOINT?","Fa maninona aho no mila an'ity application ity?",
"Inona no mahasoa azy?","Pourquoi utiliser FAST CASHPOINT?",
"Inona no azoko amin'ity application ity?","Tena ilaina amin'ny agent ve izy?",
"Mampihena fotoana ve izy?","Inona no maha samy hafa azy?",
"Ahoana no hanamorany ny asako?","Mety amin'ny agent cash point ve?",
"Manamora ny asa ve izy?","Inona no avantage?",
"Pourquoi acheter cette application?","Mety hahasoa ahy ve izy?",
"Afaka mitsitsy fotoana ve?","Inona no antony hampiasako azy?",
"Mora kokoa ve ny manao opération?","Manampy agent ve izy?",
"Application professionnelle ve izy?","Inona no tena tombony?"
],
a: [
"Ny FAST CASHPOINT dia natao hanamora ny asan'ny Agent Cash Point, indrindra ireo opérations miverimberina isan'andro.",
"Ny tanjony dia ny hampihena ny fotoana lany amin'ny fanoratana sy fitadiavana kaody USSD.",
"Raha Agent Cash Point ianao dia afaka mampiasa azy hanamorana ny asa andavanandro.",
"Ny tombony lehibe dia ny fahafahana miditra haingana amin'ireo fonctions ilain'ny Agent Cash Point.",
"Izy dia natao mba hahatonga ny asa ho tsotra kokoa, haingana kokoa ary voalamina kokoa.",
"Raha mbola manoratra kaody USSD lava matetika ianao, FAST CASHPOINT dia natao hanamorana izany asa izany."
]
},

transfert: {
q: [
"Ahoana ny transfert?","Afaka manao transfert ve?",
"Misy transfert ao amin'ilay application?","Ahoana no handefasana vola?",
"Afaka mandefa vola amin'ny client ve aho?","Manao transfert ahoana?",
"Aiza ny transfert?","Misy fonction fandefasana vola ve?",
"Manamora transfert ve izy?","Ahoana ny fanaovana transfert?",
"Misy bouton transfert ve?","Aiza no hanaovana transfert?",
"Afaka manampy amin'ny transfert ve?","Manao ahoana ny transfert amin'ny client?",
"Application transfert ve ity?","Mila manoratra code lava ve?",
"Ahoana no hanombohana transfert?","Misy raccourci transfert ve?",
"Afaka manao opération transfert ve?","Transfert no tiako hatao, ahoana?"
],
a: [
"Eny tompoko. Misy ny **Transfert** ao amin'ny FAST CASHPOINT mba hanamorana ny asa ataon'ny Agent Cash Point.",
"Ny Transfert dia iray amin'ireo opérations lehibe ao amin'ny application.",
"Raha hanao transfert ianao dia midira ao amin'ny fonction **Transfert** ary araho ireo dingana aseho.",
"Eny, natao hanamorana ny transfert ny application ka tsy voatery hiantehitra amin'ny fanoratana kaody lava foana.",
"Afaka manampy anao amin'ny fampiasana ny fonction Transfert aho raha mila fanazavana tsikelikely."
]
},

depot: {
q: [
"Misy dépôt ve?","Ahoana ny dépôt?","Afaka manao dépôt ve aho?",
"Aiza ny dépôt?","Manamora dépôt ve ny application?",
"Manao dépôt amin'ny client ahoana?","Misy fonction cash in ve?",
"Afaka mametraka vola ve?","Ahoana no hanaovana dépôt?",
"Misy dépôt ao amin'ny FAST CASHPOINT?","Aiza no ahitana dépôt?",
"Afaka manampy amin'ny dépôt ve?","Manao dépôt ahoana?",
"Misy bouton dépôt ve?","Ahoana ny opération dépôt?",
"Afaka manao cash in ve?","Misy fonction dépôt ve?",
"Tiako hatao dépôt, aiza?","Mety amin'ny agent ve ny dépôt?",
"Manamora cash in ve?"
],
a: [
"Eny tompoko, misy ny **Dépôt** ao amin'ny FAST CASHPOINT.",
"Ny fonction Dépôt dia natao hanampiana anao rehefa manao dépôt ho an'ny client.",
"Raha mila manao dépôt ianao dia safidio ny **Dépôt** ao amin'ny application.",
"Eny, ao anatin'ireo opérations lehibe tantanan'ny FAST CASHPOINT ny Dépôt.",
"Ny application dia manampy anao handamina sy hampandeha mora kokoa ny opération Dépôt."
]
},

credit: {
q: [
"Afaka mividy crédit ve?","Misy achat crédit ve?","Ahoana ny fividianana crédit?",
"Misy crédit YAS ve?","Afaka mivarotra crédit amin'ny client ve?",
"Aiza ny crédit?","Manamora achat crédit ve?","Misy fonction crédit ve?",
"Ahoana ny achat crédit?","Afaka manao crédit YAS ve aho?",
"Misy bouton crédit ve?","Aiza no hividianana crédit?",
"Afaka mivarotra crédit ve?","Manao achat crédit ahoana?",
"Misy YAS crédit ve?","Mety amin'ny agent ve ny crédit?",
"Ahoana no hanombohana achat crédit?","Misy fonction YAS ve?",
"Manamora ny vente crédit ve?","Mila mividy crédit aho, ahoana?"
],
a: [
"Eny tompoko. Misy ny **Crédit/YAS** ao amin'ny FAST CASHPOINT.",
"Ny fonction Crédit dia natao hanampiana ny Agent rehefa manao achat crédit.",
"Raha mila manao achat crédit ianao dia midira amin'ny **Crédit** ary araho ireo dingana aseho.",
"Eny, misy fonction manokana ho an'ny crédit/YAS.",
"FAST CASHPOINT dia natao hanamorana ny asa mifandraika amin'ny crédit ho an'ny Agent Cash Point."
]
},

offres: {
q: [
"Misy offre ve?","Afaka mivarotra offre ve?","Misy Mora ve?",
"Misy Mora One ve?","Misy Mora Plus ve?","Ahoana ny vente offre?",
"Misy First ve?","Misy Yellow ve?","Afaka mivarotra forfait ve?",
"Aiza ny offres?","Misy offre Mora ve?","Ahoana ny fivarotana offre?",
"Misy First offre ve?","Misy Yellow offre ve?","Misy Mora+ ve?",
"Afaka manao vente forfait ve?","Aiza no ahitana offre?",
"Misy bouton offres ve?","Manamora vente offre ve?",
"Ahoana no hisafidianana offre?"
],
a: [
"Eny tompoko. Misy ny **Offres** ao amin'ny FAST CASHPOINT.",
"Ny fonction Vente d'offres dia natao hanamorana ny fivarotana offres ho an'ny client.",
"Ao amin'ny Offres no ahafahanao miditra amin'ireo catégories toy ny Mora, First ary Yellow.",
"Raha hivarotra offre ianao dia midira ao amin'ny **Offres**, dia safidio izay mifanaraka amin'ny client.",
"Eny, natao hanamora ny fitadiavana sy fampiasana ireo offres ilain'ny Agent ilay fonction."
]
},

solde: {
q: [
"Ahoana ny fijerena solde?","Misy consultation solde ve?",
"Afaka mijery balance ve?","Aiza ny solde?",
"Ahoana no ahitako ny vola sisa?","Misy fonction solde ve?",
"Afaka manao solde ve?","Ahoana ny saldo?","Misy balance ve?",
"Ahoana no hijerena MVola solde?","Aiza no misy solde?",
"Afaka manamarina solde ve?","Misy bouton solde ve?",
"Ahoana no ahitako ny balance?","Mila mijery vola sisa aho, ahoana?",
"Misy consultation balance ve?","Afaka manao consultation solde ve?",
"Ahoana ny fijerena saldo?","Misy fonction balance ve?",
"Manamora consultation solde ve?"
],
a: [
"Eny tompoko, misy ny **Solde** ao amin'ny application.",
"Raha te hijery ny solde ianao dia safidio ny fonction **Solde**.",
"Ny fonction Solde dia natao hanamora ny consultation balance.",
"Eny, afaka miditra amin'ny consultation solde ianao ao amin'ny FAST CASHPOINT.",
"Raha mila manamarina ny vola sisa ianao dia ampiasao ny fonction Solde."
]
},

contacts: {
q: [
"Misy contact ve?","Afaka mitady numéro ve?","Ahoana ny fitadiavana client?",
"Misy répertoire ve?","Afaka mampiasa contact ve?","Aiza ny contacts?",
"Misy numéro client ve?","Afaka miantso client ve?","Ahoana ny fampiasana contact?",
"Misy carnet d'adresses ve?","Aiza ny répertoire?","Misy contact client ve?",
"Afaka mitady numéro client ve?","Misy fonction Contacts ve?",
"Afaka mampiasa numéro voatahiry ve?","Misy bouton contact ve?",
"Ahoana ny fitadiavana numéro?","Manamora recherche contact ve?",
"Afaka miantso amin'ny contact ve?","Misy répertoire client ve?"
],
a: [
"Eny tompoko. Misy **Contacts/Répertoire** ao amin'ny application.",
"Ny fonction Contacts dia manampy anao rehefa mila mitady numéro an'ny client.",
"Raha mila contact ianao dia midira ao amin'ny **Contacts**.",
"Eny, natao hanamorana ny fitadiavana sy fampiasana numéro ny Répertoire.",
"Afaka mampiasa ny contact voatahiry ianao rehefa mila numéro amin'ny opération."
]
},

historique: {
q: [
"Misy historique ve?","Afaka mijery transaction taloha ve?","Aiza ny historique?",
"Afaka mahita opération natao ve?","Misy history ve?",
"Ahoana ny fijerena transaction?","Afaka mitahiry historique ve?",
"Misy lisitry ny opération ve?","Ahoana ny transaction history?",
"Afaka manara-maso opération ve?","Aiza ny historique transaction?",
"Misy historique des opérations ve?","Afaka mijery ny opération taloha ve?",
"Manamora suivi transaction ve?","Misy suivi opération ve?",
"Ahoana no hijerena transaction?","Afaka manamarina transaction ve?",
"Misy liste transaction ve?","Misy fonction historique ve?",
"Afaka mahita izay nataoko teo aloha ve?"
],
a: [
"Eny tompoko. Misy **Historique** ao amin'ny FAST CASHPOINT.",
"Ny Historique dia natao hanampiana anao hanaraka ireo opérations voatahiry.",
"Raha mila manamarina opération iray ianao dia azonao jerena ao amin'ny Historique.",
"Eny, afaka mijery ireo transactions voatahiry ianao.",
"Ny tanjona dia ny hanananao toerana iray ahafahanao manaraka ireo opérations natao."
]
},

facturation: {
q: [
"Misy facture ve?","Afaka manao facture ve?","Misy facturation ve?",
"Afaka manao PDF ve?","Afaka manao impression ve?","Ahoana ny facture?",
"Misy invoice ve?","Afaka manonta transaction ve?","Ahoana ny export PDF?",
"Misy facturation ao amin'ny application?","Aiza ny facture?",
"Afaka manao document ve?","Misy PDF transaction ve?",
"Afaka manonta facture ve?","Ahoana ny impression?",
"Misy export ve?","Afaka maka PDF ve?",
"Misy fonction facturation ve?","Ahoana no hanaovana facture?",
"Afaka manao facture ho an'ny client ve?"
],
a: [
"Eny tompoko. Misy **Facturation** ao amin'ny application.",
"Ny fonction Facturation dia natao hanampiana amin'ny fanomanana document mifandraika amin'ny opération.",
"Eny, misy fonction mifandraika amin'ny PDF sy facturation.",
"Raha mila document na facture ianao dia jereo ny fizarana **Facturation**.",
"Ny application dia natao hanamorana ihany koa ny fitantanana document mifandraika amin'ny opérations."
]
},

frais: {
q: [
"Ahoana ny frais?","Misy frais agent ve?","Afaka mijery frais ve?",
"Aiza ny tarif frais?","Inona ny frais de service?","Misy calcul frais ve?",
"Ahoana no hahafantarako ny frais?","Misy tarif ao amin'ny application?",
"Firy ny frais amin'ny opération?","Misy frais Cash Point ve?",
"Aiza ny frais agent?","Afaka manao calcul frais ve?",
"Misy service fee ve?","Inona no atao hoe frais agent?",
"Ahoana ny fijerena tarif?","Misy tableau frais ve?",
"Manamora calcul frais ve?","Afaka mahita frais ve?",
"Ahoana ny frais service?","Misy frais ao amin'ny application ve?"
],
a: [
"Eny tompoko. Misy fizarana **Frais Agent** ao amin'ny FAST CASHPOINT.",
"Ny application dia manampy amin'ny fandaminana ny frais de service Agent/Cash Point.",
"Raha mila mijery frais ianao dia midira ao amin'ny **Frais Agent**.",
"Ny frais dia tokony hojerena araka ny opération sy ny tarif ampiharina.",
"FAST CASHPOINT dia manampy anao hahazo fijery mazava kokoa momba ny frais."
]
},

benefice: {
q: [
"Ahoana ny bénéfice?","Afaka manao calcul bénéfice ve?","Misy tombony net ve?",
"Ahoana no hahafantarako ny gain?","Misy profit ve?","Ahoana ny bénéfice net?",
"Afaka manao calcul gain ve?","Inona ny tombony amin'ny opération?",
"Misy bénéfice ao amin'ny application?","Ahoana ny kajy tombony?",
"Firy ny bénéfice?","Aiza ny bénéfice?",
"Afaka kajiana ve ny tombony?","Misy calcul profit ve?",
"Ahoana no hahitako ny gain?","Manamora calcul bénéfice ve?",
"Afaka mahafantatra tombony ve?","Inona ny bénéfice net?",
"Misy fonction bénéfice ve?","Ahoana ny kajy gain?"
],
a: [
"Eny tompoko. Misy fizarana **Bénéfice** hanampiana anao amin'ny kajy tombony.",
"Ny bénéfice dia miankina amin'ny montant sy ny frais ampiharina.",
"Ohatra, amin'ny formule ampiasaina amin'ny application, opération 20 000 Ar dia afaka mitondra bénéfice net 750 Ar.",
"FAST CASHPOINT dia natao hanampy anao hahita mazava kokoa ny tombony azo amin'ny opérations.",
"Raha mila kajy bénéfice ianao dia jereo ny fizarana **Bénéfice**."
]
},

installation: {
q: [
"Ahoana ny installation?","Ahoana no hametrahana azy?","Ahoana ny télécharger?",
"Aiza no maka APK?","Ahoana ny fametrahana FAST CASHPOINT?",
"Afaka apetraka amin'ny Android ve?","Mila APK ve?",
"Ahoana no hanombohana mampiasa azy?","Ahoana ny téléchargement?",
"Mety amin'ny téléphone Android ve?","Aiza no installation?",
"Afaka mametraka application ve?","Ahoana no hisintonana azy?",
"Ahoana no hametrahana APK?","Mety amin'ny Android ve?",
"Ahoana no hanombohana?","Aiza no ahazoana FAST CASHPOINT?",
"Mila misintona APK ve?","Afaka manampy installation ve?",
"Te hametraka FAST CASHPOINT aho, ahoana?"
],
a: [
"FAST CASHPOINT dia application natao ho an'ny Android. Rehefa manana APK ianao dia afaka mametraka azy amin'ny téléphone mifanaraka.",
"Raha efa manana APK ianao dia sokafy ilay fichier ary araho ny dingana installation.",
"Raha mila fanampiana amin'ny installation ianao dia afaka milaza amiko izay olana miseho.",
"Ny installation dia miankina amin'ny Android sy ny APK ampiasainao. Afaka manampy anao tsikelikely aho.",
"Eny, natao hampiasaina amin'ny Android ny application."
]
},

security: {
q: [
"Azo antoka ve ny application?","Manao ahoana ny sécurité?","Mila autorisation ve?",
"Ahoana ny permission?","Mandeha amin'ny données ve?","Azo itokisana ve?",
"Misy sécurité ve?","Mila accès contact ve?","Mila permission SMS ve?",
"Ahoana ny confidentialité?","Mila autorisation inona?","Azo antoka ve ny données?",
"Misy protection ve?","Ahoana ny fiarovana?","Mila permission ve?",
"Manangona données ve?","Ahoana ny privacy?","Mila contact permission ve?",
"Mila SMS permission ve?","Ahoana ny sécurité amin'ny application?"
],
a: [
"Ny autorisations ilaina dia miankina amin'ireo fonctionnalités ampiasain'ny application.",
"Tsara foana ny manamarina ny permissions alohan'ny hanomezana autorisation.",
"Raha misy permission tsy azonao dia lazao amiko ilay permission miseho dia hazavaiko aminao.",
"Ny tanjona dia ny hampiasa permissions mifanaraka amin'ireo fonctionnalités tena ilaina.",
"Raha misy olana momba ny sécurité na permission dia afaka manampy anao aho."
]
},

target: {
q: [
"Ho an'iza ity application ity?","Agent cash point ve no mampiasa azy?",
"Mety amin'ny vendeur ve?","Iza no tokony hampiasa FAST CASHPOINT?",
"Mety amin'ny professionnel ve?","Ho an'ny agent ihany ve?",
"Afaka mampiasa azy ve ny cash point?","Mety amin'ny mpivarotra ve?",
"Iza no tena ilainy?","Application ho an'ny agent ve?",
"Agent Cash Point ve no cible?","Mety amin'ny professionnel Cash Point ve?",
"Iza no natao hampiasa azy?","Mety amiko ve raha agent aho?",
"Ho an'ny vendeur Cash Point ve?","Application professionnelle ve?",
"Agent mobile money ve no mampiasa azy?","Mety amin'ny cash point ve?",
"Iza no tena kendrena?","Mety amin'ny mpandraharaha ve?"
],
a: [
"FAST CASHPOINT dia natao indrindra ho an'ny **Agent Cash Point**.",
"Raha Agent Cash Point ianao dia natao hanampy anao amin'ny asa andavanandro ity application ity.",
"Ny application dia mifantoka amin'ny filan'ny professionnel manao opérations Cash Point.",
"Eny tompoko, Agent Cash Point no tena kendrena amin'ny FAST CASHPOINT.",
"Izy io dia natao hanamora ireo opérations mahazatra ataon'ny Agent Cash Point."
]
},

sales: {
q: [
"Te hividy aho","Ahoana raha te hividy?","Aiza no commande?",
"Te haka application aho","Ahoana ny fividianana?","Afaka mividy izao ve?",
"Ahoana no hahazoako azy?","Te hampiasa FAST CASHPOINT aho",
"Aiza no hividianana azy?","Afaka manao commande ve?",
"Vonona hividy aho","Te hahazo ilay application aho",
"Ahoana ny commande?","Mila FAST CASHPOINT aho",
"Aiza no hanaovana achat?","Afaka mividy ve aho?",
"Te hanao commande aho","Ahoana no hahazoana APK?",
"Te hividy application aho","Inona no dingana hividianana?"
],
a: [
"Faly izahay tompoko 😊 Ny vidin'ny FAST CASHPOINT dia **20 000 Ar**.",
"Eny tompoko. Raha vonona hividy ianao dia afaka manohy amin'ny dingana commande.",
"20 000 Ar ny vidiny. Raha te haka azy ianao dia afaka manomboka amin'ny commande.",
"Tsara tompoko 😊 Raha vonona ianao dia afaka manohy amin'ny fividianana FAST CASHPOINT.",
"Raha te hividy ianao dia lazao fotsiny fa homeko anao ny dingana manaraka."
]
},

help: {
q: [
"Afaka manampy ahy ve?","Mila fanampiana aho","Ahoana no fampiasana azy?",
"Tsy haiko ny mampiasa azy","Ampio aho azafady","Mila aide aho",
"Afaka manazava ve?","Ahoana no hanombohana?","Misy guide ve?",
"Azonao ampianarina ve aho?","Mba ampio aho","Tsy haiko izay hatao",
"Ahoana no fampiasana FAST CASHPOINT?","Mila fanazavana aho",
"Afaka mampianatra ahy ve?","Misy tutorial ve?",
"Ahoana no hanombohana mampiasa?","Ampianaro aho azafady",
"Mila guide FAST CASHPOINT aho","Ahoana no fiasan'ilay application?"
],
a: [
"Mazava tompoko 😊 Afaka manampy anao tsikelikely aho.",
"Lazao fotsiny raha Transfert, Dépôt, Crédit, Offres, Solde, Historique na Bénéfice no tianao ho fantatra.",
"Aza manahy 😊 Hazavaiko aminao tsikelikely izay tsy mazava.",
"Vonona hanampy anao aho. Lazao fotsiny izay olana na fanontaniana anananao.",
"Afaka manazava ny fampiasana FAST CASHPOINT aho. Lazao izay fonction tianao hianarana."
]
},

unknown: {
q: [
"Tsy azoko","Mba hazavao","Inona izany?","Azafady mba manazava",
"Mbola tsy azoko","Inona no atao?","Ahoana izany?","Mba ampio aho",
"Mila fanazavana","Tsy haiko","Hazavao azafady","Mba avereno",
"Inona no tianao lazaina?","Tsy mazava amiko","Mbola manjavozavo",
"Afaka hazavaina ve?","Mila fanazavana bebe kokoa","Ahoana indray?",
"Tsy azoko tsara","Mba lazao amin'ny fomba tsotra"
],
a: [
"Mazava tompoko 😊 Mba lazao hoe prix, installation, transfert, dépôt, crédit, offres, solde, historique na bénéfice no tianao ho fantatra.",
"Afaka manampy anao aho. Lazao fotsiny ilay zavatra tadiavinao momba ny FAST CASHPOINT.",
"Mba omeo fanazavana kely kokoa ilay fanontaniana dia ho mora kokoa amiko ny manampy anao.",
"Tsy maninona tompoko 😊 Avereno amin'ny teny tsotra ilay fanontaniana dia andramako valiana.",
"Lazao amiko fotsiny izay tianao ho fantatra dia hiezaka hanome valiny mazava aho."
]
}
};

const training = [];
let id = 1;

for (const [intent, group] of Object.entries(data)) {
  for (let i = 0; i < group.q.length; i++) {
    training.push({
      id: id++,
      intent,
      question: group.q[i],
      answer: group.a[i % group.a.length],
      language: "mg-fr",
      active: true
    });
  }
}

/*
  Ampiana fanontaniana natural amin'ny alalan'ny
  combinaison samihafa, fa tsy duplicate exact.
*/
const prefixes = [
  "Azafady,",
  "Mba lazao ahy:",
  "Tompoko,",
  "Mba tiako ho fantatra:",
  "Azafady tompoko,",
  "Mba fanontaniana kely:",
  "Tena tiako ho fantatra:",
  "Mba afaka manazava ve:",
  "Ho an'ny fanazavana:",
  "Mba hanontany aho:"
];

const suffixes = [
  "azafady",
  "tompoko",
  "mba hazavao",
  "mba lazao",
  "ahoana?",
  "mba valio",
  "azafady tompoko",
  "ahoana izany?",
  "mba ampio aho",
  "mba omeo fanazavana"
];

const originals = [...training];

for (const item of originals) {
  if (training.length >= 1000) break;

  const p = prefixes[item.id % prefixes.length];
  const s = suffixes[item.id % suffixes.length];

  const variants = [
    `${p} ${item.question.replace(/\?$/, "")} ${s}`,
    `${p} ${item.question.replace(/\?$/, "")} ve?`,
    `${item.question.replace(/\?$/, "")}, ${s}?`
  ];

  for (const q of variants) {
    if (training.length >= 1000) break;

    if (!training.some(x => x.question.toLowerCase() === q.toLowerCase())) {
      training.push({
        id: id++,
        intent: item.intent,
        question: q,
        answer: item.answer,
        language: "mg-fr",
        active: true
      });
    }
  }
}

fs.writeFileSync(out, JSON.stringify(training.slice(0, 1000), null, 2));

console.log("======================================");
console.log("🤖 FAST CASHPOINT TRAINING V2");
console.log("======================================");
console.log("Questions :", training.slice(0,1000).length);
console.log("Questions uniques :", new Set(training.slice(0,1000).map(x => x.question)).size);
console.log("Réponses :", training.slice(0,1000).length);
console.log("======================================");
