import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';

// Auth Pages
import { EmployeeSignIn } from './pages/auth/EmployeeSignIn';
import { EmployeeSignUp } from './pages/auth/EmployeeSignUp';
import { AdminSignIn } from './pages/auth/AdminSignIn';
import { AdminSignUp } from './pages/auth/AdminSignUp';

// Employee Pages
import { Dashboard as EmployeeDashboard } from './pages/Dashboard';
import { Attendance } from './pages/Attendance';
import { Profile } from './pages/Profile';
import { TimeOff } from './pages/TimeOff';

// Admin Pages
import { Dashboard as AdminDashboard } from './pages/admin/Dashboard';
import { Employees as AdminEmployees } from './pages/admin/Employees';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<EmployeeSignIn />} />
        <Route path="/signup" element={<EmployeeSignUp />} />
        <Route path="/admin/login" element={<AdminSignIn />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />

        {/* Employee Authenticated Routes */}
        <Route path="/" element={<AppLayout role="employee" />}>
          <Route index element={<EmployeeDashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="profile" element={<Profile />} />
          <Route path="time-off" element={<TimeOff />} />
        </Route>

        {/* Admin Authenticated Routes */}
        <Route path="/admin" element={<AppLayout role="admin" />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="employees" element={<AdminEmployees />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
