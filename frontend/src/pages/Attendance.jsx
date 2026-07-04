import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Calendar as CalendarIcon, Download, Clock, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../utils/axios';

export const Attendance = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get('/attendance/my-records');
        if (res.data.success) {
          setLogs(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch attendance logs", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const formatTime = (dateString) => {
    if (!dateString) return 'In Progress';
    return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const calculateDuration = (checkIn, checkOut) => {
    if (!checkIn) return '--';
    if (!checkOut) return 'Working...';
    const diffMs = new Date(checkOut) - new Date(checkIn);
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffMins = Math.floor((diffMs % 3600000) / 60000);
    return `${diffHrs}h ${diffMins}m`;
  };

  const totalHours = logs.reduce((total, log) => {
    if (!log.checkInTime || !log.checkOutTime) return total;
    const diff = new Date(log.checkOutTime) - new Date(log.checkInTime);
    return total + (diff / 3600000);
  }, 0).toFixed(1);

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Time Tracking</p>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Monthly Overview</h1>
        </div>
        {/* <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-1">
          <button className="p-2 hover:bg-gray-50 rounded-md text-gray-600"><ChevronLeft size={20}/></button>
          <div className="text-center px-4">
            <p className="text-sm font-semibold text-primary-DEFAULT">CURRENT MONTH</p>
            <p className="text-xs text-gray-500">Activity</p>
          </div>
          <button className="p-2 hover:bg-gray-50 rounded-md text-gray-600"><ChevronRight size={20}/></button>
        </div> */}
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
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-500">Loading records...</td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-500">No attendance records found.</td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {new Date(log.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{formatTime(log.checkInTime)}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{formatTime(log.checkOutTime)}</td>
                      <td className="py-4 px-6 text-sm text-gray-600 font-mono">{calculateDuration(log.checkInTime, log.checkOutTime)}</td>
                      <td className="py-4 px-6">
                        <Badge status={log.status}>{log.status}</Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
            <p>Showing {logs.length} records</p>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 rounded-md hover:bg-gray-100 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1.5 rounded-md bg-primary-DEFAULT text-white">1</button>
              <button className="px-3 py-1.5 rounded-md hover:bg-gray-100 disabled:opacity-50" disabled>Next</button>
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
              <Badge className="bg-green-100 text-success border-none shadow-sm" dot={false}>Active</Badge>
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Hours Logged</p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-gray-900">{totalHours}</span>
              <span className="text-sm font-medium text-gray-500">hrs</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-primary-DEFAULT h-2 rounded-full" style={{ width: `${Math.min((totalHours/160)*100, 100)}%` }}></div>
            </div>
          </Card>

          {/* Avg Lateness */}
          <Card className="p-6">
             <div className="w-10 h-10 rounded-full bg-orange-50 text-warning flex items-center justify-center mb-4">
                <AlertCircle size={20} />
              </div>
              <p className="text-sm font-medium text-gray-500 mb-1">Check-in Status</p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-bold text-gray-900">Good</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Try to maintain the 9:00 AM standard to avoid lateness flags.
              </p>
          </Card>


          
        </div>
      </div>
      
      {/* Legend Footer */}
      <div className="flex gap-8 px-2 py-4 border-t border-gray-200 mt-auto">
         <div className="flex items-start gap-2">
           <span className="w-2 h-2 rounded-full bg-success mt-1.5"></span>
           <div>
             <p className="text-sm font-semibold text-gray-900">Present</p>
             <p className="text-xs text-gray-500">Checked in today</p>
           </div>
         </div>
         <div className="flex items-start gap-2">
           <span className="w-2 h-2 rounded-full bg-danger mt-1.5"></span>
           <div>
             <p className="text-sm font-semibold text-gray-900">Absent</p>
             <p className="text-xs text-gray-500">No show / Checked out</p>
           </div>
         </div>
      </div>
    </div>
  );
};
