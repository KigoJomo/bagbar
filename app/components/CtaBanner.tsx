import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface CtaBannerProps {
  text: string;
  link: string;
  className?: string;
}

const CtaBanner: FC<CtaBannerProps> = ({ text, link, className }) => (
  <Link
    href={link}
    className={`bg-accent hover:opacity-95 px-6 py-4 flex items-center justify-center gap-4 md:hover:gap-8 transition-all duration-300 ${className}`}>
    <p className="text-background text-xl">{text}</p>
    <MoveRight className='stroke-background' />
  </Link>
);

export default CtaBanner;
