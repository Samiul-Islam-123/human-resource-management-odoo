import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { mockUser, mockAnnouncements, mockAttendanceLogs } from '../data/mock';
import { Clock, Calendar as CalendarIcon, FileText, Gift, ChevronRight } from 'lucide-react';

export const Dashboard = () => {
  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Welcome back, {mockUser.name.split(' ')[0]}</h1>
        <p className="text-gray-500 mt-1">Thursday, October 24th, 2023</p>
      </div>

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Card */}
        <Card className="col-span-2 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">My Attendance</h3>
              <p className="text-sm text-gray-500">This Week: Oct 20 - Oct 24</p>
            </div>
            <div className="flex gap-3">
               <Button variant="primary" size="sm">Check In</Button>
               <Button variant="secondary" size="sm">History</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Hours Worked</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-primary-DEFAULT">32.5h</span>
                <span className="text-sm text-gray-500">/ 40h</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                <div className="bg-primary-DEFAULT h-1.5 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</p>
               <div className="mt-2">
                 <Badge status="ABSENT" dot={true}>Out of Office</Badge>
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
        <Card className="bg-primary-DEFAULT border-none text-white p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start z-10">
            <h3 className="font-semibold text-white/90">Time Off</h3>
            <button className="text-white/70 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            </button>
          </div>
          
          <div className="text-center my-6 z-10">
            <h2 className="text-6xl font-bold tracking-tighter">24</h2>
            <p className="text-sm font-medium text-white/80 tracking-widest uppercase mt-1">Days Remaining</p>
          </div>

          <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-none shadow-none z-10 backdrop-blur-sm">
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
            <button className="text-sm text-primary-DEFAULT font-medium hover:underline">View All</button>
          </div>
          <div className="flex-1 p-0 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Check In</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Check Out</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockAttendanceLogs.slice(0, 5).map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{log.date}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{log.checkIn}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{log.checkOut}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{log.duration}</td>
                    <td className="py-4 px-6">
                      <Badge status={log.status} dot={false}>{log.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Company Announcements */}
        <Card className="flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Company Announcements</h3>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto">
            {mockAnnouncements.map((announcement) => (
              <div key={announcement.id} className="flex gap-4 group">
                <div className="w-px bg-gray-200 relative top-2 left-5 -z-10 group-last:bg-transparent hidden"></div>
                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${announcement.color}`}>
                   <span className="w-5 h-5 bg-current rounded-sm"></span> {/* Placeholder icon shape */}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">{announcement.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed mb-2">{announcement.desc}</p>
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <span>{announcement.author}</span>
                    <span>•</span>
                    <span>{announcement.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100 text-center">
             <button className="text-xs font-semibold text-primary-DEFAULT uppercase tracking-wider hover:underline flex items-center justify-center gap-1 w-full">
                View All Announcements <ChevronRight size={14} />
             </button>
          </div>
        </Card>
      </div>

      {/* Bottom Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-info flex items-center justify-center group-hover:scale-110 transition-transform">
            <CalendarIcon size={24} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Next Payday</p>
            <p className="font-semibold text-gray-900 text-lg">October 31</p>
          </div>
          <ChevronRight className="text-gray-400" size={20} />
        </Card>
        
        <Card className="p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-primary-DEFAULT flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText size={24} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Pending Tasks</p>
            <p className="font-semibold text-gray-900 text-lg">04 Pending</p>
          </div>
          <ChevronRight className="text-gray-400" size={20} />
        </Card>

        <Card className="p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-warning flex items-center justify-center group-hover:scale-110 transition-transform">
            <Gift size={24} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">Celebrations</p>
            <p className="font-semibold text-gray-900 text-lg">3 Birthdays</p>
          </div>
          <ChevronRight className="text-gray-400" size={20} />
        </Card>
      </div>
    </div>
  );
};
