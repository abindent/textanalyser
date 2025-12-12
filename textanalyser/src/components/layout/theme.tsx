'use client'

import { ReactNode } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'

interface ThemeProviderProps {
  children: ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  storageKey?: string
}

/**
 * Comprehensive theme provider that combines:
 * - next-themes for theme management (light/dark mode)
 * - Sonner toaster for toast notifications with theme support
 */
export default function ThemeProvider({
  children,
  defaultTheme = 'system',
  enableSystem = true,
  storageKey = 'theme',
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={"class"}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      storageKey={storageKey}
      themes={['light', 'dark', 'system']}
      forcedTheme={undefined}
      disableTransitionOnChange={false}
    >
      {children}
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand
        gap={12}
        visibleToasts={5}
      />
    </NextThemesProvider>
  )
}
