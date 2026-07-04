import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { mockAttendanceLogs } from '../data/mock';
import { Calendar as CalendarIcon, Download, Clock, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export const Attendance = () => {
  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Time Tracking</p>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Monthly Overview</h1>
        </div>
        <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-1">
          <button className="p-2 hover:bg-gray-50 rounded-md text-gray-600"><ChevronLeft size={20}/></button>
          <div className="text-center px-4">
            <p className="text-sm font-semibold text-primary-DEFAULT">OCTOBER 2023</p>
            <p className="text-xs text-gray-500">Current Month</p>
          </div>
          <button className="p-2 hover:bg-gray-50 rounded-md text-gray-600"><ChevronRight size={20}/></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        
        {/* Main Table Area */}
        <Card className="col-span-2 flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <CalendarIcon size={20} className="text-primary-DEFAULT" />
              <h3>Daily Logs</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-primary-DEFAULT gap-2">
              <Download size={16} /> Export Report
            </Button>
          </div>
          
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white sticky top-0 border-b border-gray-100 z-10">
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Check In</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Check Out</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Hours</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockAttendanceLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{log.date}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{log.checkIn}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{log.checkOut}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 font-mono">{log.duration}</td>
                    <td className="py-4 px-6">
                      <Badge status={log.status}>{log.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
            <p>Showing 1-20 of 21 records</p>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 rounded-md hover:bg-gray-100 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1.5 rounded-md bg-primary-DEFAULT text-white">1</button>
              <button className="px-3 py-1.5 rounded-md hover:bg-gray-100">2</button>
              <button className="px-3 py-1.5 rounded-md hover:bg-gray-100 text-gray-900 font-medium">Next</button>
            </div>
          </div>
        </Card>

        {/* Right Side Stats Panel */}
        <div className="space-y-6">
          
          {/* Total Hours */}
          <Card className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-primary-DEFAULT flex items-center justify-center">
                <Clock size={20} />
              </div>
              <Badge className="bg-green-100 text-success border-none shadow-sm" dot={false}>+12% vs last month</Badge>
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Hours this Month</p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-gray-900">168.5</span>
              <span className="text-sm font-medium text-gray-500">/ 176 hrs</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-primary-DEFAULT h-2 rounded-full" style={{ width: '95%' }}></div>
            </div>
          </Card>

          {/* Avg Lateness */}
          <Card className="p-6">
             <div className="w-10 h-10 rounded-full bg-orange-50 text-warning flex items-center justify-center mb-4">
                <AlertCircle size={20} />
              </div>
              <p className="text-sm font-medium text-gray-500 mb-1">Avg. Lateness</p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-bold text-gray-900">12m</span>
                <span className="text-sm font-medium text-gray-500">Per occurrence</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                3 times this month. Try to maintain the 9:00 AM standard.
              </p>
          </Card>

          {/* Remaining Leave */}
          <Card className="bg-primary-DEFAULT border-none text-white p-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                <CalendarIcon size={20} className="text-white" />
              </div>
              <p className="text-sm font-medium text-white/80 mb-1">Remaining Paid Leave</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-white">14</span>
                <span className="text-lg font-medium text-white/80">Days</span>
              </div>
              <Button className="w-full bg-white text-primary-DEFAULT hover:bg-gray-50 border-none shadow-lg">
                Request Time Off
              </Button>
            </div>
            {/* Background pattern */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-10">
              <CalendarIcon size={120} />
            </div>
          </Card>
          
          {/* Attendance Score */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Attendance Score</p>
            <Card className="p-6 flex items-center justify-center">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-primary-DEFAULT" strokeWidth="3" strokeDasharray="92, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-bold text-gray-900">92%</span>
                  <span className="text-[10px] font-bold text-success uppercase tracking-wider">Excellent</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Legend Footer */}
      <div className="flex gap-8 px-2 py-4 border-t border-gray-200 mt-auto">
         <div className="flex items-start gap-2">
           <span className="w-2 h-2 rounded-full bg-success mt-1.5"></span>
           <div>
             <p className="text-sm font-semibold text-gray-900">On Time</p>
             <p className="text-xs text-gray-500">Checking in before 9:00 AM</p>
           </div>
         </div>
         <div className="flex items-start gap-2">
           <span className="w-2 h-2 rounded-full bg-danger mt-1.5"></span>
           <div>
             <p className="text-sm font-semibold text-gray-900">Late</p>
             <p className="text-xs text-gray-500">Checking in after 9:00 AM</p>
           </div>
         </div>
         <div className="flex items-start gap-2">
           <span className="w-2 h-2 rounded-full bg-warning mt-1.5"></span>
           <div>
             <p className="text-sm font-semibold text-gray-900">Overtime</p>
             <p className="text-xs text-gray-500">Working beyond 8 hours/day</p>
           </div>
         </div>
         <div className="flex items-start gap-2">
           <span className="w-2 h-2 rounded-full bg-info mt-1.5"></span>
           <div>
             <p className="text-sm font-semibold text-gray-900">Paid Leave</p>
             <p className="text-xs text-gray-500">Approved PTO or sick leave</p>
           </div>
         </div>
      </div>
    </div>
  );
};
