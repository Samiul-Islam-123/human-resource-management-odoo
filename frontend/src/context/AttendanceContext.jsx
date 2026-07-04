import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/axios';
import { useAuth } from './AuthContext';

const AttendanceContext = createContext(null);

export const AttendanceProvider = ({ children }) => {
  const [userStatus, setUserStatus] = useState('absent'); // 'absent' | 'checked-in' | 'on-leave'
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Fetch initial status when user logs in
  useEffect(() => {
    if (user) {
      fetchStatus();
    }
  }, [user]);

  const fetchStatus = async () => {
    try {
      const res = await api.get('/attendance/status');
      if (res.data.success) {
        setUserStatus(res.data.data.status);
        setCheckInTime(res.data.data.checkInTime);
        setCheckOutTime(res.data.data.checkOutTime);
      }
    } catch (error) {
      console.error("Failed to fetch attendance status", error);
    }
  };

  const handleCheckIn = async () => {
    setIsLoading(true);
    try {
      const res = await api.post('/attendance/check-in');
      if (res.data.success) {
        await fetchStatus();
      }
    } catch (error) {
      console.error("Check-in failed", error);
      alert(error.response?.data?.message || "Failed to check in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setIsLoading(true);
    try {
      const res = await api.post('/attendance/check-out');
      if (res.data.success) {
        await fetchStatus();
      }
    } catch (error) {
      console.error("Check-out failed", error);
      alert(error.response?.data?.message || "Failed to check out");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AttendanceContext.Provider value={{
      userStatus, checkInTime, checkOutTime, isLoading,
      handleCheckIn, handleCheckOut, fetchStatus
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
