const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar_jwt");
const { esAdminRole } = require("../middlewares/validar-roles");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar_campos");

const {
    reservasGet,
    reservasPost,
    reservasPut,
    reservasDelete,
    obtenerReserva,
    crearReserva,
    borrarReserva,
  } = require("../controllers/reservasCtrl");

  const {
    esMailValido,
    esRolValido,
    esIdValido,
  } = require("../helpers/db_validators");

  const router = Router();

  router.get("/", reservasGet);

router.get(
  "/:id",
  [
    validarJWT,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(esIdValido),
    validarCampos,
  ],
  obtenerReserva
);

router.post(
    "/",
    [
      validarJWT,
      check("reserva", "La reserva es obligatoria!").notEmpty(),
      check("correo", "no es un correo valido!").isEmail(),
      check("correo").custom(esMailValido),
      validarCampos,
    ],
    crearReserva
  );

  router.put(
    "/:id",
    [
      validarJWT,
      esAdminRole,
      check("id", "No es un ID válido!").isMongoId(),
      check("nombre", "El nombre es obligatorio").notEmpty(),
      check("id").custom(esReservaValido),
  
      validarCampos,
    ],
    actualizarReserva
  );

  router.delete(
    "/:id",
    [
      validarJWT,
      esAdminRole,
      check("id", "No es un ID válido!").isMongoId(),
      check("id").custom(esReservaValido),
  
      validarCampos,
    ],
    borrarReserva
  );
  
  module.exports = router;