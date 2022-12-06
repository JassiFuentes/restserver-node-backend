const { Router } = require('express');
const { check } = require('express-validator');

const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos')
const { existeProductoPorid, existeCategoriaPorid } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');



const router = Router();
//api/categorias

router.get('/', obtenerProductos);

//Obtener una p por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeProductoPorid),
    validarCampos
], obtenerProducto)

//Crear producto - privado- cualquier perosona con rol, con un token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es Obligatorio').isMongoId(),
    check('categoria').custom( existeCategoriaPorid),
    validarCampos
], crearProducto)

//Actualizar registro por id - privado- cualquier perosona con rol, con un token valido
router.put('/:id', [
    validarJWT,
    // check('categoria', 'No es id de mongo').isMongoId(),
    check('id').custom( existeProductoPorid),
    validarCampos
], actualizarProducto);

//Borrar uan categoria - Solo Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeProductoPorid),
    validarCampos
], borrarProducto)



module.exports = router