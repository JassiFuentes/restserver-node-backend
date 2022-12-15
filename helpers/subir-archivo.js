const path = require('path')
const { v4: uuidv4 } = require('uuid');


const subirArchivo = ( files, extensionesValidas = ['jpg', 'png', 'jpeg', 'gif'], carpeta = '' ) => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1];

        //Validar la extension
        if (!extensionesValidas.includes(extension) ) {
            return reject(`La extension ${extension} no es permitida, intente con ${extensionesValidas}`);
        }

        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        //mover el archivo al path
        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            //devuelvo nombre del archivo
            resolve( nombreTemp );

        });
    })

}

module.exports = {
    subirArchivo
}