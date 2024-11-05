// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const isBibliotecario = require('../middleware/authMiddleware');

router.post('/create', isBibliotecario, authController.registerUser);
router.get('/list', isBibliotecario, authController.listUsers); // Asegúrate de tener una función para listar usuarios

module.exports = router;
