const { Schema, model } = require("mongoose");

const HabitacionSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  estado: {
    habitacionnumero: {
      type: Number,
      unique: true,
      default:100,
    },
    type: Boolean,
    required: true,
    default: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
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
});

module.exports = model("Habitacion", HabitacionSchema);
