import User from "../models/User.js";
import httpStatusCodes from "../config/httpStatusCodes.js";
import { generarToken } from "../auth/jwt.js";

const { SUCCESS, CLIENT_ERROR, SERVER_ERROR } = httpStatusCodes;

export const registrar = async (req, res) => {
  try {
    const { username, email, password, role = "user" } = req.body;

    const user = new User({ username, email, password, role });

    await user.hash();
    await user.save();

    res.status(SUCCESS.OK).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json({ message: "Error al registrar usuario" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(CLIENT_ERROR.NOT_FOUND)
        .json({ message: "Usuario no existe" });

    const match = await user.verify(password);
    if (!match)
      return res
        .status(CLIENT_ERROR.BAD_REQUEST)
        .json({ message: "Contraseña incorrecta" });

    const token = generarToken(user.username, user.role);

    res.header("Authorization", token);
    res.status(SUCCESS.OK).json({ message: "Bienvenido", token });
  } catch (error) {
    res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json({ message: "Error al iniciar sesión" });
  }
};
