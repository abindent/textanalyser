'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function Home() {
  const handleToast = () => {
    toast.success('Welcome to TextAnalyser!')
  }

  return (
    <div className="p-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
              Welcome to TextAnalyser
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Advanced text analysis and styling tool with a modern, responsive interface built with Next.js, Tailwind CSS, and shadcn/ui components.
            </p>
            <Button onClick={handleToast} className="mt-4">
              Show Notification
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Theme Support',
                description: 'Light and dark mode with next-themes',
              },
              {
                title: 'Toast Notifications',
                description: 'Rich notifications using Sonner',
              },
              {
                title: 'Responsive Design',
                description: 'Mobile-first design with Tailwind CSS',
              },
              {
                title: 'Radix UI Components',
                description: 'Accessible component primitives',
              },
              {
                title: 'Sidebar Navigation',
                description: 'Collapsible menu with nested items',
              },
              {
                title: 'Dark Mode',
                description: 'System-aware dark mode toggle',
              },
            ].map((feature) => (
              <Card
                key={feature.title}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-sky-50 dark:bg-sky-950 rounded-lg p-8 text-center space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Ready to get started?
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Check out the pages folder in components to create new page sections.
            </p>
            <Button size="lg">
              Explore More
            </Button>
          </div>
        </div>
      </div>
  )
}
