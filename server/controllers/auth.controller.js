const passport = require('passport');
const authModel = require('../models/auth.model');
const functions = require('../utils/functions/functions');

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

            return res.json(200, {
                status: 1,
                message: "Registro Existoso"
            });
        }
    )(req, res, next)
}

authController.getUsuario = async(req, res) => {

    const usuario = await authModel.findById(req.params.idUser);

    let pass = functions.formatearPass(usuario.password);

    res.json({
        tipoId: usuario.tipoId,
        nid: usuario.nid,
        nombres: usuario.nombres + ' ' + usuario.apellidos,
        nacimiento: usuario.nacimiento,
        telefono: usuario.telefono,
        direccion: usuario.direccion,
        email: usuario.email,
        pass
    })
}

authController.login = async(req, res, next) => {
    console.log(req.body)
    passport.authenticate(
        'local-login',
        (err, user, info) => {
            if (err) { return next(err) }
            if (!user) {
                return res.status(400).json({
                    status: 0,
                    error: "FALLO AL AUTENTICAR",
                    message: req.flash()
                })
            }
            return res.status(200).json({
                user_id: user._id,
                token: user._id,
            });
        }
    )(req, res, next)
}

authController.logout = async(req, res, next) => {
    req.session.destroy();
    req.logout();
    res.json({
        status: 1,
        message: "Sesión cerrada"
    })
}

module.exports = authController;