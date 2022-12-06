const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');



class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //RUTAS
        this.paths = {
            auth: '/api/auth',
            bucar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',

        }
        


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
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.bucar, require('../routes/buscar'))
        this.app.use( this.paths.categorias, require('../routes/categorias'));
        this.app.use( this.paths.productos, require('../routes/productos'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}

module.exports = Server;