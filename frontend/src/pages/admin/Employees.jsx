import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Filter, Plus, TrendingUp, Eye, EyeOff, Search, Edit2, Trash2 } from 'lucide-react';
import { EmployeeModal } from '../../components/AddEmployeeModal';
import api from '../../utils/axios';

const StatusDot = ({ status }) => {
  if (status === 'checked-in' || status === 'active') return <span className="w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-green-200 inline-block" title="Active" />;
  if (status === 'on-leave') return <span className="text-sm" title="On Leave">✈️</span>;
  return <span className="w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-red-200 inline-block" title="Inactive" />;
};

const PasswordReveal = ({ password }) => {
  const [show, setShow] = useState(false);
  if (!password) return <span className="text-gray-400 italic text-xs">Not generated</span>;

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded w-24 truncate text-center">
        {show ? password : '••••••••'}
      </span>
      <button onClick={() => setShow(!show)} className="text-gray-400 hover:text-gray-600 transition-colors">
        {show ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
    </div>
  );
};

export const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/users');
      if (res.data.success) {
        setEmployees(res.data.data.employees);
      }
    } catch (error) {
      console.error("Failed to fetch employees", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleOpenModal = (employee = null) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleSubmitEmployee = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingEmployee) {
        const res = await api.patch(`/users/${editingEmployee._id}`, formData);
        if (res.data.success) {
          handleCloseModal();
          fetchEmployees();
        }
      } else {
        const res = await api.post('/users/add-employee', formData);
        if (res.data.success) {
          handleCloseModal();
          fetchEmployees();
        }
      }
    } catch (error) {
      const msg = error.response?.data?.message || `Failed to ${editingEmployee ? 'update' : 'add'} employee.`;
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEmployee = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      try {
        const res = await api.delete(`/users/${id}`);
        if (res.data.success) {
          fetchEmployees();
        }
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete employee.');
      }
    }
  };

  // Apply filters
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = 
        (emp.firstName + ' ' + emp.lastName).toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRole = roleFilter === 'all' || emp.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [employees, searchQuery, roleFilter]);

  const activeCount = employees.filter(e => e.isActive).length;

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
              <p className="text-4xl font-bold text-gray-900 mb-1">{employees.length}</p>
              <p className="text-sm font-medium text-success flex items-center gap-1">
                <TrendingUp size={14} /> Real-time count
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-between bg-primary-50/50">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-2 h-2 rounded-full bg-primary-DEFAULT"></div>
             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Currently Active</p>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-4xl font-bold text-gray-900 mb-1 text-primary-DEFAULT">{activeCount}</p>
              <p className="text-sm font-medium text-gray-500">Active accounts</p>
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
          </div>
        </Card>
      </div>

      {/* Talent Directory Table */}
      <Card className="flex-1 flex flex-col min-h-[400px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-b border-gray-100 gap-4">
          <h3 className="font-semibold text-gray-900 whitespace-nowrap">Talent Directory</h3>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
             <div className="relative flex-1 sm:w-64">
               <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
               <input 
                 type="text" 
                 placeholder="Search employees..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
               />
             </div>
             
             <div className="flex gap-2">
               <select 
                 value={roleFilter}
                 onChange={(e) => setRoleFilter(e.target.value)}
                 className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
               >
                 <option value="all">All Roles</option>
                 <option value="admin">Admin</option>
                 <option value="employee">Employee</option>
                 <option value="hr">HR</option>
               </select>

               <Button variant="primary" className="gap-2 whitespace-nowrap" onClick={() => handleOpenModal()}>
                 <Plus size={16} /> <span className="hidden sm:inline">Add Employee</span>
               </Button>
             </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-DEFAULT"></div>
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-gray-500">
              <p>No employees found matching your criteria.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee ID</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role & Dept</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Initial Password</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEmployees.map((emp) => (
                  <tr key={emp._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src={emp.profilePicture || `https://ui-avatars.com/api/?name=${emp.firstName}+${emp.lastName}`} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                          <span className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center">
                            <StatusDot status={emp.isActive ? 'active' : 'inactive'} />
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{emp.firstName} {emp.lastName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">
                        {emp.employeeId || 'N/A'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex w-fit px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-600 uppercase">
                          {emp.role}
                        </span>
                        <span className="text-xs text-gray-500">{emp.department || 'No Dept'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-900">{emp.email}</p>
                      <p className="text-xs text-gray-500">{emp.phone || 'No phone'}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        emp.isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      }`}>
                        <StatusDot status={emp.isActive ? 'active' : 'inactive'} />
                        {emp.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <PasswordReveal password={emp.samplePassword} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal(emp)}
                          className="p-1.5 rounded-lg text-gray-500 hover:bg-white hover:text-primary-DEFAULT hover:shadow-sm transition-all"
                          title="Edit Employee"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteEmployee(emp._id, `${emp.firstName} ${emp.lastName}`)}
                          className="p-1.5 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 hover:shadow-sm transition-all"
                          title="Delete Employee"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      <EmployeeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitEmployee}
        isLoading={isSubmitting}
        initialData={editingEmployee}
      />
    </div>
  );
};
