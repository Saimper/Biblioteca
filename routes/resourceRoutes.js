    const express = require('express');
    const router = express.Router();
    const multer = require('multer');
    const resourceController = require('../controllers/resourceController');

    // Configuración de multer para la subida de imágenes
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/uploads/');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });
    const upload = multer({ storage: storage });

    // Middleware para manejo de errores de Multer
    function handleMulterError(err, req, res, next) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: err.message });
        } else if (err) {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        next();
    }

    


    // Rutas
    router.get('/', resourceController.getAllResources);
    router.get('/new', resourceController.showCreateForm);
    router.post('/create', upload.single('image_path'), handleMulterError, resourceController.createResource);
    router.get('/:id', resourceController.getResource);
    router.get('/:id/edit', resourceController.showEditForm);
    router.post('/:id/update', upload.single('image_path'), resourceController.updateResource);
    router.post('/:id/delete', resourceController.deleteResource);

    module.exports = router;
