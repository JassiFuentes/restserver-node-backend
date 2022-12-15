const { response } = require("express");

const validaArchivoSubir = ( req, res= response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {// <== barrido
        return res.status(400).json({ msg: 'No Hay archivos en la peticion. - validarArchivoSubir' });
        
    }

    next()
}

module.exports = {
    validaArchivoSubir
}