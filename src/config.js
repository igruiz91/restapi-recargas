import {config} from "dotenv";

config()

export default {
  mongodbURL: process.env.MONGODB_URI || 'mongodb://localhost/rechargesdb',
  port: process.env.PORT || 5000
};
