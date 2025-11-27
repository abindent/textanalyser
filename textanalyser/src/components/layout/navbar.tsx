'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, Sparkles, Home, UserRound, Rss, Phone, SquarePen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'About', icon: UserRound, href: '/about' },
  {
    label: 'Tools',
    href: '#',
    icon: SquarePen,
    submenu: [
      { label: 'Text Analyser', href: '/tools/analyser', description: 'Analyze and style text effectively' },
      { label: 'Text Styling', href: '/tools/styler', description: 'Customize text appearance with ease' },
    ],
  },
  { label: 'Blog', icon: Rss, href: '/blog' },
  { label: 'Contact', icon: Phone, href: 'https://github.com/abindent/textanalyser/issues/new?template=Blank+issue' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/40 bg-white/40 backdrop-blur-xl supports-backdrop-filter:bg-white/30 dark:border-slate-800/40 dark:bg-slate-950/40 shadow-sm dark:shadow-slate-900/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with gradient */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-all duration-300"
          >
            <div className="relative">
              <Sparkles className="h-6 w-6 text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors duration-300" />
              <div className="absolute inset-0 bg-sky-500 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-sky-600 via-blue-600 to-indigo-600 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent group-hover:from-sky-700 group-hover:via-blue-700 group-hover:to-indigo-700 dark:group-hover:from-sky-300 dark:group-hover:via-blue-300 dark:group-hover:to-indigo-300 transition-all duration-300">
              TextAnalyser
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-1">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.submenu ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/70 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800/70 transition-all duration-200">
                          <div className="flex items-center gap-2">
                            {item.icon && <item.icon className="h-4 w-4" />}
                            <span>{item.label}</span>
                          </div>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="w-[400px] p-3 space-y-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl">
                            {item.submenu.map((sub) => (
                              <li key={sub.label}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={sub.href}
                                    className="group block px-4 py-3 rounded-lg hover:bg-linear-to-r hover:from-sky-50 hover:to-blue-50 dark:hover:from-sky-950/30 dark:hover:to-blue-950/30 transition-all duration-200 border border-transparent hover:border-sky-200 dark:hover:border-sky-800/50"
                                  >
                                    <div className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors duration-200">
                                      {sub.label}
                                    </div>
                                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                      {sub.description}
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        href={item.href}
                        className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-all duration-200`}
                      >
                        <div className="flex items-center gap-2">
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span>{item.label}</span>
                        </div>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>


          </div>

          {/* Right side - Theme toggle and mobile menu */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors duration-200"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-8 mt-2">
                  <Sparkles className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  <span className="text-lg font-bold bg-linear-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
                    TextAnalyser
                  </span>
                </div>

                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <div key={item.label}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium hover:bg-linear-to-r hover:from-sky-50 hover:to-blue-50 dark:hover:from-sky-950/30 dark:hover:to-blue-950/30 transition-all duration-200 text-slate-700 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-400"
                        onClick={() => !item.submenu && setIsOpen(false)}
                      >
                        {item.icon && <item.icon className="h-5 w-5" />}
                        <span>{item.label}</span>
                      </Link>
                      {item.submenu && (
                        <div className="ml-3 mt-1 space-y-1 border-l-2 border-slate-200 dark:border-slate-800 pl-3">
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="block px-3 py-2.5 text-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-all duration-200 text-slate-600 dark:text-slate-400 hover:text-sky-700 dark:hover:text-sky-400"
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="font-medium">{sub.label}</div>
                              <div className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                                {sub.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}