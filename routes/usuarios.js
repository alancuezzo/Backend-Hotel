const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar_jwt");
const { esAdminRole } = require("../middlewares/validar-roles");

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar_campos");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  obtenerUsuario,
} = require("../controllers/usuariosCtrl");

const {
  esMailValido,
  esRolValido,
  esIdValido,
} = require("../helpers/db_validators");

const router = Router();

router.get("/", usuariosGet);

router.get(
  "/:id",
  [
    validarJWT,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(esIdValido),
    validarCampos,
  ],
  obtenerUsuario
);

//PETICION POST: recibir datos
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio!").notEmpty(),
    check(
      "password",
      "La contraseña debe tener como minimo 6 caracteres!"
    ).isLength({ min: 6 }),
    check("correo", "no es un correo valido!").isEmail(),
    check("correo").custom(esMailValido),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido!").isMongoId(),
    check("id").custom(esIdValido),
    validarCampos,
  ],
  usuariosPut
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido!").isMongoId(),
    check("id").custom(esIdValido),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
