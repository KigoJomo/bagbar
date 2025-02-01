'use client'
import React from 'react'
import { cn } from '@/lib/utils' // Assuming you have a utility for class merging

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  startIcon?: React.ReactNode
  containerClass?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, startIcon, className, containerClass, ...props }, ref) => {
    return (
      <div className={cn('w-full space-y-1', containerClass)}>
        {label && (
          <label className="block text-sm font-medium opacity-50">
            {label}
          </label>
        )}
        
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {startIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={cn(
              'w-full rounded-none border border-foreground-light outline-none px-4 py-2 bg-transparent transition-all duration-300',
              'focus:outline-none focus:border-accent',
              'disabled:cursor-not-allowed disabled:border-foreground-faded',
              startIcon ? 'pl-10' : 'pl-4',
              error
                ? 'border-red-500 focus:border-red-500 '
                : '',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          />
        </div>

        {error && (
          <p
            id={`${props.id}-error`}
            className="text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }