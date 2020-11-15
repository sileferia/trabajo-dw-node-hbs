// Creamos la constante para exportar las funciones o métodos
const appController = {};

// Método para crear un usuario
appController.Home = async(req, res) => {

    res.render('index');
}

module.exports = appController;