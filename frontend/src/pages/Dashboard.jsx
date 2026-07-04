import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Clock, Calendar as CalendarIcon, FileText, Gift, ChevronRight, Activity, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';

const DashboardSkeleton = () => (
  <div className="flex flex-col h-full space-y-6 animate-pulse">
    <div>
      <div className="h-8 bg-gray-200 rounded-md w-64 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded-md w-48"></div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="col-span-2 p-6 h-48 bg-gray-100/50"></Card>
      <Card className="p-6 h-48 bg-gray-100/50"></Card>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
      <Card className="col-span-2 p-6 bg-gray-100/50"></Card>
      <Card className="p-6 bg-gray-100/50"></Card>
    </div>
  </div>
);

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, annRes] = await Promise.all([
          api.get('/dashboard/employee'),
          api.get('/announcements?limit=5')
        ]);
        if (statsRes.data.success) setStats(statsRes.data.data);
        if (annRes.data.success) setAnnouncements(annRes.data.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (isLoading || !stats) {
    return <DashboardSkeleton />;
  }

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Welcome back, {user?.name?.split(' ')[0]}</h1>
        <p className="text-gray-500 mt-1">{formattedDate}</p>
      </div>

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Card */}
        <Card className="col-span-2 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">My Attendance</h3>
              <p className="text-sm text-gray-500">This Week</p>
            </div>
            <div className="flex gap-3">
               <Button variant="primary" size="sm" onClick={() => navigate('/attendance')}>Check In</Button>
               <Button variant="secondary" size="sm" onClick={() => navigate('/attendance')}>History</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Hours Worked</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-primary-DEFAULT">{stats.hoursWorkedThisWeek}h</span>
                <span className="text-sm text-gray-500">/ 40h</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                <div className="bg-primary-DEFAULT h-1.5 rounded-full transition-all duration-1000" style={{ width: `${Math.min((stats.hoursWorkedThisWeek / 40) * 100, 100)}%` }}></div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</p>
               <div className="mt-2">
                 <Badge status={stats.todayStatus} dot={true}>{stats.todayStatus}</Badge>
               </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden">
               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Next Shift</p>
               <p className="text-gray-900 font-medium">Tomorrow</p>
               <p className="text-sm text-gray-500">09:00 AM - 05:00 PM</p>
               <Clock className="absolute -bottom-4 -right-4 text-gray-100" size={80} strokeWidth={1} />
            </div>
          </div>
        </Card>

        {/* Time Off Card */}
        <Card className="bg-primary-DEFAULT border-none text-white p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start z-10">
            <h3 className="font-semibold text-white/90">Time Off</h3>
            <button onClick={() => navigate('/time-off')} className="text-white/70 hover:text-white transition-colors">
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="text-center my-6 z-10">
            <h2 className="text-6xl font-bold tracking-tighter">{user?.leaveBalance || 0}</h2>
            <p className="text-sm font-medium text-white/80 tracking-widest uppercase mt-1">Days Remaining</p>
          </div>

          <Button onClick={() => navigate('/time-off')} className="w-full bg-white/20 hover:bg-white/30 text-white border-none shadow-none z-10 backdrop-blur-sm">
            Request Time Off
          </Button>
          
          {/* Decorative shapes */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        
        {/* Recent Attendance Logs */}
        <Card className="col-span-2 flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Recent Attendance Logs</h3>
            <button onClick={() => navigate('/attendance')} className="text-sm text-primary-DEFAULT font-medium hover:underline">View All</button>
          </div>
          <div className="flex-1 p-0 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Check In</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Check Out</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.recentAttendance.length === 0 ? (
                  <tr><td colSpan="4" className="py-8 text-center text-gray-500">No recent logs.</td></tr>
                ) : (
                  stats.recentAttendance.map((log) => (
                    <tr key={log._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {new Date(log.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {log.checkInTime ? new Date(log.checkInTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--'}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {log.checkOutTime ? new Date(log.checkOutTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--'}
                      </td>
                      <td className="py-4 px-6">
                        <Badge status={log.status} dot={false}>{log.status}</Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Company Announcements */}
        <Card className="flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Company Announcements</h3>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto max-h-[400px]">
            {announcements.length === 0 ? (
              <p className="text-gray-500 text-sm text-center mt-10">No announcements yet.</p>
            ) : (
              announcements.map((a) => (
                <div key={a._id} className="flex gap-4 group">
                  <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${a.color}`}>
                     <Activity size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">{a.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed mb-2">{a.desc}</p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      <span>{a.author}</span>
                      <span>•</span>
                      <span>{new Date(a.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

      </div>
    </div>
  );
};
