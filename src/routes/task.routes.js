import {Router} from "express";
import {
  getTasks,
  createTask,
  getTask,
  deleteTask,
  findAllDoneTask,
  findAllTodoTask,
  updateTask,
} from "../controllers/taskController.js";

const router = Router()

router.get('/', getTasks)
router.post('/', createTask)
router.get("/done", findAllDoneTask);
router.get("/todo", findAllTodoTask);
router.get('/:id', getTask)
router.put("/:id", updateTask);
router.delete('/:id', deleteTask)


export default router
