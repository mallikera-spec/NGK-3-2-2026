
import React, { useState } from 'react';
import { Icon } from '../components/UI';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user_role', 'Distributor');
    onLoginSuccess();
  };

  return (
    <div className="flex-1 bg-white flex flex-col animate-ios overflow-y-auto pt-16 px-8 pb-10">
      <div className="flex flex-col items-center mb-10">
        <div className="w-20 h-20 bg-zinc-900 rounded-[24px] flex items-center justify-center shadow-2xl mb-6">
          <span className="text-white font-black text-3xl italic tracking-tighter">NGK</span>
        </div>
        <h1 className="text-3xl font-black text-[#0B0F1A] mb-1 text-center">Distributor Portal</h1>
        <p className="text-[#A1A1AA] text-[10px] font-black uppercase tracking-[0.15em] text-center">
          Secure Access • Admin Provisioned Credentials Only
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-[#A1A1AA] uppercase tracking-widest ml-1">Work Email</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@distributor.com" 
            className="w-full bg-[#F2F2F7] border-none rounded-2xl py-5 px-6 text-[#0B0F1A] font-black placeholder-[#D1D5DB] outline-none focus:ring-2 ring-black/10 transition-all"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-black text-[#A1A1AA] uppercase tracking-widest">Portal Key</label>
            <button type="button" className="text-[10px] font-black text-[#C8102E] uppercase tracking-widest">Forgot?</button>
          </div>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" 
            className="w-full bg-[#F2F2F7] border-none rounded-2xl py-5 px-6 text-[#0B0F1A] font-black placeholder-[#D1D5DB] outline-none focus:ring-2 ring-black/10 transition-all"
          />
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            className="w-full bg-black text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl active:scale-[0.98] transition-all"
          >
            Authorize Portal Access
          </button>
        </div>
      </form>

      <div className="mt-auto text-center pt-20">
        <p className="text-[10px] font-black uppercase text-[#D1D5DB] tracking-widest leading-relaxed">
          Need access? Contact your regional <br/> <span className="text-[#C8102E]">NGK Corporate Administrator</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
