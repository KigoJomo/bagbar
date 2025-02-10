'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SideMenu from './SideMenu';
import Link from 'next/link';
import Image from 'next/image';
import CartView from './CartView';
import FavsView from './FavsView';
import MenuButton from './MenuButton';
import { AlignLeft, Heart, Moon, ShoppingCart, Sun } from 'lucide-react';
import { useTheme } from '@/context/theme-context';
import { useShop } from '@/context/ShopContext';
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const { cart } = useShop();
  const { favorites } = useShop();
  const { isLoggedIn } = useAuth();
  const role = useAuth().user?.role;

  const pathname = usePathname();
  const hideHeader = pathname.match(/^\/(?:auth|admin)/);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [favsOpen, setFavsOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  const pages = [
    { name: 'about us', href: '/about' },
    { name: 'collection', href: '/products' },
    { name: 'contact us', href: '/contact' },
    {
      name: isLoggedIn ? 'my account' : 'login',
      href: isLoggedIn ? '/account' : '/auth/login',
    },
    ...(role === 'admin' ? [{ name: 'admin', href: '/admin' }] : [])
  ];


  // handle esc key and back button
  useEffect(() => {
    // Handle ESC key
    const handleEscKey = (event: { key: string }) => {
      if (event.key === 'Escape') {
        console.log('ESC key pressed');
        if (menuOpen || favsOpen || cartOpen) {
          setMenuOpen(false);
          setFavsOpen(false);
          setCartOpen(false);
        }
      }
    };

    // Handle browser back button
    const handlePopState = () => {
      console.log('Back button pressed');
      if (menuOpen || favsOpen || cartOpen) {
        window.history.pushState(null, '', window.location.pathname);
        setMenuOpen(false);
        setFavsOpen(false);
        setCartOpen(false);
      } else {
        return;
      }
    };

    // Add event listeners
    window.addEventListener('keydown', handleEscKey);
    window.addEventListener('popstate', handlePopState);

    // Optionally push initial state to enable back button detection
    // window.history.pushState(null, '', window.location.pathname);

    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleEscKey);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [cartOpen, favsOpen, menuOpen]);

  return (
    <header
      className={`${
        hideHeader
          ? 'hidden'
          : 'sticky top-0 z-30 bg-background border-b border-foreground-faded'
      }`}>
      <div className="container mx-auto flex justify-between items-center py-2">
        <nav className="w-1/3 hidden md:flex items-center gap-8">
          {pages.slice(0, 2).map((page, index) => (
            <Link
              key={index}
              href={page.href}
              className={`uppercase text-sm border-b-2 ${
                pathname.match(page.href)
                  ? 'border-foreground'
                  : 'border-transparent'
              } hover:border-foreground transition-all duration-500`}>
              {page.name}
            </Link>
          ))}
        </nav>

        {/* Logo and MenuButton */}
        <div className="flex items-center gap-4 md:mx-auto">
          <button
            onClick={() => setMenuOpen(true)}
            className="focus:outline-none md:hidden">
            <AlignLeft />
          </button>

          <Link href="/" className="" onClick={() => setMenuOpen(false)}>
            <Image
              src={
                theme === 'dark'
                  ? '/images/logo.webp'
                  : '/images/logo-dark.webp'
              }
              alt="Cordova Logo"
              width={100}
              height={50}
              className="object-contain md:hover:scale-105 transition-all duration-300"
            />
          </Link>
        </div>

        {/* Favorites and Cart */}
        <div className="md:w-1/3 flex items-center md:justify-end gap-4 md:gap-8">
          <MenuButton
            onClick={() => setFavsOpen(true)}
            icon={<Heart className="md:hidden" />}
            label="favorites"
            count={favorites.length}
          />

          <MenuButton
            onClick={() => setCartOpen(true)}
            icon={<ShoppingCart className="md:hidden" />}
            label="cart"
            // count={cart.reduce((sum, item) => sum + item.quantity, 0)}
            count={cart.length}
          />

          <Link
            href={isLoggedIn ? '/account' : '/auth/login'}
            className="hidden md:flex uppercase text-sm border-b-2 border-transparent hover:border-foreground transition-all duration-500">
            {isLoggedIn ? 'account' : 'login'}
          </Link>

          {role === 'admin' && (
            <Link
              href={'/admin'}
              className="hidden md:flex uppercase text-sm border-b-2 border-transparent hover:border-foreground transition-all duration-500">
              admin
              </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <SideMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        position="left">
        <div className="w-full h-[90%] flex flex-col gap-2">
          <Link href="/" className="" onClick={() => setMenuOpen(false)}>
            <Image
              src={
                theme === 'dark'
                  ? '/images/logo.webp'
                  : '/images/logo-dark.webp'
              }
              alt="Cordova Logo"
              width={100}
              height={50}
              className="object-contain"
            />
          </Link>
          <hr className="my-4" />
          <ul className="w-full flex flex-col gap-6 ">
            {pages.map((page, index) => (
              <li key={index} className="w-full">
                <Link
                  href={page.href}
                  className={`w-full flex uppercase text-lg font-semibold transition-all duration-300 ${
                    pathname.match(page.href) ? 'opacity-100' : 'opacity-50'
                  }`}
                  onClick={() => setMenuOpen(false)}>
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
          {/* theme toggle */}
          <button
            onClick={toggleTheme}
            className="mt-auto flex items-center gap-2 text-foreground-light hover:text-foreground transition-colors">
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
        </div>
      </SideMenu>

      {/* Favorites Side Menu */}
      <SideMenu
        isOpen={favsOpen}
        onClose={() => setFavsOpen(false)}
        position="right">
        <FavsView onClose={() => setFavsOpen(false)} />
      </SideMenu>

      {/* Cart Side Menu */}
      <SideMenu
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        position="right">
        <CartView onClose={() => setCartOpen(false)} />
      </SideMenu>
    </header>
  );
};

export default Header;
