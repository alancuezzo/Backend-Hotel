const { response, request } = require("express");
const Habitacion = require("../models/habitacion");


const obtenerHabitaciones = async (req = request, res = response) => {
  const { desde = 0, limite = 0 } = req.query;
  const query = { estado: true };

  const [total, habitaciones] = await Promise.all([
    Habitacion.countDocuments(query),
    Habitacion.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate("usuario", "nombre")
      .populate("categoria", "nombre"),
  ]);

  res.json({
    total,
    habitaciones,
  });
};

const obtenerHabitacion = async (req = request, res = response) => {
  const { id } = req.params;

  const habitacion = await Habitacion.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json({
    habitacion,
  });
};

const crearHabitacion = async (req = request, res = response) => {
  const { precio, categoria, img, descripcion, } = req.body;
  const nombre = req.body.nombre.toUpperCase();

  const habitacionDB = await Habitacion.findOne({ nombre });

  if (habitacionDB) {
    res.status(400).json({
      msg: `La Habitacion ${habitacionDB.nombre} ya existes`,
    });
  }

  const data = {
    nombre,
    categoria,
    precio,
    img,
    descripcion,
    img,
    usuario: req.usuario._id,
  };

  const habitacion = new Habitacion(data);

  await habitacion.save();

  if (habitacion) {
    res.status(201).json({
      habitacion,
      msg: "La habitacion fue creada con exito!",
    });
  }
};

const actualizarHabitacion = async (req = request, res = response) => {
  const { id } = req.params;
  const { precio, categoria, descripcion, img, destacado, } = req.body;

  const usuario = req.usuario._id;

  const data = {
    precio,
    descripcion,
    categoria,
    img,
    destacado,
    usuario,
  };

  if (req.body.nombre) {
    data.nombre = req.body.nombre.toUpperCase();
  }

  const habitacion = await Habitacion.findByIdAndUpdate(id, data, { new: true });

  res.status(201).json({
    msg: "Habitacion actualizada!",
    habitacion,
  });
};

const borrarHabitacion = async (req = request, res = response) => {
  const { id } = req.params;

  const habitacionEliminada = await Habitacion.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    habitacionEliminada,
    msg: `Habitacion eliminada!`,
  });
};

module.exports = {
  obtenerHabitaciones,
  obtenerHabitacion,
  crearHabitacion,
  actualizarHabitacion,
  borrarHabitacion,
};
