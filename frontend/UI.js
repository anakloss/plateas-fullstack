import PlateaService from './services/PlateaService';
const plateaService = new PlateaService();
import { format } from 'timeago.js'


class UI {

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
      tbody.innerHTML = '';
      plateas.forEach(platea => {
        const tr = window.document.createElement('tr');
        tr.innerHTML = `
          <td>${platea.dia}</td>
          <td>${platea.platea}</td>
          <td>${Date(platea.fecha_actividad)}</td>
          <td>${format(platea.created_at)}</td>
          <td>
            <button class="btn btn-danger">Ocupar</button>
            <button class="btn btn-success">Cancelar</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }
  }

  async addNewPlatea(platea) {
    await plateaService.postPlatea(platea);
  }

  async updatePlatea(platea) {
    await plateaService.postUpdatePlatea(platea);
  }

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

  async deletePlatea(platea) {
    await plateaService.deletePlatea(platea);
  }

}

export default UI;
