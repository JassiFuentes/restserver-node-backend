const { Schema, model } = require('mongoose');

const CategoriaScheme = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        require: true,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

CategoriaScheme.methods.toJSON = function() {
    // saco __v y password y el resto lo unifico en una cte que llame usuario
    const { __v, estado, ...data } = this.toObject();
    return data;
    
}

module.exports = model( 'Categoria', CategoriaScheme);
