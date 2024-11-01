const express = require('express')
const morgan  = require('morgan')
const exphbs = require('express-handlebars')
const conectarRouter = require('./routes/conectar.routes.js');
const app = express();


app.use(express.json()); // para procesar JSON
app.use('/api/conectar', conectarRouter); // prefijo /api/conectar



module.exports = app;