const passport = require('passport');
const authModel = require('../models/auth.model');

// Creamos la constante para exportar las funciones o métodos
const authController = {};


// Método para crear un usuario
authController.crearUsuario = async(req, res) => {

    // Guardamos el nuevo modelo de usuario
    const usuario = await new authModel(req.body);

    // Guardamos este usuario en la Database
    // usuario.save();

    // Eviamos como respuesta un status
    res.json({
        id: req.body.id,
        status: "Usuario Registrado"
    })
}

authController.registro = async(req, res, next) => {
    passport.authenticate(
        'local-registro',
        (err, user, info) => {
            if (err) { return next(err) }
            if (!user) {
                return res.status(200).json({
                    status: 0,
                    message: req.flash()
                })
            }
            return res.json(200, { user_id: user._id });
        }
    )(req, res, next)
}

authController.login = async(req, res, next) => {
    passport.authenticate(
        'local-login',
        (err, user, info) => {
            if (err) { return next(err) }
            if (!user) {
                return res.status(200).json({
                    status: 0,
                    message: req.flash()
                })
            }
            req.session.userid = user._id;
            return res.status(200).json({
                user_id: user._id,
                token: req.session.userid,
            });
        }
    )(req, res, next)
}

authController.logout = async(req, res, next) => {
    req.session.destroy();
    req.session.userid = null;
    req.logout();
    res.json({
        status: 1,
        message: "Sesión cerrada"
    })
}

module.exports = authController;