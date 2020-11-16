const mongoose = require('mongoose');
const { Schema } = mongoose;


const productoSchema = new Schema({
    idUser: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    imagen: {
        type: String
    },
    nameImage: {
        type: String
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
})

// productoSchema.methods.subirImagen = function () {

// }


module.exports = mongoose.model('productos', productoSchema);