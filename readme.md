# Proyecto conectar Nodejs con firebase

## Version Node v20.9.0

Para crear un proyecto
`npm init -y`

Instalaremos express que nos permite crear el servidor donde podremos recibir las peticiones
`npm i express`

Instalamos handlebars es un motor de plantillas, es una extensión del html
`npm i express-handlebars`

Instalamos morgan para ver las peticiones por consola
`npm i morgan`

Instalamos firebase-admin, para ver puede ir al SDK de Firebase Admin project settings/Service accounts/ presionar el botón "Generar nueva clave"
`npm i firebase-admin`

Instalamos nodemon, nodemon detecta cambios en los archivos y reinicia el servidor automáticamente.
`npm i nodemon`
para su configuración ir a `package.json` 
`    "start": "nodemon ./src/index.js",`