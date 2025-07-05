'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import API from '@/lib/api';
import EmployeeForm from './EmployeeForm';
import { motion } from 'framer-motion';

interface Employee {
  _id: string;
  name: string;
  role: string;
}

export default function EmployeeSection() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await API.get('/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id: string) => {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    await API.delete(`/employees/${id}`);
    fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">👤 Employee List</h2>
        {user?.role === 'superadmin' && <EmployeeForm onEmployeeAdded={fetchEmployees} />}
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : employees.length === 0 ? (
        <p className="text-muted-foreground">No employees found.</p>
      ) : (
        <div className="overflow-auto rounded-lg shadow border border-zinc-700">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-zinc-800 text-white uppercase">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, i) => (
                <motion.tr
                  key={emp._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-zinc-700 hover:bg-zinc-800"
                >
                  <td className="px-4 py-3 font-mono">{i + 1}</td>
                  <td className="px-4 py-3">{emp.name}</td>
                  <td className="px-4 py-3">{emp.role}</td>
                  <td className="px-4 py-3 text-right">
                    {user?.role === 'superadmin' && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteEmployee(emp._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
