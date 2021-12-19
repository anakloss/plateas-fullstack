class PlateaService {
  constructor() {
    this.URI = 'http://localhost:3000/api/plateas';
  }

  async getPlateas() {
    const res = await fetch(this.URI);
    const plateas = await res.json();
    return plateas;
  }

  async getPlateasFecha(fecha) {
    const res = await fetch(`${this.URI}/${fecha}`);
    const plateas = await res.json();
    return plateas;
  }

  async postPlatea(platea) {
    const res = await fetch(this.URI, {
      method: 'POST',
      body: platea
    });
    const data = await res.json();
    console.log(data);
  }

  async deletePlatea(plateaId) {
    const res = await fetch(`${this.URI}/${plateaId}`, {
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
