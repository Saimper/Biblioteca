const db = require('../config/db');

exports.showMenu = (req, res) => {
    const user = {
        role: req.session.role  // Obtienes el rol del usuario desde la sesión
    };

    // Realizar la consulta a la base de datos para obtener los recursos
    db.query('SELECT * FROM resources', (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al obtener los recursos');
        }

        // Pasar los recursos a la vista
        res.render('menu', {
            title: 'Menú Bibliotecario',
            items: ['Item 1', 'Item 2', 'Item 3'],
            user: user,
            recursos: results  // Los resultados de la consulta
        });
    });
};

// controllers/resourceController.js

// controllers/resourceController.js

exports.showMenuUser = (req, res) => {
    // Asegúrate de que el objeto `user` esté en la sesión o de donde provenga
    const user = {
        role: req.session.role // Obtén el rol del usuario desde la sesión
    };

    // Consulta para obtener los recursos disponibles y reservados
    db.query("SELECT * FROM resources", (error, results) => {
        if (error) {
            console.error("Error al obtener recursos:", error);
            return res.status(500).send("Error al cargar recursos");
        }

        console.log("Resultados de la consulta:", results);

        // Filtra los recursos en disponibles y reservados
        const recursosDisponibles = results.filter(resource => resource.status === 'Disponible');
        const recursosReservados = results.filter(resource => resource.status === 'Reservado');

        // Pasa `user`, `recursosDisponibles`, y `recursosReservados` a la vista
        res.render("menuUser", { user, recursosDisponibles, recursosReservados });
    });
};


