// Fonctions
function addPoint(pointName, pointType, pointCoordinates, pointColor) {
  map.addSource(pointName, {
    'type': 'geojson',
    'data': {
      "type": "Feature",
      "properties": {
        "name": pointName
      },
      "geometry": {
        "coordinates": pointCoordinates,
        "type": "Point"
      }
    }
  });
  map.addLayer({
    'id': pointName,
    'type': 'circle',
    'source': pointName,
    'paint': {
      'circle-radius': circleRadius,
      'circle-color': pointColor
    }
  });

  if(pointType === "ravito") {
    pointHoverEnter(pointName);
    pointHoverLeave(pointName);
  }
}

function addRavitosVTT() {
  addPoint("ravitoTerrePleinBoisBernard", "ravito", ravitoTerrePleinBoisBernard, colorRavito);
  addPoint("ravitoBallTrap", "ravito", ravitoBallTrap, colorRavito);
  addPoint("ravitoTrevillyIzela", "ravito", ravitoTrevillyIzela, colorRavito);
}

function addRavitosMarche() {
  addPoint('ravitoValentin', 'ravito', ravitoValentin, colorRavito);
  addPoint('ravitoMarion', 'ravito', ravitoMarion, colorRavito);
}

function removeRavitosMarche() {
  map.removeLayer('ravitoValentin');
  map.removeSource('ravitoValentin');
  map.removeLayer('ravitoMarion');
  map.removeSource('ravitoMarion');
}