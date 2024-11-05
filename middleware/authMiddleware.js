// middleware/authMiddleware.js

// Verifica si el usuario está autenticado
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }
    return res.status(401).send('No autenticado');
};

// Verifica si el usuario tiene un rol permitido
const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        if (req.session && allowedRoles.includes(req.session.role)) {
            return next();
        }
        return res.status(403).send('Acceso denegado');
    };
};

module.exports = { isAuthenticated, authorizeRole };

