const express = require('express');
const NGOController = require('./controller/NGOController');
const EventController = require('./controller/EventController');
const ProfileController = require('./controller/ProfileController');
const SessionController = require('./controller/SessionController');

const connection = require('./database/connection');

const routes = express.Router();

routes.post('/sessions', SessionController.create);
routes.get('/ngos', NGOController.index);
routes.get('/events', EventController.index);
routes.get('/profile', ProfileController.index);

routes.post('/ngos', NGOController.create);
routes.post('/event', EventController.create);

routes.delete('/event/:id', EventController.delete);

module.exports = routes;
