let map;
changeMapStyle();

// Création de la map
function createMap(myMapStyle) {
  mapboxgl.accessToken = 'pk.eyJ1IjoieW9oYW5ubGMiLCJhIjoiY2xnczI4cHJ1MGF4dDNsb2NienBja3pxbCJ9.pmfEZTINyfbOowGB0I77QA';
  let map = new mapboxgl.Map({
    container: 'map',
    style: myMapStyle,
    center: [-3.7151733269314533,48.177434347124205],
    zoom: zoomStart,
  });

  // Ajouter les contrôles à la carte
  if (smartphone != true) {
    map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    map.addControl(new mapboxgl.ScaleControl());
  } else {
    // map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');
    // map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  }
  map.addControl(new mapboxgl.NavigationControl(), 'top-right');

  // Ajout des traces (circuits et portions)
  map.on('load', () => {
    if (type == "all") {
      addCircuitsMarche();
      addRavitosMarche();
    }
    addCircuitsVTT();
    addRavitosVTT();
    addFlechesCircuitsVTT();
    if (type == "all") {
      addFlechesCircuitsMarche();
    }
    // if (typePo == "vttAvecPo") {addPortions();}
  });

  return map;
}

// Fonction pour changer le style de la map
function changeMapStyle() {
  let checkboxMapStyle = document.getElementById("mapStyleCliq").checked;
  //Si la checkbox est cochée mapStyleCliq, on change la carte pour satellite, sinon on change pour classique
  if (checkboxMapStyle == true) {
    mapStyleUrl = "mapbox://styles/yohannlc/cm8hha9d9002301s89a41db9x";
    mapStyle = "satellite"
  } else {
    mapStyleUrl = "mapbox://styles/yohannlc/cm8hbqqxj003t01s57dlx3iya";
    mapStyle = "outdoor"
  }
  if (map != undefined) {
    map.remove();
  }
  map = createMap(mapStyleUrl);
  changeLegend();
  changeConstants();



  // Attente de changement de la valeur currentZoom = map.getZoom();
  map.on('zoomend', function() {
    var currentZoom = map.getZoom();
    console.log(currentZoom);
    changeSelonZoom(currentZoom);
  });

  // Lors d'un click n'importe où sur la carte
  map.on('click', function(e) {
    resetAllTraces();
  });
}

/*
  // Attente de changement de la valeur currentZoom = map.getZoom();
  map.on('zoomend', function() {
    var currentZoom = map.getZoom();
    console.log(currentZoom);
    // changer la lineWidth des portions en fonction du zoom
    if (currentZoom < 13) {
      changeLineWidthCircuit(lineWitdhCircuit);
    } else if (currentZoom >= 13 && currentZoom < 14  ) {
      changeLineWidthCircuit(lineWitdhCircuit * 0.8);
    } else {
      changeLineWidthCircuit(lineWitdhCircuit * 0.6);
    }
  });

  // Lors d'un click n'importe où sur la carte
  map.on('click', function(e) {
    console.log("Reset");
    resetAllTraces();
  });
*/