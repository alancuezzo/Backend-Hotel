const { Schema, model } = require("mongoose");

const HabitacionSchema = Schema({
  
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
  descripcion: {
    type: String,
  },
  estado: {
    type: Boolean,
    required: true,
    default: true,
  },
  img: {
    type: String,
  },
  destacado: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Habitacion", HabitacionSchema);
