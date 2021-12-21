import './styles/app.css';
import UI from './UI'

const map = document.querySelector('.mapa');
const seatsMap = document.querySelector('.asientos-mapa');
const seats = document.querySelectorAll('.fila .asiento:not(.deshabilitado)');
const date = document.getElementById('fecha');
const count = document.getElementById('count');
const total = document.getElementById('total');


// Info
// console.log(date.value);   // Fecha option
// console.log(date.options[date.selectedIndex].innerText);  Fecha Texto



// getSelected();


// Traer datos de BD
function getSelected() {
  const ui = new UI();
  const plateas = ui.renderPlateasFecha(date.value);
}


// Accion al cambiar día
date.addEventListener('change', (e) => {
  const ui = new UI();
  ui.clearPlateas();
  getSelected()
})


document.addEventListener('DOMContentLoaded', e => {
  getSelected();
});


// Selección de asientos
seatsMap.addEventListener('click', (e) => {
  if (e.target.classList.contains('asiento') && !e.target.classList.contains('deshabilitado')) {

    if (e.target.classList.contains('reservado')) {
      e.target.classList.toggle('reservado')
      e.target.classList.toggle('ocupado')

      const formData =  {
        'platea': e.target.id,
        'dia': date.value,
        'comprado': 'true',
        'reservado': 'false'
      }

      const ui = new UI();
      ui.updatePlatea(formData);
      ui.renderMsg('Platea ocupada', 'danger', 3000);

    } else if (e.target.classList.contains('ocupado')) {
      e.target.classList.toggle('ocupado')

      const formData =  {
        'platea': e.target.id,
        'dia': date.value,
      }

      const ui = new UI();
      ui.deletePlatea(formData);
      ui.renderMsg('Platea desocupada', 'success', 3000);

    } else {
      e.target.classList.toggle('reservado')

      const formData =  {
        'platea': e.target.id,
        'dia': date.value,
        'comprado': 'false',
        'reservado': 'true'
      }

      const ui = new UI();
      ui.addNewPlatea(formData);
      ui.renderMsg('Platea reservada', 'warning', 3000);
    }
  }
})


// Selección en minimapa
map.addEventListener('click', (e) => {
  const columnaIzq = document.getElementById("col-izq")
  const columnaDer = document.getElementById("col-der")

  if (e.target.classList.contains('area_inp')) {
    if (e.target.value == 'izq') {
      columnaIzq.style.display = "block";
      columnaDer.style.display = "none";
    }
    else if (e.target.value == 'der') {
      columnaDer.style.display = "block";
      columnaIzq.style.display = "none";
    }
  }
  else {
    columnaDer.style.display = "none";
    columnaIzq.style.display = "none";
  }
})
