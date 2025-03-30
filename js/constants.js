let typePo = 'vttSansPo'; // état initial : on affiche les circuits VTT sans portions

let checkboxTypeAll = document.getElementById("typeAllCliq").checked;
let type;
if (checkboxTypeAll) {
  type = 'all';
} else {
  type = 'vttSansPo';
}

let checkboxMapStyle = document.getElementById("mapStyleCliq").checked;

// Savoir quel est le type d'appareil (pc ou smartphone)
let smartphone = false; //par défaut, on considère que c'est un pc
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { //si c'est un smartphone
  smartphone = true;
}

// Zoom de départ en fonction du support
let zoomStart = 12.3; //zoom d'un pc pour voir tous les circuits
if (smartphone == true) {
  zoomStart = 10.8; //zoom d'un smartphone pour voir tous les circuits
}

/* --------------------------------- Circuits --------------------------------- */

// Liste des circuits VTT avec ces coordonnées
const listeCircuitsVtt = [
  { id: "circuit48", coords: coordsCircuitVtt48, colorOut: 'rgb(196, 94, 189)', colorSat: 'rgb(196, 94, 189)'},
  { id: "circuit41", coords: coordsCircuitVtt41, colorOut: 'rgb(255, 143, 0)', colorSat: 'rgb(255, 143, 0)'},
  { id: "circuit36", coords: coordsCircuitVtt36, colorOut: 'rgb(255, 228, 0)', colorSat: 'rgb(255, 228, 0)'},
  { id: "circuit28", coords: coordsCircuitVtt28, colorOut: 'rgb(0, 166, 147)', colorSat: 'rgb(49, 215, 107)'},
  { id: "circuit20", coords: coordsCircuitVtt20, colorOut: 'rgb(30, 196, 233)', colorSat: 'rgb(30, 196, 233)'}
];

const listeCircuitsMarche = [
  { id: "circuit17", coords: coordsCircuitMarche17, colorOut: 'rgb(0, 166, 147)', colorSat: 'rgb(98, 117, 230)'},
  { id: "circuit13", coords: coordsCircuitMarche13, colorOut: 'rgb(129, 97, 154)', colorSat: 'rgb(255, 0, 120)'},
  { id: "circuit8", coords: coordsCircuitMarche8, colorOut: 'rgb(236, 75, 75)', colorSat: 'rgb(235, 181, 150)'}
];

let tabStatesCircuits = {
  stateCircuit48: [false, listeCircuitsVtt[0].id],
  stateCircuit41: [false, listeCircuitsVtt[1].id],
  stateCircuit36: [false, listeCircuitsVtt[2].id],
  stateCircuit28: [false, listeCircuitsVtt[3].id],
  stateCircuit20: [false, listeCircuitsVtt[4].id],

  stateCircuit17: [false, listeCircuitsMarche[0].id],
  stateCircuit13: [false, listeCircuitsMarche[1].id],
  stateCircuit8: [false, listeCircuitsMarche[2].id]
};

const lineWidthsCircuit = {
  All_Out: 2.5,
  All_Sat: 3,
  NotAll_Out: 5,
  NotAll_Sat: 3 // NotAll_Sat: 3 pour screen sinon 4
};

const lineWidthsCircuitByZoom = {
  SmallZoom: 1,
  MediumZoom: 1,
  LargeZoom: 1
}

const offsetsCircuits = {
  All_Out: 0.00006,
  All_Sat: 0.00006,
  NotAll_Out: 0.00005,
  NotAll_Sat: 0.00005 // NotAll_Sat: 0.0002 pour screen sinon 0.00005
};

let lineOpacityCircuit = 1;
let lineOpacityBackCircuit = 0.15;
let offsetLineWithCircuit = 1.2;

if (checkboxMapStyle) {
  lineWidthCircuit = type == 'all' ? lineWidthsCircuit.All_Sat : lineWidthsCircuit.NotAll_Sat;
  offset = type == 'all' ? offsetsCircuits.All_Sat : offsetsCircuits.NotAll_Sat;
} else {
  lineWidthCircuit = type == 'all' ? lineWidthsCircuit.All_Out : lineWidthsCircuit.NotAll_Out;
  offset = type == 'all' ? offsetsCircuits.All_Out : offsetsCircuits.NotAll_Out;
}

// Décalage des traces
let signe = 1;
let j = 0;
for (let i = 0; i < listeCircuitsVtt.length; i++) {
  // Centré au milieu, la trace du milieu de tableau sera au milieu (coordonnées non décalées)
  // let currentOffset = (offset * i)-offset*(listeCircuitsVtt.length/2);

  // Le premier au milieu, les autres autour
  if ((i+1)%2 == 0) {
    j++;
  }
  signe = signe * -1;
  let currentOffset = (offset * j)*signe;
  
  for (let j = 0; j < listeCircuitsVtt[i].coords.length; j++) {
    listeCircuitsVtt[i].coords[j][0] += currentOffset;
    listeCircuitsVtt[i].coords[j][1] += currentOffset;
  }
}

