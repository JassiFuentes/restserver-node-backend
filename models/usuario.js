const { Schema, model } = require('mongoose')


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Defina una constraseña'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

});

//sacar el password y __v version de mi DB
UsuarioSchema.methods.toJSON = function() {
    // saco __v y password y el resto lo unifico en una cte que llame usuario
    const { __v, password, ...usuario } = this.toObject();
    return usuario
    
}

module.exports = model('Usuario', UsuarioSchema);