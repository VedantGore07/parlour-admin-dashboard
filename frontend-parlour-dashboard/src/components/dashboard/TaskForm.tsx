'use client';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import API from '@/lib/api';

interface Props {
  onTaskAdded: () => void;
}

export default function TaskForm({ onTaskAdded }: Props) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [employees, setEmployees] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await API.get('/employees');
      setEmployees(res.data);
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await API.post('/tasks', { description, assignedTo });
    onTaskAdded();
    setOpen(false);
    setDescription('');
    setAssignedTo('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">➕ Add Task</Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 text-white border border-zinc-700">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-semibold">New Task</h2>
          <Input
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-zinc-800 text-white border-zinc-600"
            required
          />
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full bg-zinc-800 text-white border border-zinc-600 rounded px-3 py-2"
            required
          >
            <option value="">Select employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
          <Button type="submit" className="w-full">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
