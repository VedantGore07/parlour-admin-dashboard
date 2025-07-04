'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function DashboardHome() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    // Mocked for demo - replace with actual fetch from /api/auth/me
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-8 sm:p-16">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Welcome back{user?.name ? `, ${user.name}` : ''}!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            You are logged in as{' '}
            <span className="font-semibold capitalize">{user?.role}</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          <DashboardCard title="Employees" href="/dashboard/employees" emoji="👥" />
          <DashboardCard title="Tasks" href="/dashboard/tasks" emoji="📋" />
          <DashboardCard title="Attendance" href="/dashboard/attendance" emoji="🕒" />
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  title: string;
  href: string;
  emoji: string;
}

function DashboardCard({ title, href, emoji }: CardProps) {
  return (
    <Link
      href={href}
      className="rounded-2xl border bg-gray-50 dark:bg-zinc-900 p-6 flex flex-col justify-between shadow hover:shadow-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
    >
      <div className="text-4xl mb-4">{emoji}</div>
      <div className="text-xl font-semibold">{title}</div>
    </Link>
  );
}
