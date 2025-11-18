'use client'

import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Product: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Roadmap', href: '#' },
    ],
    Company: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
    Resources: [
      { label: 'Documentation', href: '#' },
      { label: 'API', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Support', href: '#' },
    ],
    Legal: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Cookies', href: '#' },
      { label: 'Contact', href: '/contact' },
    ],
  }

  return (
    <footer className="border-t bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm mb-4 text-slate-900 dark:text-slate-100">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-600 dark:text-slate-400">
            <p>&copy; {currentYear} TextAnalyser. All rights reserved.</p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
              <Link
                key={social}
                href={`#`}
                className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
