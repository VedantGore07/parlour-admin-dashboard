'use client';
import { useEffect, useState } from 'react';
import API from '@/lib/api';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
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
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this employee?'
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-primary">👥 Employees</h2>
        {user?.role === 'superadmin' && (
          <EmployeeForm onEmployeeAdded={fetchEmployees} />
        )}
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading employees...</p>
      ) : employees.length === 0 ? (
        <p className="text-muted-foreground">No employees found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((emp, index) => (
            <motion.div
              key={emp._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl shadow hover:shadow-md transition-all p-5"
            >
              <div className="flex flex-col space-y-1">
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">{emp.name}</h3>
                <p className="text-sm text-muted-foreground">{emp.role}</p>
              </div>
              {user?.role === 'superadmin' && (
                <div className="mt-4 flex justify-end">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteEmployee(emp._id)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
