import "dotenv/config";

const { PORT, MONGO_URI, SECRET_KEY } = process.env;

if (!PORT || !MONGO_URI || !SECRET_KEY) {
  throw new Error("Faltan variables de entorno");
}

export default {
  port: PORT || 3000,
  mongoURI: MONGO_URI,
  secretKey: SECRET_KEY,
};
