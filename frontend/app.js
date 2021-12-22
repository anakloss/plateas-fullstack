import './styles/bootstrap5.css';
import './styles/animate.css';
import './styles/app.css';
import UI from './UI'

const map = document.querySelector('.mapa');
const seatsMap = document.querySelector('.asientos-mapa');
const date = document.getElementById('fecha');
const tbodyList = document.getElementById('tbody');


// Info
// console.log(date.value);   // Fecha option
// console.log(date.options[date.selectedIndex].innerText);  Fecha Texto


// getSelected();

const ui = new UI();
ui.renderPlateasReservadas();


// Traer datos de BD
function getSelected() {
  const ui = new UI();
  if (date) {
    const plateas = ui.renderPlateasFecha(date.value);
  }
};


// Accion al cambiar día
if (date) {
  date.addEventListener('change', (e) => {
    const ui = new UI();
    ui.clearPlateas();
    getSelected()
  });
}

document.addEventListener('DOMContentLoaded', () => {
  getSelected();
});


// Selección de asientos
if (seatsMap) {
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
        ui.renderMsg(`Platea ${e.target.id} ocupada`, 'danger', 1000);

      } else if (e.target.classList.contains('ocupado')) {
        e.target.classList.toggle('ocupado')

        const formData =  {
          'platea': e.target.id,
          'dia': date.value,
        }

        const ui = new UI();
        ui.deletePlatea(formData);
        ui.renderMsg(`Platea ${e.target.id} desocupada`, 'success', 1000);

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
        ui.renderMsg(`Platea ${e.target.id} reservada`, 'warning', 1000);
      }
    }
  });
}


// Selección en minimapa
if (map) {
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
  });
}


// Acción de botones en listado
if (tbodyList) {
  tbodyList.addEventListener('click', e => {
    if (e.target.classList.contains('ocupar')) {
      const ui = new UI();
      ui.updatePlateaId(e.target.getAttribute('_id'));
      ui.renderMsgList('Platea ocupada', 'danger', 2000);
    } else if (e.target.classList.contains('desocupar')) {
      const ui = new UI();
      ui.deletePlateaId(e.target.getAttribute('_id'));
      ui.renderMsgList('Platea desocupada', 'success', 2000);
    }

    ui.renderPlateasReservadas();
    e.preventDefault();
  });
}
