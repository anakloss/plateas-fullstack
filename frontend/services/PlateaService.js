class PlateaService {
  constructor() {
    this.URI = 'http://localhost:3000/api/plateas';
  }

  // gets
  async getPlateas() {
    const res = await fetch(this.URI);
    const plateas = await res.json();
    return plateas;
  }

  async getPlateasFecha(fecha) {
    const res = await fetch(`${this.URI}/fecha/${fecha}`);
    const plateas = await res.json();
    return plateas;
  }

  async getPlateasReservadas() {
    const res = await fetch(`${this.URI}/reservas`);
    const plateas = await res.json();
    return plateas;
  }

  // post
  async postPlatea(platea) {
    const res = await fetch(this.URI, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(platea)
    });
    const data = await res.json();
    console.log(data);
  }

  async postUpdatePlatea(platea) {
    const res = await fetch(`${this.URI}/edit/${platea.dia}/${platea.platea}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(platea)
    });
    const data = await res.json();
    console.log(data);
  }

  async postUpdatePlateaId(plateaId) {
    // Cambia estado reservado -> ocupado
    const res = await fetch(`${this.URI}/edit/${plateaId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        'comprado': 'true',
        'reservado': 'false'
      })
    });
    const data = await res.json();
    console.log(data);
  }

  // delete
  async deletePlateaId(plateaId) {
    const res = await fetch(`${this.URI}/${plateaId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    });
    const data = await res.json();
    console.log(data);
  }

  async deletePlatea(platea) {
    const res = await fetch(`${this.URI}/${platea.dia}/${platea.platea}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    });
    const data = await res.json();
    console.log(data);
  }

}


export default PlateaService;
