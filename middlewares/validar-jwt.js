const { request, response } = require('express')
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');

const Usuario = require('../models/usuario')

const validarJWT = async( req = request, res = response, next) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
        
    }

    //validacion del jwt
    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        //leer el usuario que corresponde al iud que extraigo
        const usuario = await Usuario.findById(uid);

        if ( !usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario borrado en DT'
            })
        }
        //verificar si el uid su estado esta en true
        if ( !usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - estado:false'
            })
        }



        req.usuario = usuario;
        next();        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
        
    }

}

module.exports = {
    validarJWT
}