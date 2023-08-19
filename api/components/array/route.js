const express = require('express');
const arrayController = require('./controller');

const router = express.Router();

router.get('/', arrayController.getArrays);

router.post('/', arrayController.postArray);

router.get('/byId', arrayController.getArray);

module.exports = router;
