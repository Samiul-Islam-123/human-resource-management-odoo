import React, { useState, useEffect } from 'react';
import { X, UserPlus, UserCog, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/Button';

export const EmployeeModal = ({ isOpen, onClose, onSubmit, isLoading, initialData = null }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    role: 'employee',
    department: '',
    designation: '',
    salary: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        email: initialData.email || '',
        password: '', // Leave blank when editing unless changing
        phone: initialData.phone || '',
        role: initialData.role || 'employee',
        department: initialData.department || '',
        designation: initialData.designation || '',
        salary: initialData.salary || ''
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        role: 'employee',
        department: '',
        designation: '',
        salary: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = { ...formData, salary: formData.salary ? Number(formData.salary) : 0 };
    if (isEditing && !dataToSubmit.password) {
      delete dataToSubmit.password; // Don't send empty password on edit
    }
    onSubmit(dataToSubmit);
  };

  const generatePassword = () => {
    const randomPass = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();
    setFormData(prev => ({ ...prev, password: randomPass }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-50 rounded-lg text-primary-DEFAULT">
              {isEditing ? <UserCog size={20} /> : <UserPlus size={20} />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {isEditing ? 'Edit Employee Profile' : 'Add New Employee'}
              </h2>
              <p className="text-sm text-gray-500">
                {isEditing ? 'Update the details and credentials for this employee.' : 'Create a new profile and generate access credentials.'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <form id="employee-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Role */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">System Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:bg-white transition-all"
                >
                  <option value="employee">Employee</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              {/* First Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:bg-white transition-all"
                  placeholder="John"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:bg-white transition-all"
                  placeholder="Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isEditing}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:bg-white transition-all disabled:opacity-50"
                  placeholder="john.doe@company.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="^(\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$"
                  title="Please enter a valid Indian phone number (e.g. +91 98765 43210)"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:bg-white transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:bg-white transition-all"
                  placeholder="Engineering"
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:bg-white transition-all"
                  placeholder="Senior Developer"
                />
              </div>

              {/* Salary */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Salary (Annual)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:bg-white transition-all"
                    placeholder="85000"
                  />
                </div>
              </div>

              {/* Password Generation */}
              <div className="md:col-span-2 p-5 bg-blue-50 border border-blue-100 rounded-xl flex flex-col sm:flex-row items-end sm:items-center gap-4">
                <div className="flex-1 w-full">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    {isEditing ? 'New Password (Optional)' : 'Initial Password *'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required={!isEditing}
                      className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light transition-all font-mono"
                      placeholder={isEditing ? 'Leave blank to keep unchanged' : 'Enter or generate password'}
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <Button type="button" variant="secondary" onClick={generatePassword} className="whitespace-nowrap h-11 bg-white">
                  Generate Auto Password
                </Button>
              </div>

            </div>
          </form>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 flex-shrink-0">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" form="employee-form" variant="primary" disabled={isLoading}>
            {isLoading ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Save Changes' : 'Create Employee')}
          </Button>
        </div>
      </div>
    </div>
  );
};
