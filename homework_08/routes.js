const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const handlers = require('./controllers/handlers.js');
router.use(bodyParser.json());

router.get('/rockstars', handlers.callbacks.getRockstars);
router.get('/rockstar/:id', handlers.callbacks.getRockstarById);
router.put('/rockstar/:id', handlers.callbacks.putRockstarById);
router.delete('/rockstar/:id', handlers.callbacks.deleteRockstar);
router.post('/rockstar', handlers.callbacks.postRockstar);

module.exports.routes = router;