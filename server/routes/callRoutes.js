const express = require('express');
const router = express.Router();
const { getCalls, createCall, createCallBulk, deleteCall } = require('../controller/callController');

router.get('/', getCalls).post('/', createCall);
router.post('/bulk', createCallBulk);
router.delete('/:id', deleteCall);

module.exports = router;