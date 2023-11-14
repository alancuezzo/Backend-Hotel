const { Schema, model } = require("mongoose");

const HabitacionSchema = Schema({
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
  descripcion: {
    type: String,
  },
  img: {
    type: String,
  },
  destacado: {
    type: Boolean,
    default: false,
  },
  precio: {
    type: Number,
  },
disponibilidad: {
  type: Boolean,
  default: true,
},
cantidad:{
type: Number,
required: true
},

});

module.exports = model("Habitacion", HabitacionSchema);
