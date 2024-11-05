// authController.js

const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Inicio de sesión
// authController.js
exports.login = (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos');
        if (results.length === 0) return res.status(401).send('Usuario no encontrado');

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
                // Guarda el ID del usuario y el rol en la sesión solo después de la autenticación
                req.session.userId = user.id;
                req.session.role = user.role;

                // Redirige según el rol
                if (user.role === 'usuario') {
                    return res.redirect('/menu/user'); // Redirigir a /menu/user
                } else {
                    return res.redirect('/menu'); // Redirigir a /menu para bibliotecarios
                }
            } else {
                return res.status(401).send('Contraseña incorrecta');
            }
        });
    });
};


// Registro de usuario
exports.register = (req, res) => {
    const { username, email, password, role } = req.body;
    const userRole = role || 'usuario'; // Rol predeterminado si no se proporciona

    User.create(username, email, password, userRole, (err) => {
        if (err) return res.status(500).send('Error al crear el usuario');
        res.redirect('/');
    });
};

// Cierre de sesión
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/');
    });
};
