import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Search, Bell, HelpCircle } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { StatusButton } from '../components/StatusButton';
import { useAuth } from '../context/AuthContext';

export const AppLayout = ({ role = 'employee' }) => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Format page title based on path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/' || path === '/admin/dashboard') return 'Dashboard';
    if (path === '/employees' || path === '/admin/employees') return 'Employees';
    if (path === '/attendance') return 'Attendance Records';
    if (path === '/profile') return 'Profile Details';
    if (path === '/time-off') return 'Time Off';
    return 'Portal';
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role={role} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-surface border-b border-gray-100 flex items-center justify-between px-8 flex-shrink-0">
          <h2 className={`text-xl font-semibold ${role === 'admin' ? 'text-gray-900' : 'text-primary-DEFAULT'}`}>
            {getPageTitle()}
          </h2>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search records... (Cmd + K)"
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary-light focus:bg-white transition-all"
              />
            </div>
            
            <div className="flex items-center gap-4 text-gray-500">
              <button className="hover:text-gray-900 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-danger rounded-full border-2 border-white"></span>
              </button>
              <button className="hover:text-gray-900 transition-colors">
                <HelpCircle size={20} />
              </button>
            </div>

            <div className="h-8 w-px bg-gray-200"></div>

            <div className="flex items-center gap-3">
              <StatusButton role={role} />
              {user && (
                <div className="flex items-center gap-2">
                  <img src={user.profilePicture || 'https://ui-avatars.com/api/?name=' + (user.firstName || 'U')} alt="Avatar" className="w-9 h-9 rounded-full object-cover border border-gray-200" />
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto h-full">
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
