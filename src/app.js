const express = require('express')
const morgan  = require('morgan')
const exphbs = require('express-handlebars')
const conectarRouter = require('./routes/conectarRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const app = express();


app.use(express.json()); // para procesar JSON
app.use('/api/conectar', conectarRouter); // prefijo /api/conectar
app.use('/api/user', userRouter); // prefijo /api/conectar
app.use('/api/auth', authRoutes); // prefijo /api/conectar



module.exports = app;