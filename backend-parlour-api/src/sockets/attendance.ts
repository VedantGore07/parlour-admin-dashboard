import { Server } from 'socket.io';
import Attendance from '../models/Attendance';

export const setupAttendanceSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('🟢 Socket connected:', socket.id);

    // Handle punch in/out event
    socket.on('attendance-punch', async (data) => {
      try {
        const { employeeId, action, timestamp } = data;

        // Save attendance to MongoDB
        const attendanceEntry = await Attendance.create({
          employeeId,
          action,
          timestamp,
        });

        // Emit to all dashboard clients
        io.emit('attendance-update', {
          employeeId,
          name: data.name, // optionally attach name from frontend
          action,
          timestamp,
        });

        console.log('✅ Attendance saved:', attendanceEntry);
      } catch (error) {
        console.error('❌ Error saving attendance:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('🔴 Socket disconnected:', socket.id);
    });
  });
};
