import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Users, IndianRupee, Clock, TrendingUp, Activity } from 'lucide-react';
import api from '../../utils/axios';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalSalary: 0,
    activeEmployees: 0,
    averageCheckIn: '--:--'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard/stats');
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-DEFAULT"></div>
      </div>
    );
  }

  // Calculate some trend percentages for visual aesthetics (can be wired to real data later)
  const activePercentage = stats.totalEmployees > 0 
    ? Math.round((stats.activeEmployees / stats.totalEmployees) * 100) 
    : 0;

  return (
    <div className="flex flex-col h-full space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Real-time overview of your HR workspace.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Salary Card */}
        <Card className="p-6 relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none shadow-xl">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wider">Total Monthly Salary</p>
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                <IndianRupee size={20} className="text-white" />
              </div>
            </div>
            <div>
              <p className="text-4xl font-bold mb-1">
                ₹{stats.totalSalary.toLocaleString('en-IN')}
              </p>
              <p className="text-sm font-medium text-white/70 flex items-center gap-1">
                <TrendingUp size={14} /> View detailed payroll
              </p>
            </div>
          </div>
          {/* Decorative Background */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </Card>

        {/* Total Employees Card */}
        <Card className="p-6 flex flex-col justify-between hover:border-primary-light transition-colors">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Workforce</p>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Users size={20} />
            </div>
          </div>
          <div>
            <p className="text-4xl font-bold text-gray-900 mb-1">{stats.totalEmployees}</p>
            <p className="text-sm font-medium text-gray-500">Across all departments</p>
          </div>
        </Card>

        {/* Active Employees Card */}
        <Card className="p-6 flex flex-col justify-between hover:border-green-200 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Active Status</p>
            <div className="p-2 bg-green-50 rounded-lg text-green-600">
              <Activity size={20} />
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-4xl font-bold text-gray-900 mb-1">{stats.activeEmployees}</p>
              <p className="text-sm font-medium text-success">Currently active</p>
            </div>
            {/* Visual indicator */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-gray-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-success" strokeWidth="4" strokeDasharray={`${activePercentage}, 100`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="absolute text-[10px] font-bold text-gray-700">{activePercentage}%</span>
            </div>
          </div>
        </Card>

        {/* Avg Check-In Card */}
        <Card className="p-6 flex flex-col justify-between hover:border-orange-200 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Avg Check-In Time</p>
            <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
              <Clock size={20} />
            </div>
          </div>
          <div>
            <p className="text-4xl font-bold text-gray-900 mb-1">{stats.averageCheckIn}</p>
            <p className="text-sm font-medium text-gray-500">Based on today's logs</p>
          </div>
        </Card>

      </div>
      
      {/* Trends Graph Placeholder Area */}
      <Card className="flex-1 flex flex-col min-h-[300px]">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Workforce Trends</h3>
        </div>
        <div className="flex-1 flex items-center justify-center bg-gray-50/50">
          <div className="text-center text-gray-400">
            <TrendingUp size={48} className="mx-auto mb-3 opacity-20" />
            <p>Historical trends and charts will populate here</p>
            <p className="text-sm">once more attendance data is collected.</p>
          </div>
        </div>
      </Card>

    </div>
  );
};
