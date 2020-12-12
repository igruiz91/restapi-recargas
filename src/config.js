import {config} from "dotenv";

config()

export default {
  mongodbURL: process.env.MONGODB_URI || 'mongodb://localhost/tasksdb',
  port: process.env.PORT || 5000
};