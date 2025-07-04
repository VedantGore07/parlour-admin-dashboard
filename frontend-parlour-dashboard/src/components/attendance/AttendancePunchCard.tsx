'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import socket from '@/lib/socket';

interface Props {
  employee: {
    _id: string;
    name: string;
  };
}

export default function AttendancePunchCard({ employee }: Props) {
  const [punchedIn, setPunchedIn] = useState(false);

  const handlePunch = () => {
    const action = punchedIn ? 'punch-out' : 'punch-in';
    socket.emit('attendance-punch', {
      employeeId: employee._id,
      name: employee.name,
      action,
      timestamp: new Date(),
    });
    setPunchedIn(!punchedIn);
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full">
      <p className="font-medium mb-2">{employee.name}</p>
      <Button onClick={handlePunch} variant={punchedIn ? 'destructive' : 'default'}>
        {punchedIn ? 'Punch Out' : 'Punch In'}
      </Button>
    </div>
  );
}
