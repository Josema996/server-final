import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const {
  POSTGRESS_DATABASE,
  POSTGRESS_USER,
  POSTGRESS_PASSWORD,
  POSTGRESS_HOST,
} = process.env;

const db = new Sequelize(POSTGRESS_DATABASE, POSTGRESS_USER, POSTGRESS_PASSWORD, {
  host: POSTGRESS_HOST,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Add this line for self-signed certificates or if you're not using a CA
    },
  },
});

// Test the database connection
async function testConnection() {
  try {
    await db.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// Synchronize the model with the database
async function syncModel() {
  try {
    await db.sync({ alter: true }); // Use "alter: true" for development only, it will automatically update the table's structure.
    console.log("Database model synchronized.");
  } catch (error) {
    console.error("Unable to synchronize the database model:", error);
  }
}

export { db, testConnection, syncModel };