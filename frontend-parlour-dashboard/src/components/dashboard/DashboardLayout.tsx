'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmployeeSection from './EmployeeSection';
import TaskSection from './TaskSection';
import AttendanceSection from './AttendanceSection';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user?.role === 'superadmin' ? 'Super Admin' : 'Admin'}
      </h1>

      <Tabs defaultValue="employees" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

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
    </div>
  );
}
