'use client';
import { useEffect, useState } from 'react';
import socket from '@/lib/socket';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface AttendanceData {
  employeeId: string;
  name: string;
  action: 'punch-in' | 'punch-out';
  timestamp: string;
}

export default function AttendanceSection() {
  const [logs, setLogs] = useState<AttendanceData[]>([]);

  // WebSocket: Listen for real-time attendance updates
  useEffect(() => {
    socket.on('attendance-update', (data: AttendanceData) => {
      setLogs((prev) => [data, ...prev]);
    });

    // Clean up socket listeners on unmount
    return () => {
      socket.off('attendance-update');
    };
  }, []);

  // PDF Export
  const exportPDF = () => {
    const doc = new jsPDF();
    const headers = [['Name', 'Action', 'Time']];
    const data = logs.map((log) => [
      log.name,
      log.action === 'punch-in' ? 'Punch In' : 'Punch Out',
      new Date(log.timestamp).toLocaleString(),
    ]);

    autoTable(doc, {
      head: headers,
      body: data,
      margin: { top: 20 },
    });

    doc.save('attendance_report.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Live Attendance Log</h2>
        <Button onClick={exportPDF}>Export PDF</Button>
      </div>

      {logs.length === 0 ? (
        <p className="text-gray-500">No attendance activity yet.</p>
      ) : (
        <ul className="space-y-3">
          {logs.map((log, idx) => (
            <li
              key={idx}
              className={`p-4 rounded-lg shadow-md transition ${
                log.action === 'punch-in' ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <div className="font-medium">
                {log.name}{' '}
                <span className="text-sm font-normal text-gray-700">
                  {log.action === 'punch-in' ? 'punched in' : 'punched out'} at{' '}
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



