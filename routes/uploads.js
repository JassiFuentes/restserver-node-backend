const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');


const { validarCampos, validaArchivoSubir } = require('../middlewares');


//Instancia
const router = Router();

router.post( '/', validaArchivoSubir, cargarArchivo )

router.put('/:coleccion/:id', [
    validaArchivoSubir,
    check('id', 'Debe ser un id de Mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary)

router.get('/:coleccion/:id', [
    check('id', 'Debe ser un id de Mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)

module.exports = router;
