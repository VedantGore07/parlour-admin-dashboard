'use client';
import { useEffect, useState } from 'react';
import API from '@/lib/api';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import TaskForm from './TaskForm';
import { motion } from 'framer-motion';

interface Task {
  _id: string;
  description: string;
  assignedTo: { _id: string; name: string };
}

export default function TaskSection() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;

    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-white">📋 Tasks</h2>
        {user?.role === 'superadmin' && <TaskForm onTaskAdded={fetchTasks} />}
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-muted-foreground">No tasks assigned yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, index) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-[#1d1f25] border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-xl shadow hover:shadow-lg transition-all p-5"
            >
              <p className="text-base font-semibold">{task.description}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Assigned to: {task.assignedTo?.name || 'Unassigned'}
              </p>

              {user?.role === 'superadmin' && (
                <div className="mt-4 flex justify-end">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteTask(task._id)}
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
