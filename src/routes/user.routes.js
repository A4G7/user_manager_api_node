import { Router } from "express";
import {
  actualizarPerfil,
  eliminarPerfil,
  perfil,
} from "../controllers/user.controller.js";
import { verifyToken } from "../auth/jwt.js";
import {
  manejarValidaciones,
  validarPerfil,
} from "../validations/user.validations.js";

const router = Router();

router.get("/perfil", verifyToken, perfil);

router.put(
  "/perfil",
  verifyToken,
  validarPerfil,
  manejarValidaciones,
  actualizarPerfil
);

router.delete("/perfil", verifyToken, eliminarPerfil);

export default router;
