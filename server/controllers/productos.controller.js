const { ObjectId, ObjectID } = require('mongodb');
const productosModel = require('../models/productos.model');
const fs = require('fs');

const productosController = {};


// Ruta para crear un producto
productosController.crearProducto = async(req, res) => {

    if (req.file) {
        req.body.imagen = req.file.path
    }

    // Creamos un nuevo producto
    const producto = await new productosModel(req.body)

    // Guardamos el producto
    producto.save()
        .then((response) => {
            res.json({
                status: 1,
                message: 'Producto agregado exitosamente con el id' + response._id,
                data: response
            })
        })
}

// Método para devolver un Producto
productosController.verProducto = async(req, res) => {

    const query = { "_id": ObjectID(req.params.idProducto) };


    const producto = await productosModel.find(query);

    if (producto) {
        res.json({
            status: 1,
            producto
        })
    } else {
        res.json({
            status: 0,
            message: "Producto no encontrado"
        })
    }
}

// Método para obtener todos los productos
productosController.getProductos = async(req, res) => {
    const productos = await productosModel.find();

    res.json(productos);

}

// Método para editar un producto
productosController.editarProducto = async(req, res) => {

    if (req.file) {
        req.body.imagen = req.file.path
    }

    const producto = {
        ...req.body
    }
    await productosModel.updateOne({ "_id": ObjectID(req.params.idProducto) }, { $set: producto });

    res.json({
        status: 1,
        message: "Producto con ID " + req.params.idProducto + " fué actualizado con éxito"
    })
}

// Método para eliminar un producto
productosController.eliminarProducto = async(req, res) => {

    const query = { "_id": ObjectID(req.params.idProducto) };

    const producto = await productosModel.findOne(query);

    await fs.unlink(producto.imagen, (err) => {
        console.log(err);
    });


    if (producto) {
        await productosModel.deleteOne(query)

        res.json({
            status: 1,
            message: "Producto Eliminado"
        })
    } else {
        res.json({
            status: 0,
            message: "Producto No encontrado"
        })
    }
}


module.exports = productosController;