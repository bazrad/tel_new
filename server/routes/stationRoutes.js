const express = require('express');
const router = express.Router();
const { getStations, createStation, updateStation, deleteStation } = require('../controller/stationController');

// Клиент засварлах
router.put('/:id', updateStation);

// Клиент устгах
router.delete('/:id', deleteStation);

// Клиент үүсгэх
router.post('/', createStation);

// Бүх клиентүүдийг авах
router.get('/', getStations);


module.exports = router;