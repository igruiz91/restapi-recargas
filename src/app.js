import express, { json } from "express";
import morgan from "morgan";
import cors from 'cors'
import config from './config.js'
import TaskRoutes from "./routes/task.routes.js";

const app = express();

//settings
app.set("port", config.port);

//middlewares
app.use(morgan("dev"));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});
app.use('/api/tasks', TaskRoutes);


export default app