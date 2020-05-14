const { Router } = require('express');

const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { Fighter } = require('../models/fighter');
const {
  createFighterValid,
  updateFighterValid,
} = require('../middlewares/fighter.validation.middleware');

const router = Router();

// All routes work
// TODO: think how to implement response middleware

// @route GET /api/fighters
// @desc Returns all fighters in db
router.get('/', (req, res) => {
  const fighters = FighterService.getFighters();
  if (fighters) {
    res.json(fighters);
  } else {
    res.json(400).json('have no fighters');
  }
});

// @route GET /api/fighters/:id
// @desc Returns specific fighter by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const foundFighter = FighterService.search({ id });
  if (foundFighter) {
    res.json(foundFighter);
  } else {
    res.status(404).json({ nofighter: 'No fighter with such id' });
  }
});

// @route POST /api/fighters
// @desc Creates fighter
router.post('/', createFighterValid, (req, res) => {
  const fighter = new Fighter(req.body);
  const result = FighterService.create(fighter);
  if (result) {
    res.json(result);
  } else {
    res.status(400).json('error has occured');
  }
});

// @route PUT /api/fighters/:id
// @desc Changes fighter details by id
router.put('/:id', updateFighterValid, (req, res) => {
  const id = req.params.id;
  const fighterInfo = req.body;
  const updatedFighter = FighterService.update(id, fighterInfo);
  if (updatedFighter) {
    res.json(updatedFighter);
  } else {
    res.status(404).json({ nofighter: 'No fighter with such id' });
  }
});

// @route DELETE /api/fighters/:id
// @desc Removes fighter by id
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const deletedFighter = FighterService.remove(id);
  if (deletedFighter) {
    res.json(deletedFighter);
  } else {
    res.status(404).json({ nofighter: 'No fighter with such id' });
  }
});

module.exports = router;
