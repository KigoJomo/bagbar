// components/CtaButton.tsx
'use client';

import { MoveRight } from 'lucide-react';
import { FC, ReactNode } from 'react';

interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
  label: ReactNode;
  className?: string;
  onClick?: () => void;
  hideIcon?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
}

const CtaButton: FC<CtaButtonProps> = ({
  secondary = false,
  label,
  className,
  onClick,
  hideIcon = false,
  icon,
  disabled = false,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-full px-4 py-2 flex items-center justify-center gap-2 md:hover:gap-4 border cursor-pointer ${
        secondary
          ? 'bg-transparent *:text-foreground'
          : 'bg-accent *:text-background'
      } transition-all duration-300 ${className}`}
      {...props}>
      {icon && <span className="flex items-center">{icon}</span>}
      <p className="capitalize text-nowrap">{label}</p>
      {!hideIcon && <MoveRight size={16} />}
    </button>
  );
};

export default CtaButton;
