const { response, request } = require("express");
const Reserva = require("../models/reserva");

const obtenerReservas = async (req = request, res = response) => {
  const { desde = 0, limite = 0 } = req.query;
  const query = { estado: true };

  const [total, reservas] = await Promise.all([
    Reserva.countDocuments(query),
    Reserva.find(query)
      .skip(desde)
      .limit(limite)
      .populate("usuario", "correo"), //!MUESTRA QUIEN CREO LA CATEGORIA  <------------------
  ]);

  res.json({
    total,
    reservas,
  });
};

const obtenerReserva = async (req = request, res = response) => {
  const { id } = req.params;

  const reserva = await Reserva.findById(id).populate(
    "usuario",
    "nombre correo"
  );

  res.json({
    reserva,
  });
};

const crearReserva = async (req = request, res = response) => {
  const { precio, categoria, fechaReserva, personas, entrada , salida } = req.body;
  const nombre = req.body.nombre.toUpperCase();

  const reservaDB = await Reserva.findOne({ nombre });

  if (reservaDB) {
    res.status(400).json({
      msg: `La reserva ${reservaDB.nombre} ya existe`,
    });
  }

  const data = {
    nombre,
    precio,
    categoria,
    fechaReserva,
    entrada,
    salida,
    personas,
    usuario: req.usuario._id,
  };

  const reserva = new Reserva(data);

  await reserva.save();

  if (reserva) {
    res.status(200).json({
      reserva,

      msg: "La reserva se creo correctamente",
    });
  }
};

const actualizarReserva = async (req = request, res = response) => {
  const { id } = req.params;
  const { precio, categoria, personas } = req.body;

  const usuario = req.usuario._id;

  const data = {
    precio,
    categoria,
    personas,
    usuario,
  };

  if (req.body.nombre) {
    data.nombre = req.body.nombre.toUpperCase();
  }

  const reserva = await Reserva.findByIdAndUpdate(id, data, { new: true });

  res.status(201).json({
    msg: "Reserva actualizada!",
    reserva,
  });
};

const borrarReserva = async (req = request, res = response) => {
  const { id } = req.params;

  const reservaEliminada = await Reserva.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    reservaEliminada,
    msg: "Reserva eliminada!",
  });
};

module.exports = {
  crearReserva,
  obtenerReservas,
  obtenerReserva,
  actualizarReserva,
  borrarReserva,
};
