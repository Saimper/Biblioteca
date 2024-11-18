const User = require('../models/userModel');

exports.getAllUsers = (req, res) => {
    User.findAll((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error interno del servidor');
        }

        res.render('usuarios/user', { users: results });
    });
};
