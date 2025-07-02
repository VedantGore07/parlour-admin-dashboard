import express from 'express';
import {
  getTasks,
  createTask,
  deleteTask,
} from '../controllers/taskController';
import {
  verifyToken,
  requireSuperAdmin,
} from '../middleware/authMiddleware';

const router = express.Router();

// Accessible by all authenticated users (Super Admin & Admin)
router.get('/', verifyToken, getTasks);

// Only Super Admin can create or delete tasks
router.post('/', verifyToken, requireSuperAdmin, createTask);
router.delete('/:id', verifyToken, requireSuperAdmin, deleteTask);

export default router;
