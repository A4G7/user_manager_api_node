import { Router } from "express";
import { isAdmin, verifyToken } from "../auth/jwt.js";
import {
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuario,
  obtenerUsuarios,
} from "../controllers/user.controller.js";
import {
  manejarValidaciones,
  validarActualizarUsuario,
  validarId,
} from "../validations/user.validations.js";

const router = Router();

router.get("/users", verifyToken, isAdmin, obtenerUsuarios);

router.get(
  "/user/:id",
  verifyToken,
  isAdmin,
  validarId,
  manejarValidaciones,
  obtenerUsuario
);

router.put(
  "/user/:id",
  verifyToken,
  isAdmin,
  validarId,
  validarActualizarUsuario,
  manejarValidaciones,
  actualizarUsuario
);

router.delete(
  "/user/:id",
  verifyToken,
  isAdmin,
  validarId,
  manejarValidaciones,
  eliminarUsuario
);

export default router;
