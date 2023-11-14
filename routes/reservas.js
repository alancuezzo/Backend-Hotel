const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar_jwt");
const { esAdminRole } = require("../middlewares/validar-roles");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar_campos");
const { esReservaValido } = require("../helpers/db_validators");

const {
  obtenerReservas,
  obtenerReserva,
  crearReserva,
  actualizarReserva,
  borrarReserva,
} = require("../controllers/reservasCtrl");

const router = Router();

router.get("/", [validarJWT], obtenerReservas);

router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido!").isMongoId(),
    check("id").custom(esReservaValido),
    validarCampos,
  ],
  obtenerReserva
);

//ruta post
router.post(
  "/",
  [
    validarJWT,
    
    validarCampos,
  ],
  crearReserva
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "El id no es valido").isMongoId(),
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
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(esReservaValido),
    validarCampos,
  ],
  borrarReserva
);

module.exports = router;