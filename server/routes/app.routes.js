const express = require('express');
const passport = require('passport');
const AppRouter = express.Router();
const appController = require('../controllers/app.controller');
const authController = require('../controllers/auth.controller');

// Ruta inicial
AppRouter.get('/', appController.Home);

// Ruta
// AppRouter.get('/auth/register', (req, res) => {
//     res.json({
//         'error': 'Error'
//     })
// })

// Ruta que crea un usuario
AppRouter.post('/auth/register', authController.registro);

// Ruta que hace login
// AppRouter.get('/auth/login', authController.login);

AppRouter.post('/auth/login', authController.login);

// Ruta que hace logout
AppRouter.get('/auth/logout')

module.exports = AppRouter;