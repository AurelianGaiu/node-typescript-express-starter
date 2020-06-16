
import dotenv from 'dotenv';
dotenv.config();

export const environment = {
  APP_SERVER_PORT: process.env.APP_SERVER_PORT,
  AUTH_SERVER_PORT: process.env.AUTH_SERVER_PORT,
  MONGO_URL: process.env.MONGO_URL,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
}
