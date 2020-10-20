const express = require('express');

const { indexGroup, createGroup, deleteGroup }= require('./controllers/GroupController');
const PresentationController = require('./controllers/PresentationController');

const connection = require('./database/connection');

const routes = express.Router();

routes.get('/groups', indexGroup);
routes.post('/groups', createGroup);
routes.delete('/groups/:id', deleteGroup);

routes.get('/presentations', PresentationController.index);
routes.post('/presentations', PresentationController.create);
routes.delete('/presentations/:id', PresentationController.delete);

module.exports =  routes;