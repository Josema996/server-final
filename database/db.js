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
    ssl: true,
  },
  sslmode: "require",
});

export default db;