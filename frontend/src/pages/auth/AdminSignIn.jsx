import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, ArrowRight, Key, Fingerprint } from 'lucide-react';

export const AdminSignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 lg:p-8">
      <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
        
        {/* Left Side - Context & Imagery */}
        <div className="hidden lg:flex lg:w-[45%] bg-slate-50 p-12 flex-col relative border-r border-gray-100">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4 tracking-tight">
              Human Resource Management System - Portal
            </h1>
            <p className="text-gray-600 leading-relaxed text-lg">
              Securely access your administrative workspace to manage employees, attendance, and organizational settings.
            </p>
          </div>
          
          <div className="mt-auto flex gap-6 text-xs font-semibold text-gray-400 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14}/> Secure Access</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={14}/> Admin Privileges</span>
          </div>
        </div>

        {/* Right Side - SignIn Form */}
        <div className="w-full lg:w-[55%] p-8 lg:p-12 xl:p-16 flex flex-col justify-center bg-white">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-gray-900 p-1.5 rounded-lg text-white">
                <ShieldCheck size={20} />
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">Enterprise Simplicity</span>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Admin Sign In</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Sign in to manage your organization.
            </p>

            <form onSubmit={handleSignIn} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Admin Email</label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="email" className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" placeholder="admin@acme.com" required />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Password</label>
                  <a href="#" className="text-xs font-medium text-gray-900 hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="password" className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" placeholder="••••••••" required />
                </div>
              </div>
              
              <Button type="submit" className="w-full py-3 text-base flex justify-center items-center gap-2 mt-4 bg-gray-900 hover:bg-black text-white">
                Sign In <ArrowRight size={18} />
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100">
               <div className="text-center text-sm text-gray-500 mb-6">
                 Need to register? <Link to="/admin/signup" className="text-gray-900 font-bold hover:underline">Create Company</Link>
               </div>
               <div className="text-center text-sm text-gray-400 mt-4">
                 <Link to="/login" className="hover:text-gray-600 underline">Switch to Employee Login</Link>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MailIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const LockIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
