import React from 'react';
import { cn } from '../../utils/cn';

export const Badge = ({ className, status, children, dot = true, ...props }) => {
  const statusStyles = {
    'PRESENT': 'bg-green-50 text-success border border-green-100',
    'ON LEAVE': 'bg-purple-50 text-primary-DEFAULT border border-purple-100',
    'ABSENT': 'bg-orange-50 text-warning border border-orange-100',
    'Overtime': 'bg-orange-50 text-warning border border-orange-100',
    'On Time': 'bg-green-50 text-success border border-green-100',
    'Late': 'bg-red-50 text-danger border border-red-100',
    'Paid Leave': 'bg-blue-50 text-info border border-blue-100',
    'Active Employee': 'text-primary-DEFAULT',
  };

  const dotColors = {
    'PRESENT': 'bg-success',
    'ON LEAVE': 'bg-primary-DEFAULT',
    'ABSENT': 'bg-warning',
    'Overtime': 'bg-warning',
    'On Time': 'bg-success',
    'Late': 'bg-danger',
    'Paid Leave': 'bg-info',
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider",
        statusStyles[status] || 'bg-gray-100 text-gray-800',
        className
      )}
      {...props}
    >
      {dot && statusStyles[status] && dotColors[status] && (
        <span className={cn("w-1.5 h-1.5 rounded-full", dotColors[status])} />
      )}
      {children}
    </span>
  );
};
