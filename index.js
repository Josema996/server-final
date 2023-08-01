import express from "express";
import cors from "cors";
import db from "./database/db.js";
import blogRoutes from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola aylen");
});

app.use("/blogs", blogRoutes);

// Sincronizar el modelo con la base de datos
app.get("/blogs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // Abrir la conexión a la base de datos
    await db.authenticate();
    // Realizar la operación con la base de datos
    const blog = await db.models.Blog.findByPk(id);
    // Cerrar la conexión con la base de datos
    await db.close();

    if (blog) {
      res.json(blog);
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