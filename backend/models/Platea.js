const { Schema, model } = require('mongoose');

const PlateaSchema = new Schema({
  platea: {
    type: String,
    required: true
  },
  dia: {
    type: String,
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
