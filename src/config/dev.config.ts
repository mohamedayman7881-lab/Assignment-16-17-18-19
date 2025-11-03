/** create folder config (in src folde to can import it in project) and create file dev.config and write in it object
 * >> to write in it values of env to make use this value easy in my project
 */
import { config } from "dotenv";
// if env file dont load values equale undefined
config(); // so we use config() to load values before export it
export const devConfig = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,

  //  cloud
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  CLOUD_NAME: process.env.CLOUD_NAME,

  // email
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,

  // token
  JWT_SECRET: process.env.JWT_SECRET, 
};
