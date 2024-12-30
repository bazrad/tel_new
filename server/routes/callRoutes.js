const express = require('express');
const router = express.Router();
const { getCalls, createCall, createCallBulk } = require('../controller/callController');

router.get('/', getCalls).post('/', createCall);
router.post('/bulk', createCallBulk);

module.exports = router; 