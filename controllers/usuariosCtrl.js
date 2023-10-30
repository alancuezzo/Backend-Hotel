const { response, request } = require("express");

const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  const { desde = 0, limite = 0 } = req.query;

  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(desde).limit(limite),
  ]);

  res.json({
    mensaje: "Envio datos!",
    total,
    usuarios,
  });
};

const obtenerUsuario = async (req = request, res = response) => {
  const { id } = req.params;

  const usuario = await Usuario.findById(id);

  res.json({
    usuario,
  });
};

//POST
const usuariosPost = async (req = request, res = response) => {
  const datos = req.body;
  const { nombre, correo, password, rol, edad } = datos;

  const usuario = new Usuario({ nombre, correo, password, rol, edad });

  const salt = bcrypt.genSaltSync(10);
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();

  res.json({
    usuario,
    mensaje: "El usuario se creo correctamente!",
  });
};

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;

  const { password, ...updUsuario } = req.body;

  const usuario = await Usuario.findByIdAndUpdate(id, updUsuario, {
    new: true,
  });

  res.json({
    mensaje: "Datos de usuarios actualizados",
    password,
    id,
    usuario,
  });
};

const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const usuarioAdmin = req.usuario;

  const usuario = await Usuario.findById(id);

  if (!usuario.estado) {
    return res.json({
      msg: "El usuario ya esta inactivo!",
    });
  }

  const usuarioInactivo = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    mensaje: "Usuario eliminado!",
    usuarioInactivo,
    usuarioAdmin,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  obtenerUsuario,
};
