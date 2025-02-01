'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminNav() {
  const pathname = usePathname()
  
  const navItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/products/add', label: 'Products' },
    { href: '/admin/orders', label: 'Orders' }
  ]

  return (
    <nav className="admin-nav flex gap-6 border-b border-foreground-faded">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-2 ${
            pathname === item.href 
              ? 'border-b-2 border-accent font-medium' 
              : 'text-foreground-light hover:text-foreground'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}