import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Mail, Building2, UserCircle, Lock, Briefcase, Download, Clock, Calendar, Star, ShieldCheck, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/axios';

export const Profile = () => {
  const { user } = useAuth();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  if (!user) return <div className="p-8">Loading profile...</div>;

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    try {
      const res = await api.patch('/users/profile/me/password', { newPassword });
      if (res.data.success) {
        setMessage('Password updated successfully!');
        setNewPassword('');
        setTimeout(() => setIsPasswordModalOpen(false), 2000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Top Main Card */}
      <Card className="p-8 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-50 to-transparent opacity-50 pointer-events-none"></div>
        
        <div className="flex items-start justify-between relative z-10">
          <div className="flex gap-6 items-center">
            <div className="relative">
              <img src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&size=150`} alt="Profile" className="w-24 h-24 rounded-2xl object-cover shadow-sm border border-gray-100" />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${user.isActive ? 'bg-success' : 'bg-gray-400'}`}></div>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{user.firstName} {user.lastName}</h1>
                <Badge status={user.isActive ? 'Active Employee' : 'Inactive'} dot={false} className="bg-primary-50 text-primary-DEFAULT border-none">{user.isActive ? 'Active Employee' : 'Inactive'}</Badge>
              </div>
              <p className="text-gray-600 font-medium mb-4 capitalize">
                {user.role} <span className="text-gray-400 mx-2">•</span> {user.department || 'N/A'}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-gray-400" />
                  <span>{user.department || 'General'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-40">
            <Button variant="primary" className="w-full" onClick={() => setIsPasswordModalOpen(true)}>Change Password</Button>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-6">

        {/* Employment Details */}
        <Card className="p-8">
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2 text-primary-DEFAULT font-semibold">
              <Briefcase size={20} />
              <h3>Employment Details</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Employee Code</p>
              <p className="text-sm font-bold text-primary-DEFAULT">{user.employeeId}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Joining Date</p>
              <p className="text-sm font-medium text-gray-900">
                {user.joiningDate ? new Date(user.joiningDate).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>

          <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 mb-6 flex justify-between items-center">
            <div>
               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Salary</p>
               <p className="text-sm font-semibold text-gray-900">₹{user.salary ? user.salary.toLocaleString('en-IN') : '0'}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400">
               <Building2 size={16} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Contract Type</p>
                <p className="text-sm font-semibold text-gray-900">Full-Time</p>
             </div>
             <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Probation</p>
                <p className="text-sm font-semibold text-gray-900">Completed</p>
             </div>
          </div>
        </Card>
      </div>

      {/* Password Change Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
              <button 
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handlePasswordChange}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
                    placeholder="Enter new password"
                    minLength={6}
                    required
                  />
                </div>
                
                {message && (
                  <div className={`mb-4 text-sm font-medium ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <Button variant="secondary" type="button" onClick={() => setIsPasswordModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update Password'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
