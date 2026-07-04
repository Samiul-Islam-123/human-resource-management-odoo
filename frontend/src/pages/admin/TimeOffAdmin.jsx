import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { CalendarDays, CheckCircle, XCircle } from 'lucide-react';
import api from '../../utils/axios';

export const TimeOffAdmin = () => {
  const [leaves, setLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const res = await api.get('/leaves');
      if (res.data.success) {
        setLeaves(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch leaves", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleStatusChange = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status.toLowerCase()} this leave request?`)) return;
    try {
      const res = await api.patch(`/leaves/${id}/status`, { status });
      if (res.data.success) {
        fetchLeaves();
      }
    } catch (error) {
      console.error("Failed to update status", error);
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Administration</p>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Leave Requests</h1>
        </div>
      </div>

      <Card className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-900 font-semibold">
            <CalendarDays size={20} className="text-primary-DEFAULT" />
            <h3>All Requests</h3>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white sticky top-0 border-b border-gray-100 z-10">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type & Day</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan="6" className="py-8 text-center text-gray-500">Loading requests...</td></tr>
              ) : leaves.length === 0 ? (
                <tr><td colSpan="6" className="py-8 text-center text-gray-500">No leave requests found.</td></tr>
              ) : (
                leaves.map((leave) => (
                  <tr key={leave._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img src={leave.employeeId?.profilePicture || `https://ui-avatars.com/api/?name=${leave.employeeId?.firstName}+${leave.employeeId?.lastName}`} alt="Avatar" className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{leave.employeeId?.firstName} {leave.employeeId?.lastName}</p>
                          <p className="text-xs text-gray-500">{leave.employeeId?.employeeId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-gray-900">{leave.leaveType}</p>
                      <p className="text-xs text-gray-500">{leave.dayType}</p>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 max-w-xs truncate" title={leave.reason}>
                      {leave.reason}
                    </td>
                    <td className="py-4 px-6">
                      <Badge 
                        status={leave.status === 'Approved' ? 'Present' : leave.status === 'Rejected' ? 'Absent' : 'Pending'} 
                        className={leave.status === 'Pending' ? 'bg-orange-100 text-orange-700' : ''}
                      >
                        {leave.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {leave.status === 'Pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleStatusChange(leave._id, 'Approved')} className="p-1.5 text-success hover:bg-green-50 rounded-md transition-colors" title="Approve">
                            <CheckCircle size={18} />
                          </button>
                          <button onClick={() => handleStatusChange(leave._id, 'Rejected')} className="p-1.5 text-danger hover:bg-red-50 rounded-md transition-colors" title="Reject">
                            <XCircle size={18} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">Processed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
