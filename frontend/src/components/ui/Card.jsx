import React from 'react';
import { cn } from '../../utils/cn';

export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "bg-surface rounded-2xl border border-gray-100 shadow-card overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
