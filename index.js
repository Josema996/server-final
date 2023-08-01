import express from "express";
import cors from "cors";
import { db, testConnection, syncModel } from "./database/db.js";
import blogRoutes from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola aylen");
});

app.use("/blogs", blogRoutes);

// Sincronizar el modelo con la base de datos

// Test the database connection
testConnection();

// Synchronize the model with the database
syncModel();

app.get("/blogs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await db.connect(); // Abre la conexión a la base de datos
    const result = await db.query("SELECT * FROM blogs WHERE id = $1", [id]);
    await db.end(); // Cierra la conexión con la base de datos

    if (result.rowCount > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(8000, () => {
  console.log("Server up running in http://localhost:8000/");
});