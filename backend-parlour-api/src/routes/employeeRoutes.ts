import express from 'express';
import {
  getEmployees,
  createEmployee,
  deleteEmployee,
} from '../controllers/employeeController';
import {
  verifyToken,
  requireSuperAdmin,
} from '../middleware/authMiddleware';

const router = express.Router();

// Accessible by Super Admin and Admin (JWT protected)
router.get('/', verifyToken, getEmployees);

// Only Super Admin can create and delete employees
router.post('/', verifyToken, requireSuperAdmin, createEmployee);
router.delete('/:id', verifyToken, requireSuperAdmin, deleteEmployee);

export default router;
