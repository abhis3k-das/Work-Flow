import { Calendar, Headphones, Home, Inbox, Search, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenuSubItem,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible"
import { CollapsibleContent } from "@radix-ui/react-collapsible"

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    // {
    //     title: "Settings",
    //     url: "#",
    //     icon: Settings,
    // },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>

            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <Collapsible className="group/collapsible" key={`collapsible-${item.title}`}>
                                    <SidebarMenuItem key={item.title}>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton asChild>
                                                <Link href={item.url}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuButton asChild>
                                                        <Link href={item.url}>
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuSubItem>
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>

                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="py-12">
                <SidebarMenu>
                    <SidebarMenuItem key="Setting">
                        <SidebarMenuButton asChild>
                            <Link href={"#"}>
                                <Settings />
                                <span>Settings</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem key="Help">
                        <SidebarMenuButton asChild>
                            <Link href={"#"}>
                                <Headphones />
                                <span>Help & Support</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}