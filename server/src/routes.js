const express = require('express');
const devController = require('./controllers/devController');
const dislikeController = require('./controllers/dislikeController');
const likeController = require('./controllers/likeController');

const routes = express.Router();

routes.post('/devs', devController.store);
routes.get('/devs', devController.index);
routes.post('/devs/:devId/likes', likeController.store);
routes.post('/devs/:devId/dislikes', dislikeController.store)

module.exports = routes;