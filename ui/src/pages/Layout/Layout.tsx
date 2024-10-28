import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <SidebarTrigger />

        <Outlet />
      </main>
    </SidebarProvider>
  );
}
