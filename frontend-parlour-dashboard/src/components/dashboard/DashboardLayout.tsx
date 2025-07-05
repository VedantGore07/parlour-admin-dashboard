'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Sidebar from './Sidebar';
import EmployeeSection from './EmployeeSection';
import TaskSection from './TaskSection';
import AttendanceSection from './AttendanceSection';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-[#f7f9fb] dark:bg-[#101417] text-zinc-800 dark:text-zinc-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {user?.role === 'superadmin' ? 'Super Admin' : 'Admin'}
        </h1>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl shadow-md text-center">
                <h2 className="text-sm text-muted-foreground">Total Employees</h2>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl shadow-md text-center">
                <h2 className="text-sm text-muted-foreground">On Leave</h2>
                <p className="text-2xl font-bold">4</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl shadow-md text-center">
                <h2 className="text-sm text-muted-foreground">Pending Tasks</h2>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl shadow-md text-center">
                <h2 className="text-sm text-muted-foreground">Today's Punches</h2>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="employees">
            <EmployeeSection />
          </TabsContent>
          <TabsContent value="tasks">
            <TaskSection />
          </TabsContent>
          <TabsContent value="attendance">
            <AttendanceSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
