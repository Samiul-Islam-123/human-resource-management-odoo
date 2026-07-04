import React from 'react';
import { Card } from '../../components/ui/Card';
import { Settings as SettingsIcon } from 'lucide-react';

export const Settings = () => {
  return (
    <div className="flex flex-col h-full space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Admin Settings</h1>
        <p className="text-gray-500 mt-1">Configure your HRMS platform.</p>
      </div>
      <Card className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 text-gray-400">
            <SettingsIcon size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
          <p className="text-gray-500 max-w-sm mx-auto">
            We are actively building the settings panel. Soon you'll be able to configure company policies, branding, and integrations here.
          </p>
          <div className="mt-8 flex gap-2 justify-center">
            <span className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></span>
            <span className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{ animationDelay: '0.4s' }}></span>
          </div>
        </div>
      </Card>
    </div>
  );
};
