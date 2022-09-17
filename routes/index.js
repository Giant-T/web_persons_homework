const express = require('express');
const mongoose = require('mongoose');
const Persons = require('../models/person');
require('dotenv').config();
const router = express.Router();

router.get('/', async (req, res, next) => {
  await mongoose.connect(process.env.MONGODB_URI);
  try {
    const persons = await Persons.find().exec();
    res.json(persons);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Une erreur est survenue...' });
  } finally {
    mongoose.connection.close();
  }
});

router.get('/:id', async (req, res, next) => {
  await mongoose.connect(process.env.MONGODB_URI);
  try {
    const id = new mongoose.Types.ObjectId(String(req.params.id));
    const person = await Persons.findById(id);
    res.json(person);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Une erreur est survenue...' });
  } finally {
    mongoose.connection.close();
  }
});

router.post('/', async (req, res, next) => {
  await mongoose.connect(process.env.MONGODB_URI);
  try {
    const person = new Persons(req.body);
    await person.save();
  } catch (e) {

  } finally {
    mongoose.connection.close();
  }
});

module.exports = router;
