import envConfig from "./config/envConfig.js";
import app from "./app.js";

const { port } = envConfig;

app.listen(port, () => {
  console.log(`Server activo en http://localhost:${port}`);
});
