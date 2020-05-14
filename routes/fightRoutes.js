const { Router } = require('express');
const FightService = require('../services/fightService');

const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// OPTIONAL TODO: Implement route controller for fights

module.exports = router;
