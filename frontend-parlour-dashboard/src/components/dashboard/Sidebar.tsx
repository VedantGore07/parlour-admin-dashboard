'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Users, ClipboardList, Clock } from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const items = [
    { label: 'Overview', icon: Home, value: 'overview' },
    { label: 'Employees', icon: Users, value: 'employees' },
    { label: 'Tasks', icon: ClipboardList, value: 'tasks' },
    { label: 'Attendance', icon: Clock, value: 'attendance' },
  ];

  const handleTabChange = (value: string) => {
    // this will update the URL hash (like #tasks) and scroll to that section
    document?.getElementById(value)?.scrollIntoView({ behavior: 'smooth' });
    history.pushState(null, '', `#${value}`);
  };

  return (
    <aside className="w-[220px] hidden md:flex flex-col gap-4 border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
      <h1 className="text-xl font-bold text-center">Parlour</h1>
      <nav className="flex flex-col gap-2">
        {items.map(({ label, icon: Icon, value }) => (
          <button
            key={value}
            onClick={() => handleTabChange(value)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 transition ${
              pathname.includes(value) && 'bg-zinc-100 dark:bg-zinc-800'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
