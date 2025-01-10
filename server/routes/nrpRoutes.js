const require = require('express');
const router = require('express').Router();
const { createNrp, getAllNrps } = require('../controller/nrpController');

router.post('/create-nrp', createNrp);
router.get('/all-nrps', getAllNrps);

module.exports = router;
