import React, { useState, useRef, useEffect } from 'react';
import { useAttendance } from '../context/AttendanceContext';

const STATUS_CONFIG = {
  'checked-in': {
    dot: <span className="w-3.5 h-3.5 rounded-full bg-green-500 ring-2 ring-green-200 inline-block flex-shrink-0" />,
    label: 'Checked In',
    labelColor: 'text-green-700',
    bg: 'bg-green-50 hover:bg-green-100 border-green-200',
    action: 'Check Out',
    actionColor: 'bg-red-500 hover:bg-red-600 text-white',
  },
  'absent': {
    dot: <span className="w-3.5 h-3.5 rounded-full bg-red-500 ring-2 ring-red-200 inline-block flex-shrink-0" />,
    label: 'Absent',
    labelColor: 'text-red-700',
    bg: 'bg-red-50 hover:bg-red-100 border-red-200',
    action: 'Check In',
    actionColor: 'bg-green-500 hover:bg-green-600 text-white',
  },
  'on-leave': {
    dot: <span className="text-base leading-none flex-shrink-0 select-none">✈️</span>,
    label: 'On Leave',
    labelColor: 'text-blue-700',
    bg: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    action: null,
    actionColor: '',
  },
};

export const StatusButton = ({ role = 'employee' }) => {
  const { userStatus, checkInTime, checkOutTime, handleCheckIn, handleCheckOut } = useAttendance();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const config = STATUS_CONFIG[userStatus];

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleAction = () => {
    if (userStatus === 'absent') handleCheckIn();
    else if (userStatus === 'checked-in') handleCheckOut();
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${config.bg}`}
        title="Click to manage your attendance status"
      >
        {config.dot}
        <span className={config.labelColor}>{config.label}</span>
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Today's Status</p>

          {/* Time info */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Check In</span>
              <span className="font-semibold text-gray-900">{checkInTime ?? '--:--'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Check Out</span>
              <span className="font-semibold text-gray-900">{checkOutTime ?? '--:--'}</span>
            </div>
          </div>

          {/* Action Button */}
          {config.action ? (
            <button
              onClick={handleAction}
              className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${config.actionColor}`}
            >
              {config.action} Now
            </button>
          ) : (
            <p className="text-center text-xs text-blue-500 font-medium py-2">
              ✈️ You are currently on approved leave.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
