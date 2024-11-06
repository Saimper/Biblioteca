const db = require('../config/db');

// Mostrar todos los recursos
exports.getAllResources = (req, res) => {
    db.query('SELECT * FROM resources', (err, results) => {
        if (err) throw err;
        res.render('recursos/index', { recursos: results });
    });
};

// Mostrar formulario de creación
exports.showCreateForm = (req, res) => {
    res.render('recursos/create');
};

// Crear un recurso
exports.createResource = (req, res) => {
    // Imprimir los datos del cuerpo y el archivo para depuración
    console.log('Datos del cuerpo:', req.body);
    console.log('Archivo:', req.file);

    const { title, author, category, isbn, status } = req.body;
    const image_path = req.file ? req.file.filename : null;

    // Validación básica de los campos
    if (!title || !author || !category || !isbn || !image_path|| !status) {
        return res.status(400).send('Todos los campos son requeridos.');
    }

    // Inserción en la base de datos
    db.query(
        'INSERT INTO resources (title, author, category, isbn, image_path, status) VALUES (?, ?, ?, ?, ?, ?)',
        [title, author, category, isbn, image_path, status],
        (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).send('Hubo un error al crear el recurso.');
            }
            res.redirect('/recursos');
        }
    );
};



// Mostrar un recurso específico
exports.getResource = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM resources WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.render('recursos/show', { recurso: results[0] });
    });
};

// Mostrar formulario de edición
exports.showEditForm = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM resources WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.render('recursos/edit', { recurso: results[0] });
    });
};

// Actualizar un recurso
exports.updateResource = (req, res) => {
    const { id } = req.params;
    const { title, author, category, isbn, status } = req.body; // Cambiado a inglés
    const image_path = req.file ? req.file.filename : null; // Cambiado a inglés

    const query = image_path
        ? 'UPDATE resources SET title = ?, author = ?, category = ?, isbn = ?, image_path = ?,  status = ? WHERE id = ?' // Cambiado a inglés
        : 'UPDATE resources SET title = ?, author = ?, category = ?, isbn = ?,  status = ? WHERE id = ?'; // Cambiado a inglés
    const params = image_path
        ? [title, author, category, isbn, image_path, status, id] // Cambiado a inglés
        : [title, author, category, isbn, status, id]; // Cambiado a inglés

    db.query(query, params, (err) => {
        if (err) throw err;
        res.redirect('/recursos/' + id);
    });
};

// Eliminar un recurso
exports.deleteResource = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM resources WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.redirect('/recursos');
    });
};

// controllers/resourceController.js

// Función para reservar el recurso
exports.reservarRecurso = (req, res) => {
    const { id } = req.params; // Obtén el ID del recurso desde la URL
  
    // Verifica si el recursoId es válido
    if (!id) {
      return res.status(400).send("ID del recurso no proporcionado");
    }
  
    // Consulta SQL para actualizar el estado del recurso a 'reservado'
    const query = "UPDATE resources SET status = 'reservado' WHERE id = ?";
  
    db.query(query, [recursoId], (error, results) => {
      if (error) {
        console.error("Error al reservar el recurso:", error);
        return res.status(500).send("Error al reservar el recurso");
      }
  
      // Si la actualización fue exitosa, redirige a la lista de recursos
      if (results.affectedRows === 0) {
        return res.status(404).send("Recurso no encontrado");
      }
  
      // Redirige a la lista de recursos después de reservarlo
      res.redirect("/user/recursos");
    });
  };
  