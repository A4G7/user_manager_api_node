import envConfig from "../config/envConfig.js";
import httpStatusCodes from "../config/httpStatusCodes.js";
import jwt from "jsonwebtoken";

const { secretKey } = envConfig;
const { CLIENT_ERROR } = httpStatusCodes;

export const generarToken = (username, role) => {
  return jwt.sign({ username, role }, secretKey, { expiresIn: "1h" });
};

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(CLIENT_ERROR.UNAUTHORIZED)
      .json({ message: "No estas autenticado" });

  try {
    req.user = jwt.verify(token, secretKey);
    next();
  } catch (error) {
    return res
      .status(CLIENT_ERROR.BAD_REQUEST)
      .json({ message: "Token inválido" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res
      .status(CLIENT_ERROR.FORBIDDEN)
      .json({ message: "No tienes permisos para realizar esta acción" });
  next();
};
