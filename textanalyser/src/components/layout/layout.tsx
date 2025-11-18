'use client'

import React, { ReactNode } from 'react'
import ThemeProvider from './theme'
import Navbar from './navbar'
import Footer from './footer'
import SidebarNav from './sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

interface LayoutProps {
  children: ReactNode
  withSidebar?: boolean
}

/**
 * Comprehensive main layout component that provides:
 * - ThemeProvider with next-themes and Sonner toaster
 * - Responsive navbar with theme toggle and navigation
 * - Sidebar with collapsible menu items
 * - Page content area
 * - Footer with links
 * - Full dark mode support
 * 
 * By default, all components are enabled and wrapped with theme provider
 */
export default function Layout({
  children, withSidebar
}: LayoutProps) {
  const layoutContent = (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        {/* Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          {withSidebar && <SidebarNav />}

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            <div className="w-full">{children}</div>
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </SidebarProvider>
  )

  return <ThemeProvider>{layoutContent}</ThemeProvider>

}
