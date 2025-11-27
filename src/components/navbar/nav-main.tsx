"use client"

import { ChevronRight  } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { MenuType } from "@/lib/constants/menu"
import Link from "next/link"
import { useState } from "react"


export function NavMain({ items }: { items: MenuType[] }) {

  const [parent , setParent] = useState("");
  const [child , setChild] = useState("");

  const makeActive = (subItemUrl : string , itemUrl : string) =>{
    setParent(itemUrl)
    setChild(subItemUrl)
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item:MenuType) => {
          return item.isCollaspible ? (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={false}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild >
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild isActive={child == subItem.url} onClick={()=>makeActive(subItem.url , item.url)}>
                        <Link href={subItem.url}>
                          {subItem.title}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
          ) : (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={parent === item.url} onClick={()=>makeActive("",item.url)}>
              <Link href={item.url}>
                {item.icon && <item.icon />}
                {item.title}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          )}
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
