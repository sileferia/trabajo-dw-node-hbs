const express = require('express');
const app = express();
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

// Middlewares
app.use(morgan('dev'));
app.use(session({
    secret: 'secret-session-artesanias',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.messageError = req.flash('messageError');

    next();
})



// Settings
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('port', process.env.PORT || 3000);

hbs.registerPartials(__dirname + '/views/parciales');
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'))


// Agregar Headers
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

// Passport
require('./utils/passport/local-auth');

// Routes
app.use('/', require('./routes/app.routes'));