'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import API from '@/lib/api';

interface Props {
  onEmployeeAdded: () => void;
}

export default function EmployeeForm({ onEmployeeAdded }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await API.post('/employees', { name, role });
    onEmployeeAdded(); // Refresh list
    setOpen(false);    // Close modal
    setName('');
    setRole('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">➕ Add Employee</Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border border-zinc-700 text-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-semibold">New Employee</h2>
          <Input
            placeholder="Name"
            value={name}
            className="bg-zinc-800 border-zinc-600 text-white"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            placeholder="Role"
            value={role}
            className="bg-zinc-800 border-zinc-600 text-white"
            onChange={(e) => setRole(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
