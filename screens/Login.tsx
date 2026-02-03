
import React, { useState } from 'react';
import { Icon } from '../components/UI';
import { UserRole } from '../types';

interface LoginProps {
  onLoginSuccess: () => void;
  role?: UserRole | null;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, role }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role) {
      localStorage.setItem('user_role', role);
    }
    onLoginSuccess();
  };

  return (
    <div className="flex-1 bg-white flex flex-col animate-ios overflow-y-auto pt-16 px-8 pb-10">
      {/* NGK Branded Logo */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-20 h-20 bg-[#C8102E] rounded-[24px] flex items-center justify-center shadow-2xl shadow-red-500/20 mb-6">
          <span className="text-white font-black text-3xl italic tracking-tighter">NGK</span>
        </div>
        <h1 className="text-3xl font-black text-[#0B0F1A] mb-1">Welcome Back</h1>
        <p className="text-[#A1A1AA] text-[10px] font-black uppercase tracking-[0.15em]">
          Secure Portal Access for {role?.toUpperCase() || 'END USER'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-[#A1A1AA] uppercase tracking-widest ml-1">Work Email</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com" 
            className="w-full bg-[#F2F2F7] border-none rounded-2xl py-5 px-6 text-[#0B0F1A] font-black placeholder-[#D1D5DB] outline-none focus:ring-2 ring-[#C8102E]/10 transition-all"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-black text-[#A1A1AA] uppercase tracking-widest">Secure Password</label>
            <button type="button" className="text-[10px] font-black text-[#C8102E] uppercase tracking-widest">Recovery</button>
          </div>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" 
            className="w-full bg-[#F2F2F7] border-none rounded-2xl py-5 px-6 text-[#0B0F1A] font-black placeholder-[#D1D5DB] outline-none focus:ring-2 ring-[#C8102E]/10 transition-all"
          />
        </div>

        {/* Main Action Button */}
        <div className="pt-4">
          <button 
            type="submit"
            className="w-full bg-[#C8102E] text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-red-500/20 active:scale-[0.98] transition-all"
          >
            Authorize Portal Access
          </button>
        </div>
      </form>

      {/* Corporate Divider */}
      <div className="relative my-12">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100"></div>
        </div>
        <div className="relative flex justify-center text-[10px] uppercase">
          <span className="bg-white px-4 text-[#D1D5DB] font-black tracking-[0.4em] ml-4">Corporate ID</span>
        </div>
      </div>

      {/* SSO Button */}
      <button 
        onClick={onLoginSuccess}
        className="w-full bg-white border border-[#F2F2F7] py-5 px-6 rounded-2xl font-black text-[#0B0F1A] flex items-center justify-center space-x-3 transition-all active:scale-[0.98] shadow-sm mb-12 uppercase text-[10px] tracking-widest"
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
        </div>
        <span className="ml-1">Single Sign-On</span>
      </button>

      {/* Footer link */}
      <div className="mt-auto text-center">
        <p className="text-[10px] font-black uppercase text-[#D1D5DB] tracking-widest">
          Request Access? <span className="text-[#C8102E]">Support Desk</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
