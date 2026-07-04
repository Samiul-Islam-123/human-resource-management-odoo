import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarCheck, CalendarDays, FileText, Settings, LogOut, Users } from 'lucide-react';
import { cn } from '../utils/cn';

export const Sidebar = ({ role = 'employee' }) => {
  const employeeNav = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Attendance', path: '/attendance', icon: CalendarCheck },
    { name: 'Time Off', path: '/time-off', icon: CalendarDays },
    { name: 'Documents', path: '/documents', icon: FileText },
    { name: 'Profile', path: '/profile', icon: FileText, className: "mt-12 text-primary-DEFAULT bg-primary-light/50" }
  ];

  const adminNav = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Employees', path: '/admin/employees', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  const navItems = role === 'admin' ? adminNav : employeeNav;

  return (
    <aside className="w-64 border-r border-gray-200 bg-surface flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", role === 'admin' ? "bg-gray-900" : "bg-primary-DEFAULT")}>
          <LayoutDashboard size={18} className="text-white" />
        </div>
        <div>
          <h1 className="font-bold text-gray-900 leading-tight">
            {role === 'admin' ? 'Admin Portal' : 'Employee Portal'}
          </h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest">HRMS SYSTEM</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/' || item.path === '/admin/dashboard'}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
              item.className ? item.className : isActive 
                ? (role === 'admin' ? "bg-gray-100 text-gray-900" : "bg-primary-light text-primary-DEFAULT")
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <item.icon size={18} />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100 space-y-1">
        <button className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-danger hover:bg-red-50 transition-colors">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};
