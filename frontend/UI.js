import PlateaService from './services/PlateaService';
const plateaService = new PlateaService();
import { format } from 'timeago.js'


class UI {

  // render
  async renderPlateas() {
    await plateaService.getPlateas();
  }

  async renderPlateasFecha(dateSelected) {
    const plateas = await plateaService.getPlateasFecha(dateSelected);

    plateas['reservado'].forEach(platea => {
      const seat = document.getElementById(`${platea.platea}`);
      seat.classList.toggle('reservado');
    });

    plateas['comprado'].forEach(platea => {
      const seat = document.getElementById(`${platea.platea}`);
      seat.classList.toggle('ocupado');
    });

    countOc.innerText = plateas['comprado'].length
    countRe.innerText = plateas['reservado'].length
    total.innerText = document.querySelectorAll('.fila .asiento:not(.deshabilitado)').length
  }

  async renderPlateasReservadas() {
    const plateas = await plateaService.getPlateasReservadas();
    const tbody = window.document.getElementById('tbody');
    if (tbody) {
      const dias = {
        "dia1": "06/01/2022",
        "dia2": "07/01/2022",
        "dia3": "08/01/2022",
        "dia4": "09/01/2022",
        "dia5": "10/01/2022",
        "dia6": "11/01/2022",
        "dia7": "12/01/2022"
      }
      tbody.innerHTML = '';
      plateas.forEach(platea => {
        const tr = window.document.createElement('tr');
        tr.innerHTML = `
          <td>${dias[platea.dia]}</td>
          <td>${platea.platea}</td>
          <td>${platea.fecha_actividad}</td>
          <td>${format(platea.fecha_actividad)}</td>
          <td>
            <a href="#" class="btn btn-danger ocupar" _id="${platea._id}">Ocupar</a>
            <a href="#" class="btn btn-success desocupar" _id="${platea._id}">Desocupar</a>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }
  }

  renderMsg(message, colorMsg, secToRemove) {
    const div = document.createElement('div');
    div.className = `alert alert-${colorMsg}`;

    div.appendChild(document.createTextNode(message));

    const container = document.getElementById('info');
    const text = document.querySelector('#text');
    container.insertBefore(div, text);

    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, secToRemove);
  }

  renderMsgList(message, colorMsg, secToRemove) {
    const div = document.createElement('div');
    div.className = `alert alert-${colorMsg}`;

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.col-md-2');
    const card = document.querySelector('#msg');
    container.insertBefore(div, card);

    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, secToRemove);
  }

  // add
  async addNewPlatea(platea) {
    await plateaService.postPlatea(platea);
  }

  // update
  async updatePlateaId(plateaId) {
    await plateaService.postUpdatePlateaId(plateaId);
  }

  async updatePlatea(platea) {
    await plateaService.postUpdatePlatea(platea);
  }

  // reset
  clearPlateas() {
    const selectedSeats = document.querySelectorAll('.fila .asiento.ocupado');
    const selectedSeatsRes = document.querySelectorAll('.fila .asiento.reservado');

    selectedSeats.forEach((seat, i) => {
      seat.classList.toggle('ocupado')
    });

    selectedSeatsRes.forEach((seat, i) => {
      seat.classList.toggle('reservado')
    });
  }

  // delete
  async deletePlateaId(plateaId) {
    await plateaService.deletePlateaId(plateaId);
  }

  async deletePlatea(platea) {
    await plateaService.deletePlatea(platea);
  }

}

export default UI;
