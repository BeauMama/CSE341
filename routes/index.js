const routes = require('express').Router();

const baseController = require('../controllers/contacts');

routes.get('/', baseController.getName);

module.exports = routes;

