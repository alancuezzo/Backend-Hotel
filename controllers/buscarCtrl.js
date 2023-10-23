const { response, request } = require("express");

//importar modelos
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Habitacion = require("../models/habitacion");
const Reserva = require("../models/reserva");

const coleccionesPermitidas = ["usuarios", "categorias", "habitacion", "reserva"];

//Funciones para buscar por "termino"
//usuarios
const buscarUsuarios = async (termino, res = response) => {
  const regex = new RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

//buscar categorias
const buscarCategorias = async (termino, res = response) => {
  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({
    nombre: regex,
    estado: true,
  });

  res.json({
    results: categorias,
  });
};

//buscar habitaciones
const buscarHabitaciones = async (termino, res = response) => {
  const regex = new RegExp(termino, "i");

  const habitaciones = await Habitacion.find({
    $or: [{ nombre: regex }, { descripcion: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: habitaciones,
  });
};

const buscarReservas = async (termino, res = response) => {
  const regex = new RegExp(termino, "i");

  const reservas = await Reserva.find({
    $or: [{ nombre: regex }, { descripcion: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: reservas,
  });
};

//Funcion de busqueda principal
const buscar = (req = request, res = response) => {
  const { coleccion, termino } = req.params;

  //Validar si esa coleccion existe
  if (!coleccionesPermitidas.includes(coleccion)) {
    return req.status(400).json({
      msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
    });
  }

  //buscar colecciones
  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "habitaciones":
      buscarHabitaciones(termino, res);
      break;
      case "reservas":
        buscarReservas(termino, res);
        break;

    default:
      res.status(500).json({
        msg: "Error interno en realizar la busqueda",
      });
      break;
  }
};

module.exports = {
  buscar,
};
