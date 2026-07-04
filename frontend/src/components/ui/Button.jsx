import React from 'react';
import { cn } from '../../utils/cn';

export const Button = ({ className, variant = 'primary', size = 'default', children, ...props }) => {
  const variants = {
    primary: 'bg-primary-DEFAULT text-white hover:bg-primary-hover',
    secondary: 'bg-white text-text-main border border-gray-200 hover:bg-gray-50',
    ghost: 'bg-transparent text-text-main hover:bg-primary-light hover:text-primary-DEFAULT',
    danger: 'bg-danger text-white hover:bg-red-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    default: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
