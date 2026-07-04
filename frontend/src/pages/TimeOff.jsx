import React from 'react';
import { Card } from '../components/ui/Card';

export const TimeOff = () => {
  return (
    <div className="flex flex-col h-full space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Time Off</h1>
        <p className="text-gray-500 mt-1">Manage your leave requests and balances.</p>
      </div>
      <Card className="flex-1 flex items-center justify-center">
         <p className="text-gray-500 font-medium">Time Off calendar module coming soon.</p>
      </Card>
    </div>
  );
};
