import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { CloudUpload, ShieldCheck, ArrowRight } from 'lucide-react';

export const AdminSignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 lg:p-8">
      <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
        
        {/* Left Side - Context & Imagery */}
        <div className="hidden lg:flex lg:w-[45%] bg-slate-50 p-12 flex-col relative border-r border-gray-100">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4 tracking-tight">
              Human Resource Management System - Onboarding
            </h1>
            <p className="text-gray-600 leading-relaxed text-lg">
              Experience a paradigm shift in administrative efficiency. Our toolset provides the precision needed for modern workforce orchestration and real-time data visualization.
            </p>
          </div>
          
          {/* Mockup visual to represent the Performance Matrix card from Image 2 */}
          <div className="mt-auto bg-white rounded-xl shadow-xl border border-gray-100 p-6 relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary-DEFAULT flex items-center justify-center">
                <svg className="text-white w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h4v16H4zM10 12h4v8h-4zM16 8h4v12h-4z"/></svg>
              </div>
              <h3 className="font-semibold text-gray-900">Performance Matrix</h3>
              <div className="ml-auto flex gap-1">
                 <span className="w-2 h-2 rounded-full bg-danger"></span>
                 <span className="w-2 h-2 rounded-full bg-warning"></span>
                 <span className="w-2 h-2 rounded-full bg-primary-DEFAULT"></span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="border border-gray-100 rounded-lg p-4">
                 <p className="text-xs font-semibold text-gray-500 mb-1">Total Assets</p>
                 <p className="text-2xl font-bold text-primary-DEFAULT mb-1">$412,890</p>
                 <p className="text-xs font-medium text-success">↗ +12.5%</p>
              </div>
              <div className="border border-gray-100 rounded-lg p-4">
                 <p className="text-xs font-semibold text-gray-500 mb-1">New Hires</p>
                 <p className="text-2xl font-bold text-gray-900 mb-1">34</p>
                 <p className="text-xs font-medium text-success">↗ +4.2%</p>
              </div>
            </div>

            <div>
               <div className="flex justify-between items-end mb-2">
                 <p className="text-xs font-semibold text-gray-900">Activity Log</p>
                 <p className="text-[10px] text-gray-400 uppercase">Real-time</p>
               </div>
               <div className="flex items-end gap-2 h-16">
                 <div className="flex-1 bg-primary-light rounded-t-sm h-[40%]"></div>
                 <div className="flex-1 bg-primary-light rounded-t-sm h-[70%]"></div>
                 <div className="flex-1 bg-primary-DEFAULT rounded-t-sm h-[30%]"></div>
                 <div className="flex-1 bg-primary-light rounded-t-sm h-[50%]"></div>
                 <div className="flex-1 bg-primary-DEFAULT rounded-t-sm h-[80%]"></div>
                 <div className="flex-1 bg-primary-light rounded-t-sm h-[60%]"></div>
               </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity"></div>
          </div>
          
          <div className="mt-8 flex gap-6 text-xs font-semibold text-gray-400 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14}/> ISO 27001</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={14}/> GDPR Compliant</span>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-[55%] p-8 lg:p-12 xl:p-16 flex flex-col justify-center bg-white">
          <div className="w-full max-w-lg mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-gray-900 p-1.5 rounded-lg text-white">
                <ShieldCheck size={20} />
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">Enterprise Simplicity</span>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Create Admin Account</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Ready to set up your organization's workspace? Fill in the details below to begin.
            </p>

            <form onSubmit={handleSignUp} className="space-y-5">
              
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Company Logo</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary-DEFAULT hover:bg-primary-50/50 transition-colors cursor-pointer group">
                  <CloudUpload className="text-primary-DEFAULT mb-2 group-hover:scale-110 transition-transform" size={24} />
                  <p className="text-sm font-medium text-gray-700">Click to upload or drag & drop</p>
                  <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG (max. 800x400px)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Company Name</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-DEFAULT transition-all" placeholder="Acme Corp" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-DEFAULT transition-all" placeholder="+1 (555) 000-0000" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-DEFAULT transition-all" placeholder="Alex Johnson" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-DEFAULT transition-all" placeholder="admin@acme.com" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Password</label>
                  <div className="relative">
                    <input type="password" className="w-full px-4 py-2.5 pr-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-DEFAULT transition-all" placeholder="••••••••" required />
                    <EyeIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" size={18} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Confirm Password</label>
                  <input type="password" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-DEFAULT transition-all" placeholder="••••••••" required />
                </div>
              </div>

              <div className="flex items-start gap-3 my-6">
                <input type="checkbox" id="terms" className="mt-1 rounded border-gray-300 text-primary-DEFAULT focus:ring-primary-DEFAULT w-4 h-4" required />
                <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                  I agree to the <a href="#" className="text-primary-DEFAULT font-medium hover:underline">Terms of Service</a> and <a href="#" className="text-primary-DEFAULT font-medium hover:underline">Privacy Policy</a> regarding data handling and organizational governance.
                </label>
              </div>
              
              <Button type="submit" variant="primary" className="w-full py-3 text-base flex justify-center items-center gap-2">
                Sign Up <ArrowRight size={18} />
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100">
               <div className="text-center text-sm text-gray-500 mb-6">
                 Already have an account? <Link to="/admin/login" className="text-primary-DEFAULT font-bold hover:underline">Sign In</Link>
               </div>
               <div className="flex justify-center gap-6 text-xs text-gray-400 font-medium">
                  <a href="#" className="hover:text-gray-600">Terms of Use</a>
                  <a href="#" className="hover:text-gray-600">Privacy Policy</a>
                  <a href="#" className="hover:text-gray-600">Support</a>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EyeIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
