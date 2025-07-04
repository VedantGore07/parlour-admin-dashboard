'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';

interface Employee {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export default function EmployeeDashboardPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [newEmp, setNewEmp] = useState({ name: '', email: '', phone: '' });
  const [role, setRole] = useState<'admin' | 'superadmin'>('admin');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setRole(parsed.role);
    }

    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/employees', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(res.data);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/employees', newEmp, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewEmp({ name: '', email: '', phone: '' });
      fetchEmployees();
    } catch (err) {
      console.error('Failed to add employee:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure to delete this employee?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEmployees();
    } catch (err) {
      console.error('Failed to delete employee:', err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold">Employees</h2>

      {role === 'superadmin' && (
        <div className="space-y-4">
          <h3 className="font-semibold">Add New Employee</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              className="border p-2 rounded"
              placeholder="Name"
              value={newEmp.name}
              onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
            />
            <input
              className="border p-2 rounded"
              placeholder="Email"
              value={newEmp.email}
              onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
            />
            <input
              className="border p-2 rounded"
              placeholder="Phone"
              value={newEmp.phone}
              onChange={(e) => setNewEmp({ ...newEmp, phone: e.target.value })}
            />
          </div>
          <Button onClick={handleCreate}>Add Employee</Button>
        </div>
      )}

      <div className="overflow-x-auto mt-6">
        {loading ? (
          <p>Loading employees...</p>
        ) : (
          <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-zinc-800">
              <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Phone</th>
                {role === 'superadmin' && <th className="px-4 py-2">Action</th>}
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id} className="border-t dark:border-zinc-700">
                  <td className="px-4 py-2">{emp.name}</td>
                  <td className="px-4 py-2">{emp.email}</td>
                  <td className="px-4 py-2">{emp.phone}</td>
                  {role === 'superadmin' && (
                    <td className="px-4 py-2">
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(emp._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
