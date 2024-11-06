const db = require('../config/db');

const Resource = {
    create: (title, author, category, isbn, imagePath, callback) => {
        db.query('INSERT INTO resources (title, author, category, isbn, image_path) VALUES (?, ?, ?, ?, ?)', 
            [title, author, category, isbn, imagePath], 
            callback);
    },

    findAll: (callback) => {
        db.query('SELECT * FROM resources', callback);
    },

    findById: (id, callback) => {
        db.query('SELECT * FROM resources WHERE id = ?', [id], callback);
    },

    update: (id, title, author, category, isbn, imagePath, callback) => {
        db.query('UPDATE resources SET title = ?, author = ?, category = ?, isbn = ?, image_path = ? WHERE id = ?', 
            [title, author, category, isbn, imagePath, id], 
            callback);
    },

    delete: (id, callback) => {
        db.query('DELETE FROM resources WHERE id = ?', [id], callback);
    }
};

module.exports = Resource;