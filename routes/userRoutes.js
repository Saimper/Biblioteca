const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authorizeRole } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Ruta para listar usuarios, accesible solo para bibliotecarios
router.get('/list', authorizeRole(['bibliotecario']), authController.listUsers);

// Renderizar la vista user.ejs


router.get('/usuarios', authorizeRole(['bibliotecario']), userController.getAllUsers);


// Otras rutas relacionadas con usuarios
router.post('/create', authorizeRole(['bibliotecario']), authController.register);

module.exports = router;
