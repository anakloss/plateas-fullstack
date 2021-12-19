const { Router } = require('express');
const router = Router();

const Platea = require('../models/Platea');

router.get('/', async (req, res) => {
  const platea = await Platea.find();
  res.json(platea);
});

router.get('/:dia', async (req, res) => {
  const platea = await Platea.find({dia: req.params.dia});
  res.json(platea);
});

router.post('/', async (req, res) => {
  const { id_platea, platea, dia, comprado, reservado } = req.body;
  const newPlatea = new Platea({id_platea, platea, dia, comprado, reservado});
  await newPlatea.save();
  res.json({msg: 'Platea guardada'});
});

router.delete('/:id', async (req, res) => {
  const platea = await Platea.findByIdAndDelete(req.params.id);
  res.json({msg: 'Platea eliminada'});
});

router.post('/edit/:id', async (req, res) => {
  const platea = await Platea.findByIdAndUpdate(req.params.id, req.body);
  res.json({msg: 'Platea actualizada'});
});

module.exports = router;
