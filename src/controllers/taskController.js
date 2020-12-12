import Task from "../models/Task.js";
import { getPagination } from "../libs/getPagination.js";
import condition from "../utils/conditionPagination.js";

export const getTasks = async (req, res) => {
  try {
    const { size, page, title } = req.query;
    const { limit, offset  } = getPagination(page, size);
    const {docs, totalDocs, totalPages, page: currentPage} = await Task.paginate(condition(title), {offset , limit });
    res.json({
      tasks: docs,
      totalItems: totalDocs,
      totalPages,
      currentPage:currentPage-1
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the tasks",
    });
  }
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if(!task) return res.status(404).json({message: `Task with id ${id} does not exists`})
    res.send(task);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Task does not exits'});
  }
};

export const createTask = async (req, res) => {
  if(!req.body.title) {
    return res.status(400).send({message: "Content cannot be empty"})
  }
  try {
    const { title, description, done } = req.body;
    const newTask = new Task({ title, description, done });
    const taskSaved = await newTask.save();
    res.json(taskSaved);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong creating the tasks",
    });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndUpdate(id, req.body);
    res.json({ message: "Task was updated successfully" });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    res.json({
      message: `Task ${id} deleted`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || `Cannot delete task with id: ${id}`});
  }
};

export const findAllDoneTask = async (req, res) => {
  const tasks = await Task.find({ done: true });
  res.json(tasks);
};
export const findAllTodoTask = async (req, res) => {
  const tasks = await Task.find({ done: false });
  res.json(tasks);
};
