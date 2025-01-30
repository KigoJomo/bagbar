import type { NextPage } from 'next';
import Image from 'next/image';

interface AuthPageProps {
  children: React.ReactNode;
  className?: string;
}

const AuthPage: NextPage<AuthPageProps> = ({ children, className }) => {
  return (
    <section
      className={`flex items-center justify-between h-screen py-0 relative ${className}`}>
      <div className="w-full h-full md:w-1/2 absolute z-[1] md:static bg-[url('/images/hero-1.webp')] bg-cover bg-center"></div>

      <div className="w-full md:w-1/2 h-full z-[2] px-4 md:px-12 bg-background-light md:bg-transparent flex flex-col items-center justify-center gap-8">
        <Image
          src="/images/logo.webp"
          alt="Bag Bar Logo"
          width={200}
          height={200}
        />
        <div className="w-full h-[1px] bg-foreground-faded"></div>
        {children}
      </div>
    </section>
  );
};

export default AuthPage;
