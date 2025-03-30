// // Fonction de popup à l'ouverure de la page
// window.addEventListener('DOMContentLoaded', function() {
//   var popup = document.getElementById('popup');
//   var closeButton = popup.querySelector('.close');

//   function hidePopup() {
//     popup.style.opacity = '0';
//     setTimeout(function() {
//       popup.style.display = 'none';
//     }, 500); // Durée de transition définie dans la propriété "transition" en CSS (0.5s)
//   }

//   popup.style.display = 'block';
//   closeButton.addEventListener('click', hidePopup);
//   setTimeout(hidePopup, 8000);
// });

// Enregistrer les éléments de la légende dans une variable
const legendItemsVTT = document.querySelectorAll('#legendCircuitsVTT div');

let items = [];
for (let i of legendItemsVTT) {
  items.push(i);
}

// Ajouter un événement de clic à chaque élément de la légende
legendItemsVTT.forEach(function(item, index) {
  item.addEventListener('click', function() {    
    switch(index) {
      case 0:
        tabStatesCircuits.stateCircuit20[0] = !tabStatesCircuits.stateCircuit20[0];
        setOnlyOneTrace('circuit20', tabStatesCircuits.stateCircuit20[0], item);
        break;
      case 1:
        tabStatesCircuits.stateCircuit28[0] = !tabStatesCircuits.stateCircuit28[0];
        setOnlyOneTrace('circuit28', tabStatesCircuits.stateCircuit28[0], item);
        break;
      case 2:
        tabStatesCircuits.stateCircuit36[0] = !tabStatesCircuits.stateCircuit36[0];
        setOnlyOneTrace('circuit36', tabStatesCircuits.stateCircuit36[0], item);
        break;
      case 3:
        tabStatesCircuits.stateCircuit41[0] = !tabStatesCircuits.stateCircuit41[0];
        setOnlyOneTrace('circuit41', tabStatesCircuits.stateCircuit41[0], item);
        break;
      case 4:
        tabStatesCircuits.stateCircuit48[0] = !tabStatesCircuits.stateCircuit48[0];
        setOnlyOneTrace('circuit48', tabStatesCircuits.stateCircuit48[0], item);
        break; 
      default:
        return;
    }
  });
});

// Si le type est all

if (type === "all") {
  const legendItemsMarche = document.querySelectorAll('#legendCircuitsMarche div');

  for (let i of legendItemsMarche) {
    items.push(i);
  }

  // Ajouter un événement de clic à chaque élément de la légende
  legendItemsMarche.forEach(function(item, index) {
    item.addEventListener('click', function() {    
      switch(index) {
        case 0:
          tabStatesCircuits.stateCircuit8[0] = !tabStatesCircuits.stateCircuit8[0];
          setOnlyOneTrace('circuit8', tabStatesCircuits.stateCircuit8[0], item);
          break;
        case 1:
          tabStatesCircuits.stateCircuit13[0] = !tabStatesCircuits.stateCircuit13[0];
          setOnlyOneTrace('circuit13', tabStatesCircuits.stateCircuit13[0], item);
          break;
        case 2:
          tabStatesCircuits.stateCircuit17[0] = !tabStatesCircuits.stateCircuit17[0];
          setOnlyOneTrace('circuit17', tabStatesCircuits.stateCircuit17[0], item);
          break;
        default:
          return;
      }
    });
  });
}

// Voir si on a coché la case "Circuits Cliquables"
// let checkboxCircCliq = document.getElementById("cirqCliq");
// checkboxCircCliq.checked = false;
boolCircleCliq = false;