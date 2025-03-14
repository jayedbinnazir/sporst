import { config } from "dotenv";
import path from "node:path";

config({ path: path.join(__dirname, `../../.env.${process.env}`) });

const {
   PORT,
   NODE_ENV,
   DB_HOST,
   DB_PORT,
   DB_USERNAME,
   DB_PASSWORD,
   DB_NAME,
   REFRESH_TOKEN_SECRET,
   DATABASE_URL,
   JWT_SECRET
} = process.env;


export const Config = {
   PORT,
   NODE_ENV,
   DB_HOST,
   DB_PORT,
   DB_USERNAME,
   DB_PASSWORD,
   DB_NAME,
   REFRESH_TOKEN_SECRET,
   JWT_SECRET,
   DATABASE_URL
};