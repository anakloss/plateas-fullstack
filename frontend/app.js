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

// Traer datos de localStorage
function getSelected() {
  const ui = new UI();
  ui.renderPlateasFecha(date.value);
  // agregar para reservados
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


// Función para buscar información de asiento seleccionado
function getSeat() {}


// Selección de asientos
seatsMap.addEventListener('click', (e) => {
  if (e.target.classList.contains('asiento') && !e.target.classList.contains('deshabilitado')) {
    e.target.classList.toggle('ocupado')


    // if (e.target.classList.contains('reservado')) {
    //   e.target.classList.toggle('reservado')
    //   e.target.classList.toggle('ocupado')
    // } else if (e.target.classList.contains('ocupado')) {
    //   e.target.classList.toggle('ocupado')
    // } else {
    //   e.target.classList.toggle('reservado')
    // }
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
