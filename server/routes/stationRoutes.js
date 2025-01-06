const express = require('express');
const router = express.Router();
const { getStations, createStation } = require('../controller/stationController');

router.get('/', getStations).post('/', createStation);

module.exports = router; 