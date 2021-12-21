const { Router } = require('express');
const router = Router();

const Platea = require('../models/Platea');

// get
router.get('/', async (req, res) => {
  const platea = await Platea.find();
  res.json(platea);
});

router.get('/fecha/:dia', async (req, res) => {
  const comprado = await Platea.find({dia: req.params.dia, comprado: true});
  const reservado = await Platea.find({dia: req.params.dia, reservado: true});
  platea = {'comprado': comprado, 'reservado': reservado}
  res.json(platea);
});

router.get('/platea/:platea', async (req, res) => {
  const platea = await Platea.find({platea: req.params.platea});
  res.json(platea);
});

router.get('/reservas', async (req, res) => {
  const platea = await Platea.find({reservado: true});
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

router.post('/edit/:dia/:platea', async (req, res) => {
  const query = { dia: req.params.dia, platea: req.params.platea };
  const platea = await Platea.findOneAndUpdate(query, req.body)
  res.json({msg: `Platea ${req.params.platea} - ${req.params.dia} actualizada`});
});


// delete
router.delete('/:id', async (req, res) => {
  const platea = await Platea.findByIdAndDelete(req.params.id);
  res.json({msg: 'Platea eliminada'});
});

router.delete('/:dia/:platea', async (req, res) => {
  const query = { dia: req.params.dia, platea: req.params.platea };
  const platea = await Platea.findOneAndDelete(query);
  res.json({msg: 'Platea eliminada'});
});


module.exports = router;
