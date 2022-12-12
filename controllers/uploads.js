const path = require('path')
const { v4: uuidv4 } = require('uuid');

const { response } = require("express");



const cargarArchivo = (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {// <== barrido
        res.status(400).json({msg:'No Hay archivos en la peticion.'});
        return;
    }

    
    const { archivo } = req.files;
    const nombreCortado = archivo.name.split('.')
    const extension = nombreCortado[ nombreCortado.length - 1];

    //Validar la extension
    const extensionesValidas = ['jpg', 'png', 'jpeg', 'gif'];

    if ( !extensionesValidas.includes(extension)) {
        return res.status(400).json({
            msg: `La extension ${extension} no es permitida, intente con ${ extensionesValidas}`
        })
    }

    const nombreTemp = uuidv4() + '.' + extension;
     const uploadPath = path.join(__dirname, '../uploads/', nombreTemp);

     archivo.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({err});
        }

        res.json({msg:'File uploaded to ' + uploadPath});
    });
}

module.exports = { cargarArchivo }