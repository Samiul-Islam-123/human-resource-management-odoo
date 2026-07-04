import React, { createContext, useContext, useState } from 'react';

// Status options: 'absent' | 'checked-in' | 'on-leave'
const AttendanceContext = createContext(null);

export const AttendanceProvider = ({ children }) => {
  const [userStatus, setUserStatus] = useState('absent'); // default: not yet checked in
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  // Simulate employee attendances for Admin view
  const [employeeStatuses, setEmployeeStatuses] = useState([
    { id: 1, name: 'Elena Rodriguez', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024a', status: 'checked-in', checkIn: '09:02 AM', checkOut: null },
    { id: 2, name: 'Marcus Thorne', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024b', status: 'on-leave', checkIn: null, checkOut: null },
    { id: 3, name: 'Alex Chen', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024c', status: 'absent', checkIn: null, checkOut: null },
    { id: 4, name: 'Maya Okafor', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', status: 'checked-in', checkIn: '08:51 AM', checkOut: null },
  ]);

  const handleCheckIn = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setCheckInTime(time);
    setCheckOutTime(null);
    setUserStatus('checked-in');
  };

  const handleCheckOut = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setCheckOutTime(time);
    setUserStatus('absent');
  };

  const updateEmployeeStatus = (id, newStatus) => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setEmployeeStatuses(prev => prev.map(emp => {
      if (emp.id !== id) return emp;
      if (newStatus === 'checked-in') return { ...emp, status: 'checked-in', checkIn: time, checkOut: null };
      if (newStatus === 'absent') return { ...emp, status: 'absent', checkIn: emp.checkIn, checkOut: time };
      if (newStatus === 'on-leave') return { ...emp, status: 'on-leave', checkIn: null, checkOut: null };
      return emp;
    }));
  };

  return (
    <AttendanceContext.Provider value={{
      userStatus, checkInTime, checkOutTime,
      handleCheckIn, handleCheckOut,
      employeeStatuses, updateEmployeeStatus,
    }}>
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => {
  const ctx = useContext(AttendanceContext);
  if (!ctx) throw new Error('useAttendance must be used within AttendanceProvider');
  return ctx;
};
