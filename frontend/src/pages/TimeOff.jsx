import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CalendarDays, ChevronLeft, ChevronRight, X, Plus } from 'lucide-react';
import api from '../utils/axios';
import { useAuth } from '../context/AuthContext';

const toYMD = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const TimeOff = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: 'Paid Time Off',
    startDate: '',
    endDate: '',
    dayType: 'Full Day',
    reason: ''
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [leavesRes, attendanceRes] = await Promise.all([
        api.get('/leaves/my-leaves'),
        api.get('/attendance/my-records')
      ]);
      if (leavesRes.data.success) setLeaves(leavesRes.data.data);
      if (attendanceRes.data.success) setAttendance(attendanceRes.data.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await api.post('/leaves', formData);
      if (res.data.success) {
        setIsModalOpen(false);
        setFormData({ leaveType: 'Paid Time Off', startDate: '', endDate: '', dayType: 'Full Day', reason: '' });
        fetchData();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push({ day: null, key: `empty-${i}` });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, date: new Date(year, month, i), key: `day-${i}` });
  }

  const getDayStatus = (dateObj) => {
    if (!dateObj) return null;
    const ymd = toYMD(dateObj);
    const dayOfWeek = dateObj.getDay();

    // Check Leaves
    const approvedLeave = leaves.find(l => {
      if (l.status !== 'Approved') return false;
      const start = toYMD(l.startDate);
      const end = toYMD(l.endDate);
      return ymd >= start && ymd <= end;
    });
    if (approvedLeave) return { type: 'leave', label: 'PTO' };

    // Check Attendance
    const attRecord = attendance.find(a => toYMD(a.date) === ymd);
    if (attRecord) {
       return { type: attRecord.status.toLowerCase(), label: attRecord.status };
    }

    // Weekend
    if (dayOfWeek === 0 || dayOfWeek === 6) return { type: 'weekend', label: '' };

    return null;
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Leave Management</p>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Time Off Requests</h1>
        </div>
        <Button variant="primary" className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> New Request
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar */}
        <div className="space-y-6">
          <Card className="bg-primary-50 border-none p-6 relative overflow-hidden shadow-sm">
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center mb-6">
                <CalendarDays size={20} className="text-primary-600" />
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Available Balance</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-gray-900">{user?.leaveBalance || 0}</span>
                <span className="text-sm font-medium text-gray-500">Days</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-none shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Calendar Legend</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary-600"></div>
                <span className="text-sm text-gray-600">Approved PTO</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="text-sm text-gray-600">Present</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-danger"></div>
                <span className="text-sm text-gray-600">Absent</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <span className="text-sm text-gray-600">Weekend</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Calendar */}
        <Card className="col-span-3 p-6 border-none shadow-sm flex flex-col min-h-[600px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">{monthName} {year}</h2>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"><ChevronLeft size={20}/></button>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"><ChevronRight size={20}/></button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden border border-gray-200">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
              <div key={d} className="bg-gray-50 py-3 text-center text-xs font-semibold text-gray-500 tracking-wider">
                {d}
              </div>
            ))}
            
            {calendarDays.map((c) => {
              const status = getDayStatus(c.date);
              let bgClass = "bg-white hover:bg-gray-50";
              let badgeClass = "";
              let isToday = false;

              if (c.date) {
                isToday = toYMD(c.date) === toYMD(new Date());
              }

              if (status) {
                if (status.type === 'leave') {
                  bgClass = "bg-primary-600 text-white";
                  badgeClass = "bg-white/20 text-white";
                } else if (status.type === 'weekend') {
                  bgClass = "bg-gray-50";
                }
              }
              
              if (isToday && (!status || status.type === 'weekend' || status.type === 'absent')) {
                  bgClass = `${bgClass} ring-2 ring-inset ring-primary-400 z-10 relative`;
              }

              return (
                <div key={c.key} className={`min-h-[100px] p-2 flex flex-col justify-between transition-colors ${bgClass}`}>
                  <span className={`text-sm font-medium ml-1 mt-1 ${status?.type === 'leave' ? 'text-white' : 'text-gray-700'}`}>
                    {c.day}
                  </span>
                  
                  {status && status.label && (
                    <div className="mt-auto">
                      {status.type === 'leave' ? (
                        <div className={`text-[10px] font-semibold px-2 py-1 rounded w-fit ${badgeClass}`}>
                          {status.label}
                        </div>
                      ) : (
                        <div className={`text-[10px] font-semibold px-2 py-1 rounded w-fit 
                          ${status.type === 'present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                        `}>
                          {status.label}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Card>

        {/* Leave History Table */}
        <Card className="col-span-3 lg:col-start-2 p-6 border-none shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">My Leave Requests</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dates</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leaves.length === 0 ? (
                  <tr><td colSpan="4" className="py-8 text-center text-gray-500">No requests found.</td></tr>
                ) : (
                  leaves.map(leave => (
                    <tr key={leave._id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <p className="text-sm font-semibold text-gray-900">{leave.leaveType}</p>
                        <p className="text-xs text-gray-500">{leave.dayType}</p>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <Badge 
                          status={leave.status === 'Approved' ? 'Present' : leave.status === 'Rejected' ? 'Absent' : 'Pending'} 
                          className={leave.status === 'Pending' ? 'bg-orange-100 text-orange-700' : ''}
                        >
                          {leave.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button onClick={() => setSelectedLeave(leave)} className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Leave Details Modal */}
      {selectedLeave && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Request Details</h2>
              <button onClick={() => setSelectedLeave(null)} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={24} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Leave Type</p>
                <p className="text-gray-900 font-medium">{selectedLeave.leaveType} ({selectedLeave.dayType})</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Start Date</p>
                  <p className="text-gray-900">{new Date(selectedLeave.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">End Date</p>
                  <p className="text-gray-900">{new Date(selectedLeave.endDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Reason</p>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg mt-1 text-sm border border-gray-100">{selectedLeave.reason}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Status</p>
                <div className="mt-1">
                  <Badge 
                    status={selectedLeave.status === 'Approved' ? 'Present' : selectedLeave.status === 'Rejected' ? 'Absent' : 'Pending'} 
                    className={selectedLeave.status === 'Pending' ? 'bg-orange-100 text-orange-700' : ''}
                  >
                    {selectedLeave.status}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Applied On</p>
                <p className="text-gray-600 text-sm">{new Date(selectedLeave.appliedOn).toLocaleString()}</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <Button variant="secondary" onClick={() => setSelectedLeave(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Request Leave Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Request Time Off</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={24} /></button>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                    <select 
                      required
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-DEFAULT"
                      value={formData.leaveType} onChange={e => setFormData({...formData, leaveType: e.target.value})}
                    >
                      <option value="Paid Time Off">Paid Time Off</option>
                      <option value="Sick Leave">Sick Leave</option>
                      <option value="Unpaid Leave">Unpaid Leave</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <select 
                      required
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-DEFAULT"
                      value={formData.dayType} onChange={e => setFormData({...formData, dayType: e.target.value})}
                    >
                      <option value="Full Day">Full Day</option>
                      <option value="Half Day">Half Day</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input type="date" required className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input type="date" required className="w-full px-3 py-2 border border-gray-200 rounded-lg" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                  <textarea 
                    required rows="3" 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-DEFAULT resize-none"
                    placeholder="Briefly explain your reason for leave..."
                    value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})}
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button variant="primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Request'}</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
