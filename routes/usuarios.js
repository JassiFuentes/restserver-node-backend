const { Router } = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos')
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const { validarCampos, validarJWT, esAdminRole,tieneRole } = require('../middlewares');

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators');

//Instancia
const router = Router();

//1er argumento path, 2do arg controlador, en caso de 3 arg el 2ero corresponde alos middlewares
router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    check('rol').custom( esRoleValido ),
    validarCampos
],usuariosPut);

router.post('/', [
    //valido las cosas requerida que me manda del body
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('correo').isEmail().custom( emailExiste ),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost);

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    //mando como arg a la funcion
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    validarCampos
],usuariosDelete);

router.patch('/', usuariosPatch);



module.exports = router;