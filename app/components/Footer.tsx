'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Twitter, ArrowUp, Moon, Sun } from 'lucide-react';
import { Input } from './Input';
import CtaButton from './CtaButton';
import { useTheme } from '@/context/theme-context';
import { usePathname } from 'next/navigation';

const Footer: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const pathname = usePathname();
  const hideFooter = pathname.match(/^\/(?:auth|admin)/);

  return (
    <footer className={`${hideFooter ? 'hidden' : 'border-t border-foreground-faded px-4 py-6 md:px-6 md:py-12'}`}>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-4">
          <Link href="/">
            <Image
              src={`/images/logo${theme === 'light' ? '-dark' : ''}.webp`}
              alt="Bag Bar Logo"
              width={120}
              height={60}
              className="object-contain hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <p className="text-foreground-light text-sm">
            Crafting timeless bags for modern life
          </p>
        </div>

        {/* Shop Column */}
        <div className="space-y-4">
          <h3 className="uppercase text-sm font-medium">Shop</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/products"
                className="text-foreground-light hover:text-foreground transition-colors">
                All Products
              </Link>
            </li>
            <li>
              <Link
                href="/checkout"
                className="text-foreground-light hover:text-foreground transition-colors">
                Cart
              </Link>
            </li>
            <li>
              <Link
                href="/favorites"
                className="text-foreground-light hover:text-foreground transition-colors">
                Favorites
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Column */}
        <div className="space-y-4">
          <h3 className="uppercase text-sm font-medium">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/contact"
                className="text-foreground-light hover:text-foreground transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/shipping"
                className="text-foreground-light hover:text-foreground transition-colors">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link
                href="/returns"
                className="text-foreground-light hover:text-foreground transition-colors">
                Returns & Exchanges
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-4">
          <h3 className="uppercase text-sm font-medium">Stay Updated</h3>
          <form className="flex flex-col gap-2">
            <Input
              type="email"
              required
              placeholder="Enter your email"
              className=""
            />
            <CtaButton label="Subscribe" type="submit" hideIcon />
          </form>
          <div className="flex gap-4 pt-4">
            <Link
              href="#"
              className="text-foreground-light hover:text-foreground">
              <Instagram size={20} />
            </Link>
            <Link
              href="#"
              className="text-foreground-light hover:text-foreground">
              <Twitter size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto mt-12 pt-8 border-t border-foreground-faded flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-6">
          <Link
            href="/terms-of-service"
            className="text-sm text-foreground-light hover:text-foreground">
            Terms of Service
          </Link>
          <Link
            href="/privacy-policy"
            className="text-sm text-foreground-light hover:text-foreground">
            Privacy Policy
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 text-foreground-light hover:text-foreground transition-colors">
            {theme === 'dark' ? (
              <>
                <Sun size={16} />
                <span className="text-sm">Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={16} />
                <span className="text-sm">Dark Mode</span>
              </>
            )}
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-foreground-light hover:text-foreground transition-colors">
            <ArrowUp size={16} />
            <span className="text-sm">Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
