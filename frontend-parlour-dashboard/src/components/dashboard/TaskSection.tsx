'use client';
import { useEffect, useState } from 'react';
import API from '@/lib/api';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import TaskForm from './TaskForm';

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tasks</h2>
        {user?.role === 'superadmin' && <TaskForm onTaskAdded={fetchTasks} />}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500">No tasks assigned yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <p className="font-medium text-base">{task.description}</p>
              <p className="text-sm text-gray-600 mt-1">
                Assigned to: {task.assignedTo?.name || 'Unassigned'}
              </p>

              {user?.role === 'superadmin' && (
                <div className="mt-3">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
