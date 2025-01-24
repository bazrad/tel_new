const express = require('express');
const router = express.Router();
const { getAllTariffs } = require('../controller/tariffController');

router.get('/', getAllTariffs);

module.exports = router; 