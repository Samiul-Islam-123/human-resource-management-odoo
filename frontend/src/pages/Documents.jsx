import React from 'react';
import { Card } from '../components/ui/Card';
import { FileText } from 'lucide-react';

export const Documents = () => {
  return (
    <div className="flex flex-col h-full space-y-6">
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Company Documents</p>
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Documents</h1>
      </div>
      
      <Card className="flex-1 flex flex-col items-center justify-center border-none shadow-sm min-h-[500px]">
        <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-6">
          <FileText size={32} className="text-primary-DEFAULT" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
        <p className="text-gray-500 text-center max-w-md">
          The document management system is currently under construction. Check back later to access your payslips, contracts, and company policies.
        </p>
      </Card>
    </div>
  );
};
