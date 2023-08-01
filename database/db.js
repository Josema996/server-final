import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { POSTGRESS_URL, POSTGRESS_USER, POSTGRESS_PASSWORD, POSTGRESS_HOST, POSTGRESS_DATABASE } = process.env;

const db = new Sequelize(POSTGRESS_URL || {
  database: POSTGRESS_DATABASE,
  username: POSTGRESS_USER,
  password: POSTGRESS_PASSWORD,
  host: POSTGRESS_HOST,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
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