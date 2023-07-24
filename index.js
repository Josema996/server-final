import express from "express";
import cors from "cors";
import db from "./database/db.js";
import blogRoutes from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/blogs", blogRoutes);

// Sincronizar el modelo con la base de datos
db.sync({ alter: true })
  .then(() => {
    console.log("Synchronized the model with the database.");
  })
  .catch((error) => {
    console.error("Error synchronizing the model:", error);
  });

try {
  await db.authenticate();
  console.log("Conexion exitosa mira aylen");
} catch (error) {
  console.log(`El error es: ${error}`);
}

app.get("/", (req, res) => {
  res.send("Hola aylen");
});

app.listen(8000, () => {
  console.log("Server up running in http://localhost:8000/");
});