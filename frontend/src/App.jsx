import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { AttendanceProvider } from './context/AttendanceContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

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
import { Documents } from './pages/Documents';

// Admin Pages
import { Dashboard as AdminDashboard } from './pages/admin/Dashboard';
import { Employees as AdminEmployees } from './pages/admin/Employees';
import { Settings as AdminSettings } from './pages/admin/Settings';
import { TimeOffAdmin } from './pages/admin/TimeOffAdmin';
import { AuditLogs } from './pages/admin/AuditLogs';
import { AnnouncementsAdmin } from './pages/admin/AnnouncementsAdmin';

function App() {
  return (
    <AuthProvider>
      <AttendanceProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<EmployeeSignIn />} />
            <Route path="/signup" element={<EmployeeSignUp />} />
            <Route path="/admin/login" element={<AdminSignIn />} />
            <Route path="/admin/signup" element={<AdminSignUp />} />

            {/* Employee Authenticated Routes */}
            <Route element={<ProtectedRoute allowedRoles={['employee']} />}>
              <Route path="/" element={<AppLayout role="employee" />}>
                <Route index element={<EmployeeDashboard />} />
                <Route path="attendance" element={<Attendance />} />
                <Route path="profile" element={<Profile />} />
                <Route path="time-off" element={<TimeOff />} />
                <Route path="documents" element={<Documents />} />
              </Route>
            </Route>

            {/* Admin Authenticated Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin', 'hr']} />}>
              <Route path="/admin" element={<AppLayout role="admin" />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="employees" element={<AdminEmployees />} />
                <Route path="time-off" element={<TimeOffAdmin />} />
                <Route path="audit-logs" element={<AuditLogs />} />
                <Route path="announcements" element={<AnnouncementsAdmin />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AttendanceProvider>
    </AuthProvider>
  );
}

export default App;
