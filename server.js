const express = require('express');
const path = require('path');
const app = express();

const port = 3001;

// -> pug como motor de plantillas
app.set('view engine', 'pug');
// -> cambiar directorio de vista a la carpeta views
app.set('views', path.join(__dirname, 'views'));
// -> fijamos la carpeta public para archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// -> renderizar en index pug
app.get('/', (req, res) => {
    res.render('index')
})

// escuchar server

app.listen(port, () => {
    console.log(`Server corriendo en http://localhost:${port}`);
});


// -> Ahora vamos con sql
var mysql = require('mysql');

// create a connection
var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tp8_bd'
});

// connect to the database
conexion.connect(function (err) {
    if (err) throw err;
    console.log("Conectado a la base de datos!");
});

// -> Rutas para mostrar las tablas
// -> TODOS los autores
app.get('/autor', (req, res) => {
    conexion.query('SELECT * FROM autor', function (err, results) {
        if (err) throw err;
        res.json(results);
    })
});

// -> TODOS los libros
app.get('/libro', (req, res) => {
    conexion.query('SELECT * FROM libro', function (err, results) {
        if (err) throw err;
        res.json(results);
    })
});

// -> TODOS los generos
app.get('/genero', (req, res) => {
    conexion.query('SELECT * FROM genero', function (err, results) {
        if (err) throw err;
        res.json(results);
    })
});

// -> tabla de muchos a muchos autor-libro
app.get('/autor-libros', (req, res) => {
    conexion.query('SELECT * FROM libro-autor', function (err, results) {
        if (err) throw err;
        res.json(results);
    })
});


// --------------------------> end point de la consulta A <------------------------------

app.get('/ca', (req, res) => {
    const documento = req.query.documento; // Extraer el valor del parámetro
    //console.log(documento);
    conexion.query(`SELECT * FROM libro li 
                    JOIN libro_autor la ON li.ISBN = la.ISBN
                    JOIN autor a ON a.documento = la.documento
                    WHERE a.documento = ?;`, [documento], // Pasar el parámetro
                    function (err, results) {
        if (err) {
            console.error('Error en la consulta:', err); 
            return res.status(500).json({ error: 'Error en la consulta' }); // Enviar error al cliente
        }
        res.json(results);
    });
});

// -----------------------------> endpoint para la consulta B <-----------------------------------------

app.get('/cb', (req, res) => {
    const titulo = req.query.titulo; // Extraer el valor del parámetro
    //console.log(titulo);
    
    conexion.query(`
        SELECT a.nombre, a.foto, li.titulo
        FROM autor a
        JOIN libro_autor la ON a.documento = la.documento
        JOIN libro li ON li.ISBN = la.ISBN
        WHERE li.titulo LIKE ?`, [titulo], // Pasar el parámetro
                    function (err, results) {
        if (err) {
            console.error('Error en la consulta:', err); 
            return res.status(500).json({ error: 'Error en la consulta' }); // Enviar error al cliente
        }
        res.json(results);
    });
});

// -------------------------------> endpoint consulta c <--------------------------------------------------

app.get('/cc', (req, res) => {
    const paginas = req.query.paginas; // Extraer el valor del parámetro
    //console.log(titulo);
    
    conexion.query(`
        SELECT li.titulo, g.descripcion, li.anio
        FROM libro li
        JOIN genero g ON g.idGenero = li.idGenero
        WHERE li.cantidadPaginas > ?;`, [paginas], // Pasar el parámetro
                    function (err, results) {
        if (err) {
            console.error('Error en la consulta:', err); 
            return res.status(500).json({ error: 'Error en la consulta' }); // Enviar error al cliente
        }
        res.json(results);
    });
});

// --------------------------------------------> end point consulta d <------------------------------------

app.get('/cd', (req, res) => {
    const generos = req.query.generos; // Extraer el valor del parámetro
    //console.log(generos);
    
    conexion.query(`
        SELECT a.nombre
        FROM autor a
        JOIN libro_autor la ON a.documento = la.documento
        JOIN libro li ON li.ISBN = la.ISBN
        JOIN genero g ON g.idGenero = li.idGenero
        WHERE la.porcentajeParticipacion > 50 AND g.descripcion LIKE ?;`, [generos], // Pasar el parámetro
                    function (err, results) {
        if (err) {
            console.error('Error en la consulta:', err); 
            return res.status(500).json({ error: 'Error en la consulta' }); // Enviar error al cliente
        }
        res.json(results);
    });
});



// --------------------------------------------------------------------------------------------------------

// RENDERIZAR LOS PUG 

app.get('/consultaA', (req, res) => {
    res.render('consultaA');  // Renderiza el archivo consultaA.pug
});

app.get('/consultaB', (req, res) => {
    res.render('consultaB');
});

app.get('/consultaC', (req, res) => {
    res.render('consultaC');
});

app.get('/consultaD', (req, res) => {
    res.render('consultaD');
});