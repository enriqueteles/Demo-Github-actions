const express = require('express');

const GroupController = require('./controllers/GroupController');
const PresentationController = require('./controllers/PresentationController');

const connection = require('./database/connection');

const routes = express.Router();

routes.get('/groups', GroupController.index);
routes.post('/groups', GroupController.create);
routes.delete('/groups/:id', GroupController.delete);

routes.get('/presentations', PresentationController.index);
routes.post('/presentations', PresentationController.create);
routes.delete('/presentations/:id', PresentationController.delete);

module.exports =  routes;