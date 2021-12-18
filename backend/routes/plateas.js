const { Router } = require('express');
const router = Router();

const Platea = require('../models/Platea');

router.get('/', async (req, res) => {
  const platea = await Platea.find();
  res.json(platea);
});

router.post('/', async (req, res) => {
  const { platea, fecha, comprado, reservado } = req.body;
  const newPlatea = new Platea({platea, fecha, comprado, reservado});
  await newPlatea.save();
  res.json({msg: 'Platea guardada'});
});
module.exports = router;

router.delete('/:id', async (req, res) => {
  const platea = await Platea.findByIdAndDelete(req.params.id);
  res.json({msg: 'Platea eliminada'});
});
