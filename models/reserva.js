const { Schema, model } = require("mongoose");

const ReservaSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio!"],
        unique: true,
      },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
      },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        required: true,
    },
    fecha: {
        type: Date, //!dia q se hace la reserva
    },
    precio: {
        type: Number,
    },
    personas:{
        type: Number,
        default: 1,
    },
    estado:{
        type: Boolean,
        required: true,
        default: true,
    },

    


});

module.exports = model("Reserva",ReservaSchema);