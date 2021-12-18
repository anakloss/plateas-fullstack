const { Schema, model } = require('mongoose');

const PlateaSchema = new Schema({
  platea: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  comprado: {
    type: Boolean,
    default: false
  },
  reservado: {
    type: Boolean,
    default: false
  },
  fecha_actividad: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('platea', PlateaSchema);
