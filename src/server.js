// server.js
const express = require('express');
const Handlebars = require('handlebars')
const expHBS = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const methodOverride = require('method-override');


const mongoose = require('mongoose');
const path = require('path')

// Conexión a la base de datos de MongoDB
mongoose.connect('mongodb+srv://anonimo:cyber@anonimo.d9yhmae.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
 

const app = express();
const port = 3000;

// Configuración de Express Handlebars
// obten rutas static 
app.set('server', process.env.PORT || 5500)

// Configuración de Handlebars
const hbs = expHBS.create({
    extname: '.hbs',
    //   partialsDir: path.join(__dirname, './partials'),
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

// Configuración del motor de plantillas
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')



// Middleware para procesar datos del formulario
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Rutas
const clientesRouter = require('./routes/clientes');
app.use('/clientes', clientesRouter);


// Obteniendo Las Rutas static
app.use(express.static(path.join(__dirname, '/public')));



// Inicio del servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}/clientes`);
});
