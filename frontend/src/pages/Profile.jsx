import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { mockUser } from '../data/mock';
import { Mail, Building2, UserCircle, Lock, Briefcase, Download, Clock, Calendar, Star, ShieldCheck } from 'lucide-react';

export const Profile = () => {
  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Top Main Card */}
      <Card className="p-8 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-50 to-transparent opacity-50 pointer-events-none"></div>
        
        <div className="flex items-start justify-between relative z-10">
          <div className="flex gap-6 items-center">
            <div className="relative">
              <img src={mockUser.avatar} alt="Profile" className="w-24 h-24 rounded-2xl object-cover shadow-sm border border-gray-100" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white shadow-sm"></div>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{mockUser.name}</h1>
                <Badge status="Active Employee" dot={false} className="bg-primary-50 text-primary-DEFAULT border-none">Active Employee</Badge>
              </div>
              <p className="text-gray-600 font-medium mb-4">
                {mockUser.role} <span className="text-gray-400 mx-2">•</span> {mockUser.department}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  <span>{mockUser.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-gray-400" />
                  <span>{mockUser.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCircle size={16} className="text-gray-400" />
                  <span>Manager: <span className="font-medium text-gray-900">{mockUser.manager}</span></span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-32">
            <Button variant="primary" className="w-full">Request Edit</Button>
            <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
               Download CV
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Private Information */}
        <Card className="p-8">
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2 text-primary-DEFAULT font-semibold">
              <Lock size={20} />
              <h3>Private Information</h3>
            </div>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Read-only Access</span>
          </div>
          
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date of Birth</p>
              <p className="text-sm font-medium text-gray-900">{mockUser.dob}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Nationality</p>
              <div className="flex items-center gap-2">
                <span className="text-lg">🇬🇧</span>
                <p className="text-sm font-medium text-gray-900">{mockUser.nationality}</p>
              </div>
            </div>
            <div className="col-span-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Permanent Address</p>
              <p className="text-sm font-medium text-gray-900 leading-relaxed">{mockUser.address}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Personal Phone</p>
              <p className="text-sm font-medium text-gray-900">{mockUser.phone}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Marital Status</p>
              <p className="text-sm font-medium text-gray-900">{mockUser.maritalStatus}</p>
            </div>
          </div>
        </Card>

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
              <p className="text-sm font-bold text-primary-DEFAULT">{mockUser.id}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Joining Date</p>
              <p className="text-sm font-medium text-gray-900">{mockUser.joinDate}</p>
            </div>
          </div>

          <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 mb-6 flex justify-between items-center">
            <div>
               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Bank Account</p>
               <p className="text-sm font-semibold text-gray-900">{mockUser.bankName} <span className="text-gray-400 mx-2">•</span> {mockUser.accountNumber}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400">
               <Building2 size={16} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Contract Type</p>
                <p className="text-sm font-semibold text-gray-900">{mockUser.contractType}</p>
             </div>
             <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Probation</p>
                <p className="text-sm font-semibold text-gray-900">{mockUser.probation}</p>
             </div>
          </div>
        </Card>
      </div>

      {/* Bottom Metric Cards */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6 text-center hover:border-primary-300 transition-colors cursor-pointer">
          <div className="w-10 h-10 mx-auto rounded-full bg-blue-50 text-info flex items-center justify-center mb-4">
             <Clock size={20} />
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Work Hours</p>
          <div className="flex justify-center items-baseline gap-1">
             <span className="text-2xl font-bold text-gray-900">{mockUser.workHours}</span>
             <span className="text-xs font-medium text-gray-400">/mo</span>
          </div>
        </Card>

        <Card className="p-6 text-center hover:border-primary-300 transition-colors cursor-pointer">
          <div className="w-10 h-10 mx-auto rounded-full bg-purple-50 text-primary-DEFAULT flex items-center justify-center mb-4">
             <Calendar size={20} />
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Leave Balance</p>
          <div className="flex justify-center items-baseline gap-1">
             <span className="text-2xl font-bold text-gray-900">{mockUser.leaveBalance}</span>
             <span className="text-xs font-medium text-gray-400">Days</span>
          </div>
        </Card>

        <Card className="p-6 text-center hover:border-primary-300 transition-colors cursor-pointer">
          <div className="w-10 h-10 mx-auto rounded-full bg-orange-50 text-warning flex items-center justify-center mb-4">
             <Star size={20} />
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tenure</p>
          <div className="flex justify-center items-baseline gap-1">
             <span className="text-2xl font-bold text-gray-900">{mockUser.tenure.split(' ')[0]}</span>
             <span className="text-xs font-medium text-gray-400">{mockUser.tenure.split(' ')[1]}</span>
          </div>
        </Card>

        <Card className="p-6 text-center hover:border-primary-300 transition-colors cursor-pointer">
          <div className="w-10 h-10 mx-auto rounded-full bg-green-50 text-success flex items-center justify-center mb-4">
             <ShieldCheck size={20} />
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Performance</p>
          <div className="flex justify-center items-baseline gap-1">
             <span className="text-2xl font-bold text-gray-900">{mockUser.performance}</span>
          </div>
        </Card>
      </div>

    </div>
  );
};
