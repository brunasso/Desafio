const express = require('express');
const logger = require('morgan')
const handlebars = require('express-handlebars')


//Arreglo para la view
const data = [
    {name: 'Bruno', apellido: 'Tomasso'}
]

// creo una app de tipo express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Defino motor de plantilla
app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'

}));

//Defino nombre de extensión de plantilla
app.set('view engine', 'hbs')
//Defino ruta de los archivos de plantilla
app.set('views', './views')


//Prueba de plantilla


//Importo las rutas y las utilizo con el prefijo '/api/productos'
const router = require('./routes/products')
app.use('/api/productos', router)



//Servimos pagina cuando ingresen a la ruta principal del server
app.get('/', (req,res) => {
    res.sendFile('index');
})






// ------ MIDDLEWARES -------

app.use(logger('dev'));

/* MIDDLEWARE DE APLICACION
Se le aplica a todas las solicitudes de la app */
app.use((req,res, next) => {
    console.log('Tiempo: ', new Date().toLocaleString());
    next();
})



/* MIDDLEWARE de ERRORES
Se toman los errores que no son controlados en cada bloque de la aplicación */
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Algo salió mal!!');
})

/* MIDDLEWARE INCORPORADO
Configuro carpeta pública */
app.use('/static', express.static(__dirname + '/public'));


// pongo a escuchar el servidor en el puerto indicado
const puerto = 8080;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
