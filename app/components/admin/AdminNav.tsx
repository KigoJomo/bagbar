'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminNav() {
  const pathname = usePathname()
  
  const navItems = [
    // { href: '/admin', label: 'Dashboard' },
    { href: '/admin/products/', label: 'Products' },
    { href: '/admin/orders', label: 'Orders' }
  ]

  return (
    <nav className="admin-nav sticky top-0 flex items-center gap-6 border-b border-foreground-faded">
      <p className='px-4 py-1 bg-accent text-background italic rounded-full'>admin</p>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-2 ${
            pathname.includes(item.href) || item.href.includes(pathname)
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