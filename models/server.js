const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');



class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //RUTAS
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';


        //Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConection()
    }

    middlewares(){

        // CORS
        this.app.use( cors())

        //lectura y parseo del body
        this.app.use( express.json() )



        //directorio Publico
        this.app.use( express.static('public'))
    }

    routes() {
        //primer arg la ruta, segundo arg de donde lo solicito su cont-ubicacion
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.usuariosPath, require('../routes/usuarios'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}

module.exports = Server;