// for (let i = 0; i < coordsCircuitMarche17.length; i++) {
//   listeCircuitsMarche[0].coords[i][0] += offset*1.5;
//   listeCircuitsMarche[0].coords[i][1] += offset*1.5;
// }
// for (let i = 0; i < coordsCircuitMarche13.length; i++) {
//   listeCircuitsMarche[1].coords[i][0] += offset*2;
//   listeCircuitsMarche[1].coords[i][1] += offset*2;
// }
// for (let i = 0; i < coordsCircuitMarche8.length; i++) {
//   listeCircuitsMarche[2].coords[i][0] += offset*2.5;
//   listeCircuitsMarche[2].coords[i][1] += offset*2.5;
// }


/* --------------------------------- Portions --------------------------------- */

let lineWitdhPortions = 15;
let lineWitdhPortionsPoly = 20;
let lineOpacityPortions = 0.6;

const colorsPortions = {
  Debrou_Out: "rgb(0, 174, 255)",
  Debrou_Sat: "rgb(0, 255, 255)",
  Souff_Out: "rgb(184, 21, 21)",
  Souff_Sat: "rgb(255, 0, 0)",
  PY_Out: "rgb(255, 255, 0)",
  PY_Sat: "rgb(255, 255, 0)",
  Tronco_Out: "rgb(88, 61, 21)",
  Tronco_Sat: "rgb(244, 214, 148)",
  Cotes: "rgb(0, 255, 162)"
};

lineOpacityPortions_Out = 0.6;
lineOpacityPortions_Sat = 0.8;

if (checkboxMapStyle) {
  colorTronco = colorsPortions.Tronco_Sat;
  lineOpacityPortions = lineOpacityPortions_Sat;
} else {
  colorTronco = colorsPortions.Tronco_Out;
  lineOpacityPortions = lineOpacityPortions_Out;
}

const descriptions = {
  "verger1": "Faire les côtés avec une débroussailleuse",
  "verger2": "Faire les côtés avec une débroussailleuse",
  "ravitoTrevillyHuella": "28 - 8<sup>e</sup> km<br>48 - 8<sup>e</sup> km",
  "ravitoVirageStGoazec": "37 - 12<sup>e</sup> km<br>41 - 11<sup>e</sup> km<br>48 - 17<sup>e</sup> km<br><br>37 - 14<sup>e</sup> km<br>41 - 16<sup>e</sup> km<br>48 - 22<sup>e</sup> km",
  "ravitoCudel": "20 - 10<sup>e</sup> km<br>28 - 16<sup>e</sup> km<br>37 - 26<sup>e</sup> km<br>41 - 30<sup>e</sup> km<br>48 - 36<sup>e</sup> km<br>",
};

const listePortions = [
  { id: "verger1", type: "cotes", coords: verger1, color: colorsPortions.cotes, descriptions: descriptions["verger1"] },
  { id: "verger2", type: "cotes", coords: verger2, color: colorsPortions.cotes, descriptions: descriptions["verger2"] }
];

let tabStatesPortions = [
  "verger1",false,
  "verger2",false,
  "stang1",false,
  "champLise",false,
  "cozic1",false,
  "kerbellec1",false,
  "kerbellec2",false,
  "kerbellec3",false,
  "saintGoazec1",false,
  "saintGoazec3",false,
  "halage1",false,
  "boisRuisseauCrann",false,
  "remonterVersPalae",false,
  "descenteKerdaffret",false,
  "parcALapin",false,
]

/* --------------------------------- Points --------------------------------- */

const circlesRadius = { 
  out: 10, 
  sat: 10
};

const colorsRavito = {
  out: "rgb(247, 34, 34)",
  sat: "rgb(247, 34, 34)"
}

if (checkboxMapStyle) {
  colorRavito = colorsRavito.sat;
  circleRadius = circlesRadius.sat;
} else {
  colorRavito = colorsRavito.out;
  circleRadius = circlesRadius.out;
}

/* --------------------------------- Flèches --------------------------------- */

const distanceBetweenFleches = 0.6;
const longueurFleche = 0.001;
const angleFleche = 145;
const lineWidthFleche = 3;

const listeChoosenFlechesVtt = [
  { id: listeCircuitsVtt[0].id, points: [90, 427, 835, 941, 1073, 1800, 2300, 2627, 3433] },
  { id: listeCircuitsVtt[1].id, points: [50, 124, 216, 1045, 1500, 1835, 2619] },
  { id: listeCircuitsVtt[2].id, points: [13, 52, 215, 800, 1437, 1865] },
  { id: listeCircuitsVtt[3].id, points: [59, 200, 400, 1095, 1422] },
  { id: listeCircuitsVtt[4].id, points: [12, 61, 151, 578] },
]

const listeChoosenFlechesMarche = [
  { id: listeCircuitsMarche[0].id, points: [25, 141, 251, 332] },
  { id: listeCircuitsMarche[1].id, points: [25, 67, 162, 230, 312] },
  { id: listeCircuitsMarche[2].id, points: [25, 138, 175] }
]