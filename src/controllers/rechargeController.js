import Recharge from "../models/Recharge.js";
import { getPagination } from "../libs/getPagination.js";
import condition from "../utils/conditionPagination.js";

export const getRecharges = async (req, res) => {
  try {
    const { size, page, title } = req.query;
    const { limit, offset } = getPagination(page, size);
    const {
      docs,
      totalDocs,
      totalPages,
      page: currentPage,
    } = await Recharge.paginate(condition(title), { offset, limit });
    res.json({
      recharges: docs,
      totalItems: totalDocs,
      totalPages,
      currentPage: currentPage - 1,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the recharges",
    });
  }
};

export const getRecharge = async (req, res) => {
  const { id } = req.params;
  try {
    const recharge = await Recharge.findById(id);
    if (!recharge)
      return res
        .status(404)
        .json({ message: `Recharge with id ${id} does not exists` });
    res.send(recharge);
  } catch (error) {
    res.status(500).json({ message: error.message || "Recharge does not exits" });
  }
};

export const createRecharge = async (req, res) => {
  const { username, number, amount } = req.body;
  if (!username || !number || !amount) {
    return res.status(400).send({ message: "Fields cannot be empty" });
  }
  try {
    const newRecharge = new Recharge({ username, number, amount });
    const rechargeSaved = await newRecharge.save();
    res.json(rechargeSaved);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong creating the recharge",
    });
  }
};

export const updateRecharge = async (req, res) => {
  const { id } = req.params;
  try {
    await Recharge.findByIdAndUpdate(id, req.body);
    res.json({ message: "Recharge was updated successfully" });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const deleteRecharge = async (req, res) => {
  const { id } = req.params;
  try {
    const recharge = await Recharge.findByIdAndDelete(id);
    res.json({
      message: `Recharge ${id} deleted`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || `Cannot delete recharge with id: ${id}` });
  }
};

export const findAllDoneRecharge = async (req, res) => {
  const recharge = await Recharge.find({ done: true });
  res.json(recharge);
};
export const findAllTodoRecharge = async (req, res) => {
  const recharges = await Recharge.find({ done: false });
  res.json(recharges);
};
