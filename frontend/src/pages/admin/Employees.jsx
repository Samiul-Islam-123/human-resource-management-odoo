import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAttendance } from '../../context/AttendanceContext';
import { Filter, Plus, ChevronRight, TrendingUp } from 'lucide-react';

const StatusDot = ({ status }) => {
  if (status === 'checked-in') return <span className="w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-green-200 inline-block" title="Checked In" />;
  if (status === 'on-leave') return <span className="text-sm" title="On Leave">✈️</span>;
  return <span className="w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-red-200 inline-block" title="Absent" />;
};

export const Employees = () => {
  const { employeeStatuses, updateEmployeeStatus } = useAttendance();

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-2 h-2 rounded-full bg-primary-DEFAULT"></div>
             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Employees</p>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-4xl font-bold text-gray-900 mb-1">142</p>
              <p className="text-sm font-medium text-success flex items-center gap-1">
                <TrendingUp size={14} /> +4.5% vs last month
              </p>
            </div>
            {/* Decorative chart line */}
            <svg width="80" height="40" viewBox="0 0 80 40" fill="none" stroke="currentColor" className="text-primary-DEFAULT" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 30l15-10 15 15 20-25 20 15" />
            </svg>
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-between bg-primary-50/50">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-2 h-2 rounded-full bg-primary-DEFAULT"></div>
             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Currently Active</p>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-4xl font-bold text-gray-900 mb-1 text-primary-DEFAULT">128</p>
              <p className="text-sm font-medium text-gray-500">90% presence rate</p>
            </div>
            {/* Decorative circle chart */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-white" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-primary-DEFAULT" strokeWidth="4" strokeDasharray="90, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="absolute text-[10px] font-bold text-primary-DEFAULT">90%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-between bg-gray-900 text-white border-none shadow-xl">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-2 h-2 rounded-full bg-success"></div>
             <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Team Satisfaction</p>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-4xl font-bold text-white mb-1">4.8</p>
              <p className="text-sm font-medium text-gray-400">Top 5% in industry</p>
            </div>
            <div className="flex gap-1 text-warning">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            </div>
          </div>
        </Card>
      </div>

      {/* Talent Directory Table */}
      <Card className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Talent Directory</h3>
          <div className="flex gap-3">
             <Button variant="secondary" className="gap-2">
               <Filter size={16} /> Filter
             </Button>
             <Button variant="primary" className="gap-2">
               <Plus size={16} /> Add Employee
             </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Check In</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Check Out</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employeeStatuses.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={emp.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                        <span className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center">
                          <StatusDot status={emp.status} />
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{emp.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-600">Engineering</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      emp.status === 'checked-in' ? 'bg-green-50 text-green-700' :
                      emp.status === 'on-leave' ? 'bg-blue-50 text-blue-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      <StatusDot status={emp.status} />
                      {emp.status === 'checked-in' ? 'Checked In' : emp.status === 'on-leave' ? 'On Leave' : 'Absent'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 font-mono">{emp.checkIn ?? '--:--'}</td>
                  <td className="py-4 px-6 text-sm text-gray-600 font-mono">{emp.checkOut ?? '--:--'}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {emp.status !== 'on-leave' && (
                        emp.status === 'absent' ? (
                          <button
                            onClick={() => updateEmployeeStatus(emp.id, 'checked-in')}
                            className="px-3 py-1 rounded-lg text-xs font-semibold bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition-colors"
                          >
                            Check In
                          </button>
                        ) : (
                          <button
                            onClick={() => updateEmployeeStatus(emp.id, 'absent')}
                            className="px-3 py-1 rounded-lg text-xs font-semibold bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors"
                          >
                            Check Out
                          </button>
                        )
                      )}
                      <button
                        onClick={() => updateEmployeeStatus(emp.id, 'on-leave')}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
                      >
                        ✈️ Leave
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
          <p>Showing 4 of 142 employees</p>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 rounded-md hover:bg-gray-100 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 rounded-md bg-primary-DEFAULT text-white">1</button>
            <button className="px-3 py-1.5 rounded-md hover:bg-gray-100">2</button>
            <button className="px-3 py-1.5 rounded-md hover:bg-gray-100">3</button>
            <button className="px-3 py-1.5 rounded-md hover:bg-gray-100 text-gray-900 font-medium">Next</button>
          </div>
        </div>
      </Card>
    </div>
  );
};
