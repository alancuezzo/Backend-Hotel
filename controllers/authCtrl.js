const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "Correo o password incorrectos! | correo",
      });
    }

    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Correo o password incorrectos! | estado",
      });
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Correo o password incorrectos! | password",
      });
    }

    const token = await generarJWT(usuario.id);

    res.json({
      msg: "Login OK!",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Comuniquese con el servicio!",
    });
  }
};

module.exports = {
  login,
};
