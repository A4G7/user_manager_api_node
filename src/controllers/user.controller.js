import User from "../models/User.js";
import httpStatusCodes from "../config/httpStatusCodes.js";

const { SUCCESS, CLIENT_ERROR, SERVER_ERROR } = httpStatusCodes;

export const perfil = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    res.status(SUCCESS.OK).json(user);
  } catch (error) {
    res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json({ message: "Error al obtener perfil" });
  }
};

export const actualizarPerfil = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });

    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    await user.hash();

    await User.findOneAndUpdate({ username: req.user.username }, user);
    res.status(SUCCESS.OK).json({ message: "Perfil actualizado con éxito" });
  } catch (error) {
    res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json({ message: "Error al actualizar perfil" });
  }
};

export const eliminarPerfil = async (req, res) => {
  try {
    await User.findOneAndDelete({ username: req.user.username });
    res.status(SUCCESS.OK).json({ message: "Perfil eliminado con éxito" });
  } catch (error) {
    res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json({ message: "Error al eliminar perfil" });
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const users = await User.find();
    res.status(SUCCESS.OK).json(users);
  } catch (error) {
    res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json({ message: "Error al obtener usuarios" });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user)
      return res
        .status(CLIENT_ERROR.NOT_FOUND)
        .json({ message: "Usuario no encontrado" });

    res.status(SUCCESS.OK).json(user);
  } catch (error) {
    res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json({ message: "Error al obtener usuario" });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(CLIENT_ERROR.NOT_FOUND)
        .json({ message: "Usuario no encontrado" });

    user.username = req.body.username;
    user.email = req.body.email;
    user.role = req.body.role;

    await User.findByIdAndUpdate(req.params.id, user);
    res.status(SUCCESS.OK).json({ message: "Usuario actualizado con éxito" });
  } catch (error) {
    res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json({ message: "Error al actualizar usuario" });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user)
      return res
        .status(CLIENT_ERROR.NOT_FOUND)
        .json({ message: "Usuario no encontrado" });

    res.status(SUCCESS.OK).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    res
      .status(SERVER_ERROR.INTERNAL_SERVER_ERROR)
      .json({ message: "Error al eliminar usuario" });
  }
};
