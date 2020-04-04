const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const NGOController = require('./controller/NGOController');
const EventController = require('./controller/EventController');
const ProfileController = require('./controller/ProfileController');
const SessionController = require('./controller/SessionController');

const connection = require('./database/connection');

const routes = express.Router();

routes.get('/ngos', NGOController.index);
routes.get(
  '/events',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  EventController.index
);

routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ProfileController.index
);

routes.post('/sessions', SessionController.create);
routes.post(
  '/ngos',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required().min(10),
      city: Joi.string().required().min(3),
      state: Joi.string().required().length(2),
    }),
  }),
  NGOController.create
);
routes.post('/event', EventController.create);

routes.delete(
  '/event/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  EventController.delete
);

module.exports = routes;
