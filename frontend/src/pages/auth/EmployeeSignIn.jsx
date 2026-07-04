import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Shield, Key, Fingerprint, ArrowRight } from 'lucide-react';

export const EmployeeSignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
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
              Streamlining human capital management for the modern era.
            </h1>
            <p className="text-lg text-white/80 max-w-md">
              Experience a high-performance HR portal designed for precision, utility, and calm.
            </p>
          </div>
          
          <div className="relative z-10 flex gap-12 mt-12">
            <div>
              <p className="text-3xl font-bold mb-1">12k+</p>
              <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">99.9%</p>
              <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">Uptime Reliability</p>
            </div>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-500 mb-8">Access your professional workspace</p>

            <form onSubmit={handleSignIn} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Login ID / Email</label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-DEFAULT transition-all"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Password</label>
                  <a href="#" className="text-xs font-medium text-primary-DEFAULT hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="password" 
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-DEFAULT transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <EyeIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" size={18} />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <input type="checkbox" id="remember" className="rounded border-gray-300 text-primary-DEFAULT focus:ring-primary-DEFAULT w-4 h-4" />
                <label htmlFor="remember" className="text-sm text-gray-600">Remember for 30 days</label>
              </div>
              
              <Button type="submit" variant="primary" className="w-full py-3 text-base flex justify-center items-center gap-2">
                Sign In <ArrowRight size={18} />
              </Button>
            </form>

            <div className="my-8 flex items-center gap-4 before:h-px before:flex-1 before:bg-gray-200 after:h-px after:flex-1 after:bg-gray-200">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Or continue with</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="secondary" className="flex items-center justify-center gap-2 py-2.5 border-gray-200 text-gray-700">
                 <Key size={18} className="text-gray-500" /> SSO
              </Button>
              <Button variant="secondary" className="flex items-center justify-center gap-2 py-2.5 border-gray-200 text-gray-700">
                 <Fingerprint size={18} className="text-gray-500" /> Biometric
              </Button>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              Don't have an account? <Link to="/signup" className="text-primary-DEFAULT font-semibold hover:underline">Sign Up</Link>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center gap-6 text-xs text-gray-400 font-medium">
              <a href="#" className="hover:text-gray-600">Privacy Policy</a>
              <a href="#" className="hover:text-gray-600">Terms of Service</a>
              <a href="#" className="hover:text-gray-600">Help Center</a>
            </div>
            <div className="mt-4 text-center">
               <Link to="/admin/login" className="text-xs text-gray-400 hover:text-gray-600 underline">Admin Access</Link>
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
const EyeIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
