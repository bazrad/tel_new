const express = require('express');
const router = express.Router();
const { createLocation, getsLocation } = require('../controller/locationController');


router.get('/', getsLocation)
router.post('/', createLocation)


module.exports = router; 