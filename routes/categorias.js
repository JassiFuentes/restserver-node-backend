const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorid } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');



const router = Router();
//api/categorias

// Obtener categorias - publico
router.get('/', obtenerCategorias);

//Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorid),
    validarCampos
], obtenerCategoria)

//Crear categoria - privado- cualquier perosona con rol, con un token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

//Actualizar registro por id - privado- cualquier perosona con rol, con un token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorid),
    validarCampos
], actualizarCategoria)

//Borrar uan categoria - Solo Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorid),
    validarCampos
], borrarCategoria)



module.exports = router
