const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();

// Ruta que crea un usuario
router.post('/auth/register')

// Ruta que hace login
router.get('/auth/login')

// Ruta que hace logout
router.get('/auth/logout')


module.exports = router;