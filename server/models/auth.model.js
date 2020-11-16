const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const usuarioSchema = new Schema({
    rol: {
        type: String,
        required: true
    },
    nid: {
        type: String,
        required: true
    },
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String
    },
    nacimiento: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    telefono: {
        type: Number
    },
    direcciones: {
        type: Array
    }
})

usuarioSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

usuarioSchema.methods.validarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('usuarios', usuarioSchema);