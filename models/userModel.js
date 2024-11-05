const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    create: (username, email, password, role = 'usuario', callback) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return callback(err);
            db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, hash, role], callback);
        });
    },

    findByUsername: (username, callback) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], callback);
    },

    // Nueva función para obtener todos los usuarios, solo para bibliotecarios
    findAll: (callback) => {
        db.query('SELECT username, email, role FROM users', callback);
    }
};

module.exports = User;
