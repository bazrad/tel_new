const express = require('express');
const router = express.Router();
const { createClient, getAllClients } = require('../controller/clientController');

router.get('/', getAllClients).post('/', createClient);
//router.post('/:id/phone', addPhoneToClient);

module.exports = router; 