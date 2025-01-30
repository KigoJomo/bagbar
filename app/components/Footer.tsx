'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-foreground-faded px-4 py-6 md:px-6 md:py-12">
      <div className="w-full flex flex-col md:flex-row md:justify-between gap-4">
      <Link href="/" className="">
            <Image
              src="/images/logo.webp"
              alt="Cordova Logo"
              width={100}
              height={50}
              className="object-contain md:hover:scale-105 transition-all duration-300"
            />
          </Link>
      </div>

      <div className="w-full flex flex-col md:flex-row-reverse md:justify-between gap-4 mt-8 md:mt-16">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <Link href={'/terms-of-service'} className='w-fit'>Terms of Service</Link>
          <Link href={'/privacy-policy'} className='w-fit'>Privacy Policy</Link>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="capitalize w-fit mt-6 cursor-pointer">
          back to top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
