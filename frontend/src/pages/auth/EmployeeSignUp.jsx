import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Shield, ArrowRight } from 'lucide-react';

export const EmployeeSignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 lg:p-8">
      <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
        
        {/* Left Side - Branding (Purple Gradient) */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-DEFAULT to-indigo-700 p-12 text-white flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-16">
              <Shield size={28} className="text-white" />
              <span className="text-xl font-bold tracking-tight">Enterprise Simplicity</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Join your digital workspace.
            </h1>
            <p className="text-lg text-white/80 max-w-md">
              Create your employee account to manage time-off, attendance, and team collaboration in one unified portal.
            </p>
          </div>
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-500 mb-8">Set up your employee profile</p>

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-DEFAULT transition-all" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-DEFAULT transition-all" required />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Work Email</label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="email" className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-DEFAULT transition-all" placeholder="name@company.com" required />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="password" className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-DEFAULT transition-all" placeholder="••••••••" required />
                </div>
              </div>
              
              <Button type="submit" variant="primary" className="w-full py-3 text-base flex justify-center items-center gap-2 mt-4">
                Sign Up <ArrowRight size={18} />
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-500">
              Already have an account? <Link to="/login" className="text-primary-DEFAULT font-semibold hover:underline">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quick helper icons
const MailIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const LockIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
