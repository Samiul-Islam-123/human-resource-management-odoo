import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Shield, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const EmployeeSignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(employeeId, password, 'employee');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
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

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Employee ID</label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-DEFAULT transition-all"
                    placeholder="e.g. OIJODO20240001"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <Button type="submit" variant="primary" disabled={isLoading} className="w-full py-3 text-base flex justify-center items-center gap-2">
                {isLoading ? 'Signing In...' : 'Sign In'} <ArrowRight size={18} />
              </Button>
            </form>

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
const MailIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
const LockIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
const EyeIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>;

