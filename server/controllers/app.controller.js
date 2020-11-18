const authModel = require("../models/auth.model");
const productosModel = require("../models/productos.model");
const functions = require("../utils/functions/functions");

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


appController.Perfil = async(req, res) => {

    res.render('profile');
}

appController.Productos = async(req, res) => {

    const productos = await productosModel.find();

    const html = functions.crearHtml(productos);

    res.render('productos', {
        html
    });

}

appController.productosUsuario = async(req, res) => {

    res.render('productosUser');
}

appController.Logout = async(req, res) => {

    res.render('index');
}

appController.Carrito = async(req, res) => {

    res.render('productos-carrito');
}



module.exports = appController;