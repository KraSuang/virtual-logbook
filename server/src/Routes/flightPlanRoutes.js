const express = require('express');
const authenticateToken = require('../middleware/authentication.js');
const { AddFlightPlanFromSimbrief, GetFlightPlan } = require('../api/user/FlightPlan.js');

const router = express.Router();

router.post('/add', authenticateToken, AddFlightPlanFromSimbrief);
router.get('/', authenticateToken, GetFlightPlan)

module.exports = router;
