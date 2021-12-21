import PlateaService from './services/PlateaService';
const plateaService = new PlateaService();


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

    const container = document.querySelector('.col-md-5');
    const bookForm = document.querySelector('#book-form');
    container.insertBefore(div, bookForm);

    setTimeout(() => {
      document.querySelector('.message').remove();
    }, secToRemove);
  }

  async deletePlatea(platea) {
    await plateaService.deletePlatea(platea);
  }

}

export default UI;
