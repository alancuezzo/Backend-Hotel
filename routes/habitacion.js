const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar_jwt");
const { esAdminRole } = require("../middlewares/validar-roles");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar_campos");
const { esHabitacionValido } = require("../helpers/db_validators");

const {
  obtenerHabitaciones,
  obtenerHabitacion,
  crearHabitacion,
  actualizarHabitacion,
  borrarHabitacion,
} = require("../controllers/habitacionesCtrl");

const router = Router();

router.get("/", obtenerHabitaciones);

router.get(
  "/:id",
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(esHabitacionValido),
    validarCampos,
  ],
  obtenerHabitacion
);

//ruta post
router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  crearHabitacion
);

router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(esHabitacionValido),
    validarCampos,
  ],
  actualizarHabitacion
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(esHabitacionValido),
    validarCampos,
  ],
  borrarHabitacion
);

module.exports = router;
