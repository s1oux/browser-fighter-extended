const { Router } = require('express');

const FightService = require('../services/fightService');
const { Fight } = require('../models/fight');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// OPTIONAL TODO: Implement route controller for fights

// @route GET /api/fights
// @desc Returns all fights in db
router.get('/', (req, res) => {
  const fights = FightService.getFights();
  if (fights) {
    res.json(fights);
  } else {
    res.json(404).json({
      error: true,
      message: 'Got error on fights load',
    });
  }
});

// @route GET /api/fights/:id
// @desc Returns specific fight by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const foundFight = FightService.getFightsForUser({ userId: id });
  if (foundFight) {
    res.json(foundFight);
  } else {
    res.status(404).json({
      error: true,
      message: 'No fight for such user',
    });
  }
});

// @route POST /api/fights
// @desc Creates fight
router.post('/', (req, res) => {
  const fight = new Fight(req.body);
  const result = FightService.create(fight);
  if (result) {
    res.json(result);
  } else {
    res.status(400).json({
      error: true,
      message: 'Got error on fight creation',
    });
  }
});

// @route DELETE /api/fights/:id
// @desc Removes fight by id
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const deletedFight = FightService.remove(id);
  if (deletedFight) {
    res.json(deletedFight);
  } else {
    res.status(404).json({
      error: true,
      message: 'No fight with such id',
    });
  }
});

module.exports = router;
