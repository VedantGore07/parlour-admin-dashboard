import express from 'express';
import { getAttendanceLogs } from '../controllers/attendanceController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/',verifyToken, getAttendanceLogs);

export default router;
