'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        disabled 
        className="relative h-10 w-10 rounded-full"
      />
    )
  }

  // Determine the actual theme being displayed
  const currentTheme = theme === 'system' ? systemTheme : theme

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="h-5 w-5 text-sky-600 dark:text-sky-400 rotate-0 transition-all duration-500 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
    } else if (currentTheme === 'dark') {
      return <Moon className="h-5 w-5 text-indigo-400 rotate-0 transition-all duration-500 group-hover:-rotate-12 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(165,180,252,0.5)]" />
    } else {
      return <Sun className="h-5 w-5 text-amber-500 rotate-0 transition-all duration-500 group-hover:rotate-180 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
    }
  }

  const getTitle = () => {
    if (theme === 'system') {
      return `System mode (currently ${systemTheme})`
    }
    return `Current theme: ${theme}`
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          title={getTitle()}
          className="relative h-10 w-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-all duration-300 group overflow-hidden"
        >
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-linear-to-br from-sky-400 to-blue-500 dark:from-indigo-500 dark:to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
          
          {/* Icon container with animation */}
          <div className="relative">
            {getIcon()}
          </div>
          
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1"
      >
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
            theme === 'light' 
              ? 'bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 text-amber-700 dark:text-amber-400' 
              : 'hover:bg-slate-100 dark:hover:bg-slate-800/70'
          }`}
        >
          <Sun className="h-4 w-4" />
          <span className="font-medium">Light</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
            theme === 'dark' 
              ? 'bg-linear-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 text-indigo-700 dark:text-indigo-400' 
              : 'hover:bg-slate-100 dark:hover:bg-slate-800/70'
          }`}
        >
          <Moon className="h-4 w-4" />
          <span className="font-medium">Dark</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
            theme === 'system' 
              ? 'bg-linear-to-r from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/30 text-sky-700 dark:text-sky-400' 
              : 'hover:bg-slate-100 dark:hover:bg-slate-800/70'
          }`}
        >
          <Monitor className="h-4 w-4" />
          <span className="font-medium">System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}