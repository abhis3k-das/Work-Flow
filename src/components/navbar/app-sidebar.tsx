'use client';

import * as React from 'react';
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react';

import { NavMain } from '@/components/navbar/nav-main';
import { NavUser } from '@/components/navbar/nav-user';
import { WorkspaceSwitcher } from '@/components/navbar/workspace-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

import { SIDEBAR_ITEMS } from '@/lib/constants/menu';

/* 
  1. When authentication is Added then get the name and email and upate the user.
  2. Get all the workspaces and update it here.
*/
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '', // "/avatars/shadcn.jpg",
  },
  workspaces: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Workspace Switcher */}
      <SidebarHeader>
        <WorkspaceSwitcher teams={data.workspaces} />
      </SidebarHeader>

      {/* Sidebar Mainmenu */}
      <SidebarContent>
        <NavMain items={SIDEBAR_ITEMS} />
      </SidebarContent>

      {/* Sidebar bottom Section */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
