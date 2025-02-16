'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Moon, Sun, AlignLeft } from 'lucide-react';
import { useTheme } from '@/context/theme-context';
import SideMenu from '@/app/components/SideMenu';

export default function AdminNav() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/orders', label: 'Orders' },
    { href: '/admin/users', label: 'Users' },
  ];

  // Handle ESC key for menu close
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 bg-background border-b border-foreground-faded flex items-center justify-between py-4">
      {/* Logo and Mobile Menu Button */}
      <div className="w-full flex items-center gap-4">
        <button
          onClick={() => setMenuOpen(true)}
          className="focus:outline-none md:hidden">
          <AlignLeft size={24} />
        </button>

        <div className="w-full md:w-fit flex items-center md:justify-center justify-between gap-4">
          <Link href="/" className="w-fit h-fit flex-shrink-0">
            <Image
              src={
                theme === 'dark'
                  ? '/images/logo.webp'
                  : '/images/logo-dark.webp'
              }
              alt="Bag Bar Logo"
              width={100}
              height={50}
              className="object-contain md:hover:scale-105 transition-all duration-300"
            />
          </Link>

          <span className="px-3 py-1 bg-accent text-background text-xs font-medium uppercase rounded-full">
            Admin
          </span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`uppercase text-sm border-b-2 ${
              pathname.includes(item.href)
                ? 'border-accent'
                : 'border-transparent'
            } hover:border-accent/50 transition-all duration-300`}>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Theme Toggle */}
      <div className="ml-6 hidden md:flex items-center justify-end gap-4">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 text-foreground-light hover:text-foreground transition-colors">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <SideMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        position="left">
        <div className="w-full h-[90%] flex flex-col gap-4">
          {/* Logo */}
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Image
              src={
                theme === 'dark'
                  ? '/images/logo.webp'
                  : '/images/logo-dark.webp'
              }
              alt="Admin Logo"
              width={120}
              height={50}
              className="object-contain"
            />
          </Link>

          <hr className="my-2 border-foreground-faded" />

          {/* Navigation Links */}
          <div className="flex flex-col gap-4">
            <span className="px-3 py-1 bg-accent text-background text-sm text-center uppercase rounded-full">
              Admin Panel
            </span>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-lg uppercase ${
                  pathname.includes(item.href)
                    ? 'text-accent font-semibold'
                    : 'text-foreground hover:text-accent/80'
                } transition-colors`}
                onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}

            <hr className="my-2 border-foreground-faded" />

            {/* Store Front Link */}
            <Link
              href="/products"
              className="text-lg uppercase text-foreground hover:text-accent/80 transition-colors"
              onClick={() => setMenuOpen(false)}>
              View Store
            </Link>
          </div>

          {/* Theme Toggle */}
          <div className="mt-auto pt-4 border-t border-foreground-faded">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-2 text-foreground-light hover:text-foreground">
              {theme === 'dark' ? (
                <>
                  <Sun size={18} />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={18} />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </SideMenu>
    </header>
  );
}
