// menuController.js
exports.showMenu = (req, res) => {
    const user = {
        role: req.session.role
    };

    // Simulando una lista de recursos
    const recursos = [
        { title: 'Recurso 1', author: 'Autor 1', category: 'Categoría 1', isbn: '123456', image_path: 'recurso1.jpg' },
        { title: 'Recurso 2', author: 'Autor 2', category: 'Categoría 2', isbn: '789012', image_path: 'recurso2.jpg' },
        // Agrega más recursos aquí
    ];

    res.render('menu', {
        title: 'Menú Bibliotecario',
        items: ['Item 1', 'Item 2', 'Item 3'],
        user: user,
        recursos: recursos // Mantener el nombre como 'recursos'
    });
};


exports.showMenuUser = (req, res) => {
    // Simulando un objeto de usuario. Reemplaza esto con la lógica para obtener el usuario real.
    const user = {
        role: req.session.role // Obtén el rol del usuario desde la sesión
    };

    res.render('menuUser', {
        title: 'Menú Usuario',
        items: ['Item 1', 'Item 2', 'Item 3'],
        user: user // Asegúrate de pasar el objeto user
    });
};
