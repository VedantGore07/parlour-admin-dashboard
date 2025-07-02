import Task from '../models/Task';
import { Request, Response } from 'express';

export const getTasks = async (_req: Request, res: Response) => {
  const tasks = await Task.find().populate('assignedTo');
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const { description, assignedTo } = req.body;
  const task = await Task.create({ description, assignedTo });
  res.status(201).json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
};
