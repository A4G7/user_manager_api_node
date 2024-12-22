import { body, param, validationResult } from "express-validator";
import httpStatusCodes from "../config/httpStatusCodes.js";
import User from "../models/User.js";

const { CLIENT_ERROR } = httpStatusCodes;

export const validarPerfil = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es requerido"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El correo electrónico es requerido")
    .isEmail()
    .withMessage("Email inválido")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new Error("El correo electrónico ya está en uso");
      return true;
    }),
  body("password").trim().notEmpty().withMessage("La contraseña es requerida"),
];

export const validarLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El correo electrónico es requerido")
    .isEmail()
    .withMessage("Email inválido"),
  body("password").trim().notEmpty().withMessage("La contraseña es requerida"),
];

export const validarActualizarUsuario = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es requerido"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El correo electrónico es requerido")
    .isEmail()
    .withMessage("Email inválido")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new Error("El correo electrónico ya está en uso");
      return true;
    }),
  body("role").trim().notEmpty().withMessage("El rol es requerido"),
];

export const validarId = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("El id es requerido")
    .isMongoId()
    .withMessage("Id inválido"),
];

export const manejarValidaciones = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(CLIENT_ERROR.BAD_REQUEST).json({
      message: "Hay errores en los datos proporcionados",
      errors: errors
        .array()
        .map((error) => ({ field: error.path, message: error.msg })),
    });
  next();
};
