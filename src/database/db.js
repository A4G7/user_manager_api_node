import envConfig from "../config/envConfig.js";
import mongoose from "mongoose";

const { mongoURI } = envConfig;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Conexión a MongoDB exitosa");
  })
  .catch((error) => {
    console.log("Error en la conexión: ", error);
  });

export default mongoose;
