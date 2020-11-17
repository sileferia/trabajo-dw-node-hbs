// Creamos la constante para exportar las funciones o métodos
const appController = {};

// Método para crear un usuario
appController.Home = async(req, res) => {

    res.render('index');
}

appController.About = async(req, res) => {

    res.render('about');
}

appController.Login = async(req, res) => {

    res.render('login');
}

appController.Register = async(req, res) => {

    res.render('register');
}


appController.Profile = async(req, res) => {

    res.render('profile');
}

appController.Productos = async(req, res) => {

    res.render('productos');
}

appController.productosUsuario = async(req, res) => {

    res.render('productosUser');
}

appController.Logout = async(req, res) => {

    res.render('index');
}



module.exports = appController;