const { Schema, model } = require("mongoose");

const ReservaSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio!"],
        unique: true,
      },
      estado: {
        type: Boolean,
        required: true,
        default: true,
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
    fechaReserva: {
        type: Date,
         //!dia q se hace la reserva
    },
    entrada: {
      type: String,
      
  },
  salida: {
    type: String,
     
},
    personas:{
        type: Number,
        default: 1,
    },
  
});

module.exports = model("Reserva",ReservaSchema);