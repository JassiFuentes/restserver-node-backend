const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


//Instancia
const router = Router();

//1er argumento path, 2do arg llamo al controlador, en caso de 3 arg el 2ero corresponde alos middlewares
router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatorio').not().isEmpty(),
    validarCampos
],login);

module.exports = router;
