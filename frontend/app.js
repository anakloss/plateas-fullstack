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

// document.addEventListener('DOMContentLoaded', e => {
//   const ui = new UI();
//   ui.renderPlateas();
// });


getSelected();


// Actualizar selección de asientos y totales
// function updateSelected() {
//   const selectedSeats = document.querySelectorAll('.fila .asiento.ocupado')
//   const selectedSeatsRes = document.querySelectorAll('.fila .asiento.reservado')
//
//   // // localStorage
//   // const seatsIndex = [...selectedSeats].map(function (seat) {
//   //   return [...seats].indexOf(seat)
//   // })
//   // const seatsResIndex = [...selectedSeatsRes].map(function (seat) {
//   //   return [...seats].indexOf(seat)
//   // })
//   //
//   // localStorage.setItem(date.value, JSON.stringify({
//   //   'ocupado': seatsIndex,
//   //   'reservado': seatsResIndex,
//   //   }))
//
//   // Cant de asientos seleccionados
//   count.innerText = selectedSeats.length
//   total.innerText = seats.length
// }


// Traer datos de BD
function getSelected() {
  const ui = new UI();
  ui.renderPlateasFecha(date.value);
}


// Accion al cambiar día
date.addEventListener('change', (e) => {
  // Reset asientos ocupados
  const ui = new UI();
  ui.clearPlateas();

  // Actualiza listado de asientos ocupados
  getSelected()
  // updateSelected()
})


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
      // ui.updatePlatea(formData);

    // } else if (e.target.classList.contains('ocupado')) {
    //   e.target.classList.toggle('ocupado')
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

    }
  }

  // updateSelected();
})
// updateSelected();


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
