import Task from "../models/taskModel";
import { Request, Response } from "express";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Getting error" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description, dueDate, labels } = req.body;
  try {
    const newTask = new Task({ title, description, dueDate, labels });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: "Creating error" });
  }
};
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Deleting error" });
  }
};
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, dueDate, labels } = req.body;
  try {
    const updatedTask = await Task.findOneAndUpdate(
      id,
      { title, description, dueDate, labels },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Updating error" });
  }
};
