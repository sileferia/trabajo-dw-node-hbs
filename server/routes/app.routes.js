const express = require('express');
const path = require('path');
const AppRouter = express.Router();
const appController = require('../controllers/app.controller');
const authController = require('../controllers/auth.controller');
const productosController = require('../controllers/productos.controller');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images/productos'),
    filename: (req, file, cb) => {
        if (req.body.nameImage != '') {
            file.filename = req.body.nameImage;
        } else {
            req.body.nameImage = formatearNombreImagen(file.originalname);
        }

        cb(null, req.body.nameImage);
    }
})

const upload = multer({ storage, dest: path.join(__dirname, '/public/images') });

function formatearNombreImagen(originalname) {
    const nombre = originalname.slice(0, originalname.indexOf('.'))

    const filename = nombre.replace(' ', '-').toLowerCase();
    return filename + Date.now() + ".webp";
}

// RUTAS PARA LA NAVEGACIÓN
/* START */
// Ruta inicial
AppRouter.get('/', appController.Home);
AppRouter.get('/home', appController.Home);
AppRouter.get('/about', appController.About);
AppRouter.get('/login', appController.Login);
AppRouter.get('/register', appController.Register);
AppRouter.get('/logout', appController.Logout);
AppRouter.get('/productos', appController.Productos);
AppRouter.get('/carrito', appController.Carrito);






// RUTAS PARA LOS USUARIOS
/* START */
// Ruta que crea un usuario
AppRouter.post('/auth/register', authController.registro);

// Ruta que hace login
// AppRouter.get('/auth/login', authController.login);

AppRouter.post('/auth/login', authController.login);

// Ruta que hace logout
// AppRouter.get('/auth/logout', authController.logout)





// RUTAS PARA LOS PRODUCTOS
/* START */
// Método para obtener todos los productos
// AppRouter.get('/productos', productosController.getProductos);

// Metodo para crear un producto
AppRouter.post('/productos/new', upload.single('imagen'), productosController.crearProducto);

// Método para mostrar un producto
AppRouter.get('/productos/ver/:idProducto', productosController.verProducto);

// Método para editar producto
AppRouter.put('/productos/edit/:idProducto', upload.single('imagen'), productosController.editarProducto);

// Ruta para eliminar un producto
AppRouter.delete('/productos/delete/:idProducto', productosController.eliminarProducto);




module.exports = AppRouter;