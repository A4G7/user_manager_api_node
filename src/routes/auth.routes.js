import { Router } from "express";
const router = Router();
import { registrar, login } from "../controllers/auth.controller.js";
import {
  manejarValidaciones,
  validarLogin,
  validarPerfil,
} from "../validations/user.validations.js";

router.post("/registrar", validarPerfil, manejarValidaciones, registrar);

router.post("/login", validarLogin, manejarValidaciones, login);

export default router;
