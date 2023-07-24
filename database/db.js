import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const {
  POSTGRES_DATABASE,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
} = process.env;

const db = new Sequelize(POSTGRES_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOST,
  dialect: "postgres",
  dialectOptions: {
    ssl: true,
  },
  sslmode: "require",
});

export default db;