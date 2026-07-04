import React from 'react';
import { Card } from '../../components/ui/Card';

export const Dashboard = () => {
  return (
    <div className="flex flex-col h-full space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your HR workspace.</p>
      </div>
      <Card className="flex-1 flex items-center justify-center">
         <p className="text-gray-500 font-medium">Please navigate to the Employees tab to manage your talent directory.</p>
      </Card>
    </div>
  );
};
