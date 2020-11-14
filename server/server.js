const express = require('express');
const app = express();
const morgan = require('morgan');

// Middlewares
app.use(morgan('dev'));
app.use(express.json);

// Settings
app.set('port', process.env.PORT || 3000);

// Ageegar Headers
app.use((req, res, next) => {

    // Habilitamos le acceso a la API Reste desde cualquier origen
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Agregamos los metodos que seran permitidos para la API Rest
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Agregamos los headers que debe contener nuestra API Rest
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type')

    // Le damos paso al Siguiente Middleware
    next();

})

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})

// Database connection
const { mongoose } = require('./database');

// Routes
app.use('/', require('./routes/auth.routes'));