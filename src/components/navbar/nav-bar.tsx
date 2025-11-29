import { AppSidebar } from '@/components/navbar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group';
import { AlarmClock, Bell, Search, UserCircle2Icon } from 'lucide-react';
import { ThemeToggle } from '../toggle-theme';

export default function NavBar({ children }: { children: React.ReactNode }) {
  const iconSize = 'h-5 w-5';
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <header className="flex h-16 w-full shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <div className="flex w-full items-center justify-between px-4">
              <div className="w-1/2">
                <InputGroup>
                  <InputGroupInput placeholder="Search for task/issues..." />
                  <InputGroupAddon>
                    <Search />
                  </InputGroupAddon>
                  {/* <InputGroupAddon align="inline-end">12 results</InputGroupAddon> */}
                </InputGroup>
              </div>

              <div className="flex gap-4">
                <AlarmClock className={iconSize} />
                <Bell className={iconSize} />
                <UserCircle2Icon className={iconSize} />
                <ThemeToggle iconSize={iconSize} />
              </div>
            </div>
          </div>
        </header>
        <div className="pad h-full w-full overflow-scroll">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
