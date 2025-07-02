import { Request, Response } from 'express';
import Attendance from '../models/Attendance';

export const getAttendanceLogs = async (_req: Request, res: Response) => {
  const logs = await Attendance.find()
    .populate('employee', 'name')
    .sort({ timestamp: -1 });
  res.json(logs);
};
