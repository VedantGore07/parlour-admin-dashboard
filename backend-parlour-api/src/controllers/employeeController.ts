import { Request, Response } from 'express';
import Employee from '../models/Employee';

export const getEmployees = async (_req: Request, res: Response) => {
  const employees = await Employee.find();
  res.json(employees);
};

export const createEmployee = async (req: Request, res: Response) => {
  const { name, role } = req.body;
  const employee = new Employee({ name, role });
  await employee.save();
  res.status(201).json(employee);
};

export const deleteEmployee = async (req: Request, res: Response) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
