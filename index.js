import express from "express";
import cors from "cors";
import { db, testConnection, syncModel } from "./database/db.js";
import blogRoutes from "./routes/routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Test the database connection and synchronize the model with the database
async function startServer() {
  try {
    await testConnection();
    await syncModel();

    app.listen(8000, () => {
      console.log("Server up running in http://localhost:8000/");
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

// Start the server
startServer();

app.get("/", (req, res) => {
  res.send("Hola aylen");
});

app.use("/blogs", blogRoutes);

app.get("/blogs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await db.query("SELECT * FROM blogs WHERE id = $1", [id]);

    if (blog.rowCount > 0) {
      res.json(blog.rows[0]);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    console.error("Error retrieving blog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});