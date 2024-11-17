// menuRoutes.js
const express = require('express');
const router = express.Router();
const { isAuthenticated, authorizeRole } = require('../middleware/authMiddleware');
const menuController = require('../controllers/menuController');


// Ruta para el menú del bibliotecario
router.get('/', isAuthenticated, authorizeRole(['bibliotecario']), menuController.showMenu);

// Ruta para el menú del usuario
router.get('/user', isAuthenticated, authorizeRole(['usuario']), menuController.showMenuUser);

router.get('/menuUser', isAuthenticated, authorizeRole(['usuario']), menuController.showMenuUser);


module.exports = router;
