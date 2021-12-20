import PlateaService from './services/PlateaService';
const plateaService = new PlateaService();


class UI {

  async renderPlateas() {
    const plateas = await plateaService.getPlateas();
    console.log(plateas);
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

  renderMsg() {}

  deletePlatea() {}

}

export default UI;
