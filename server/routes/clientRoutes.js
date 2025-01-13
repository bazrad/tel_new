const express = require('express');
const router = express.Router();
const { createClient, getAllClients, updateClient, deleteClient } = require('../controller/clientController');

router.put('/:id', updateClient);
router.delete('/:id', deleteClient);
router.get('/', getAllClients).post('/', createClient);

//router.post('/:id/phone', addPhoneToClient);

module.exports = router; 