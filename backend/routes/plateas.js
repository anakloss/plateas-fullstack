const { Router } = require('express');
const router = Router();

const Platea = require('../models/Platea');

// get
router.get('/', async (req, res) => {
  const platea = await Platea.find();
  res.json(platea);
});

router.get('/:dia', async (req, res) => {
  const comprado = await Platea.find({dia: req.params.dia, comprado: true});
  const reservado = await Platea.find({dia: req.params.dia, reservado: true});
  platea = {'comprado': comprado, 'reservado': reservado}
  res.json(platea);
});

router.get('/:platea', async (req, res) => {
  const platea = await Platea.find({platea: req.params.platea});
  res.json(platea);
});


// post
router.post('/', async (req, res) => {
  const { platea, dia, comprado, reservado } = req.body;
  const newPlatea = new Platea({ platea, dia, comprado, reservado});
  await newPlatea.save();
  res.json({msg: 'Platea guardada'});
});

router.post('/edit/:id', async (req, res) => {
  const platea = await Platea.findByIdAndUpdate(req.params.id, req.body);
  res.json({msg: 'Platea actualizada'});
});


// delete
router.delete('/:id', async (req, res) => {
  const platea = await Platea.findByIdAndDelete(req.params.id);
  res.json({msg: 'Platea eliminada'});
});


module.exports = router;
