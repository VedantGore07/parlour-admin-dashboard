'use client';
import AttendancePunchCard from '@/components/attendance/AttendancePunchCard';
import { useEffect, useState } from 'react';
import API from '@/lib/api';

interface Employee {
  _id: string;
  name: string;
}

export default function AttendancePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await API.get('/employees'); // Make sure this endpoint exists in backend
      setEmployees(res.data);
    };
    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Attendance</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {employees.map(emp => (
          <AttendancePunchCard key={emp._id} employee={emp} />
        ))}
      </div>
    </div>
  );
}
