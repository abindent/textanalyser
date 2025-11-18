'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Settings,
  Users,
  FileText,
  BarChart3,
  ChevronDown,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

const menuItems = [
  {
    title: 'Dashboard',
    icon: Home,
    href: '/dashboard',
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    href: '/analytics',
  },
  {
    title: 'Documents',
    icon: FileText,
    submenu: [
      { title: 'All', href: '/documents' },
      { title: 'Recent', href: '/documents/recent' },
      { title: 'Archived', href: '/documents/archived' },
    ],
  },
  {
    title: 'Users',
    icon: Users,
    href: '/users',
  },
  {
    title: 'Settings',
    icon: Settings,
    submenu: [
      { title: 'Profile', href: '/settings/profile' },
      { title: 'Account', href: '/settings/account' },
      { title: 'Preferences', href: '/settings/preferences' },
    ],
  },
]

export default function SidebarNav() {
  const pathname = usePathname()
  const { open } = useSidebar()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  const toggleExpand = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="h-8 w-8 rounded-lg bg-sky-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">TA</span>
          </div>
          {open && <span className="font-semibold text-sm">TextAnalyser</span>}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.submenu ? (
                <Collapsible
                  open={expanded[item.title]}
                  onOpenChange={() => toggleExpand(item.title)}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          {open && <span>{item.title}</span>}
                        </div>
                        {open && (
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              expanded[item.title] ? 'rotate-180' : ''
                            }`}
                          />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {open && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.submenu.map((subitem) => (
                            <SidebarMenuSubItem key={subitem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActive(subitem.href)}
                              >
                                <Link href={subitem.href}>
                                  {subitem.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href || '#')}
                  >
                    <Link href={item.href || '#'}>
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </div>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
