import {Router} from "express";
import {
  getRecharge,
  getRecharges,
  createRecharge,
  deleteRecharge,
  findAllDoneRecharge,
  findAllTodoRecharge,
  updateRecharge,
} from "../controllers/rechargeController";

const router = Router()

router.get("/", getRecharges);
router.post("/", createRecharge);
router.get("/done", findAllDoneRecharge);
router.get("/todo", findAllTodoRecharge);
router.get("/:id", getRecharge);
router.put("/:id", updateRecharge);
router.delete("/:id", deleteRecharge);


export default router
