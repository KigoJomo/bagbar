'use client';

import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import SideMenu from './SideMenu';
import Link from 'next/link';
import Image from 'next/image';
import CartView from './CartView';
import FavsView from './FavsView';
import MenuButton from './MenuButton';
import { AlignLeft, Heart, ShoppingCart } from 'lucide-react';
import { useTheme } from '@/context/theme-context';
import { useShop } from '@/context/ShopContext';
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
  const { theme } = useTheme();

  const pathname = usePathname();
  const hideHeader = pathname.match('auth');

  const { isLoggedIn } = useAuth();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [favsOpen, setFavsOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  const { cart } = useShop();

  const { favorites } = useShop();

  const pages = [
    { name: 'about us', href: '/about' },
    { name: 'collection', href: '/products' },
    { name: 'my account', href: isLoggedIn ? '/account' : '/auth/login' },
  ];

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

          <Link href="/" className="">
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
            count={cart.reduce((sum, item) => sum + item.quantity, 0)}
          />

          <Link
            href={isLoggedIn ? '/account' : '/auth/login'}
            className="hidden md:flex uppercase text-sm border-b-2 border-transparent hover:border-foreground transition-all duration-500">
            {isLoggedIn ? 'account' : 'login'}
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <SideMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        position="left">
        <Link href="/" className="">
          <Image
            src={
              theme === 'dark' ? '/images/logo.webp' : '/images/logo-dark.webp'
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
      </SideMenu>

      {/* Favorites Side Menu */}
      <SideMenu
        isOpen={favsOpen}
        onClose={() => setFavsOpen(false)}
        position="right">
        <FavsView />
      </SideMenu>

      {/* Cart Side Menu */}
      <SideMenu
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        position="right">
        <CartView />
      </SideMenu>
    </header>
  );
};

export default Header;
