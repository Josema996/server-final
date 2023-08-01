import { db } from "../database/db.js";
import { DataTypes } from "sequelize";

const BlogModel = db.define('blogs', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.STRING, allowNull: false },
  dni: { type: DataTypes.INTEGER, allowNull: false },
  edad: { type: DataTypes.INTEGER, allowNull: false },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  direccion: { type: DataTypes.STRING, allowNull: true },
  examenFisico: { type: DataTypes.STRING, allowNull: true }, // Agregar el campo "examenFisico"
  pedidos: { type: DataTypes.STRING, allowNull: true }, // Agregar el campo "pedidos"
  obraSocial: { type: DataTypes.STRING, allowNull: true }, // Agregar el campo "obraSocial"
  numeroObra: { type: DataTypes.STRING, allowNull: true }, // Agregar el campo "numeroObra"
  createdAt: { type: DataTypes.DATE, allowNull: true },
  updatedAt: { type: DataTypes.DATE, allowNull: true }
});

(async () => {
  try {
    await db.authenticate();
    console.log('Conexión establecida correctamente.');

    // Sincronizar el modelo con la base de datos (incluyendo los nuevos campos)
    await BlogModel.sync();
    console.log('Modelo sincronizado exitosamente.');
  } catch (error) {
    console.error('Error al conectar y sincronizar:', error);
  }
})();

export default BlogModel;