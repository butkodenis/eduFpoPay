import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  CreditCard,
  HomeIcon,
  InboxIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
  },
  {
    title: 'Студенти',
    url: '/about',
    icon: Inbox,
  },
  {
    title: 'Юр. лица',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Договоры',
    url: '#',
    icon: Search,
  },
  {
    title: 'Баланс',
    url: '#',
    icon: Settings,
  },
  {
    title: 'Плетежи',
    url: '#',
    icon: CreditCard,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="Dashboard">
                <SidebarMenuButton asChild>
                  <Link to="/">
                    <HomeIcon />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link to="/students">
                    <InboxIcon />
                    <span>Студенти</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
