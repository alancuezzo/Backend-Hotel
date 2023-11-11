const Usuario = require("../models/usuario");
const Rol = require("../models/rol");
const Categoria = require("../models/categoria");
const Habitacion = require("../models/habitacion");
const Reserva = require("../models/reserva");


const esMailValido = async (correo) => {
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error(`El correo ${correo} ya existe en la base de datos!`);
  }
};

const esRolValido = async (rol) => {
  const existeRol = await Rol.findOne({ rol });

  if (!existeRol) {
    throw new Error(`El rol ${rol} no existe en la base de datos`);
  }
};

const esIdValido = async (id) => {
  const existeUsuario = await Usuario.findById(id);

  if (!existeUsuario) {
    throw new Error(`El Id ${id} no se encuentra en la base de datos!`);
  }
};

const esCategoriaValido = async (id) => {
  const existeCategoria = await Categoria.findById(id);

  if (!existeCategoria) {
    throw new Error(`La categoria ${id} no existe en la base de datos!`);
  }
};

const esHabitacionValido = async (id) => {
  const existeHabitacion = await Habitacion.findById(id);

  if (!existeHabitacion) {
    throw new Error(`El Id ${id} no corresponde a una habitacion existente!`);
  }
};

const esReservaValido = async (id) => {
  const existeReserva = await Reserva.findById(id);

  if (!existeReserva) {
    throw new Error(`El Id ${id} no corresponde a una Reserva existente!`);
  }
};

module.exports = {
  esMailValido,
  esRolValido,
  esIdValido,
  esCategoriaValido,
  esHabitacionValido,
  esReservaValido,
};
