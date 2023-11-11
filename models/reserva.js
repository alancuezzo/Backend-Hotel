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
        required: [true, "El usuario es obligatorio!"]
      },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        required: [true, "Se debe seleccionar una Categoria!"]
    },
   
    entrada: {
      type: String,
      
  },
  salida: {
    type: String,
     
},

});

module.exports = model("Reserva",ReservaSchema);