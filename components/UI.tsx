
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'black';
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  className = '',
  fullWidth = true,
  disabled = false
}) => {
  const baseStyles = "py-3 px-6 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center disabled:opacity-50 disabled:grayscale disabled:pointer-events-none uppercase tracking-widest text-[11px]";
  const variants = {
    primary: "bg-[#C8102E] text-white shadow-sm",
    secondary: "bg-[#5B6271] text-white shadow-sm",
    black: "bg-black text-white shadow-lg",
    outline: "bg-transparent border-2 border-zinc-200 text-zinc-900"
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'success' | 'danger' | 'warning' | 'info' }> = ({ children, variant = 'info' }) => {
  const styles = {
    success: 'bg-green-600 text-white border-transparent shadow-sm',
    danger: 'bg-red-600 text-white border-transparent shadow-sm',
    warning: 'bg-amber-600 text-white border-transparent shadow-sm',
    info: 'bg-blue-700 text-white border-transparent shadow-sm',
  };
  return (
    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${styles[variant]}`}>
      {children}
    </span>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void; style?: React.CSSProperties }> = ({ children, className = '', onClick, style }) => {
  return (
    <div 
      onClick={onClick}
      style={style}
      className={`bg-white rounded-2xl p-4 shadow-sm border border-zinc-100 transition-all active:bg-zinc-50 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export const Header: React.FC<{ 
  title: string; 
  onBack?: () => void; 
  onMenu?: () => void; 
  onProfile?: () => void; 
  rightElement?: React.ReactNode;
  className?: string;
}> = ({ title, onBack, onMenu, onProfile, rightElement, className = '' }) => {
  return (
    <header className={`ios-header safe-area-padding-top sticky top-0 z-50 px-5 pb-4 flex items-center justify-between shadow-lg ${className}`}>
      <div className="flex items-center space-x-2 mt-2">
        {onMenu && (
          <button onClick={onMenu} className="p-2 -ml-2 text-white active:opacity-50 transition-opacity">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        {onBack && (
          <button onClick={onBack} className="p-2 -ml-2 text-white active:opacity-50 transition-opacity">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className="text-lg font-black tracking-tight text-white uppercase">{title}</h1>
      </div>
      <div className="mt-2 flex items-center space-x-2">
        {rightElement}
        <button 
          onClick={onProfile}
          className="w-8 h-8 rounded-full border-2 border-white/70 overflow-hidden bg-zinc-200 ml-2 active:scale-95 transition-transform shadow-md"
        >
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Profile" className="w-full h-full object-cover" />
        </button>
      </div>
    </header>
  );
};

export const Drawer: React.FC<{ isOpen: boolean; onClose: () => void; onNavigate: (screen: any) => void; onLogout?: () => void; role?: string | null }> = ({ isOpen, onClose, onNavigate, onLogout, role }) => {
  if (!isOpen) return null;
  const isPro = role === 'Distributor' || role === 'Reseller';
  
  const menuItems = isPro ? [
    { id: 'user_home', label: 'Home', icon: 'home' },
    { id: 'catalog_search', label: 'Catalog', icon: 'search' },
    { id: 'my_enquiries', label: 'Enquiries', icon: 'cog' },
    { id: 'favorites', label: 'Favorites', icon: 'heart' },
    { id: 'dealer_locator', label: 'Dealer Finder', icon: 'store' },
  ] : [
    { id: 'user_home', label: 'Home', icon: 'home' },
    { id: 'my_garage', label: 'My Garage', icon: 'car' },
    { id: 'catalog_search', label: 'Catalog Search', icon: 'search' },
    { id: 'favorites', label: 'My Favorites', icon: 'heart' },
    { id: 'my_enquiries', label: 'My Enquiries', icon: 'cog' },
    { id: 'dealer_locator', label: 'Dealer Finder', icon: 'store' },
  ];

  return (
    <div className="absolute inset-0 z-[200]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity" onClick={onClose} />
      <div className="absolute top-0 left-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl animate-ios-drawer flex flex-col overflow-hidden">
        <div className="pt-16 pb-8 px-6 bg-[#F8F9FB] border-b border-zinc-100 relative">
          <div className="flex items-center space-x-4">
            <div 
              onClick={() => { onNavigate('user_profile'); onClose(); }}
              className="w-16 h-16 rounded-[22px] border-2 border-[#C8102E] p-1 bg-white shadow-xl active:scale-95 transition-transform cursor-pointer"
            >
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150" alt="Profile" className="w-full h-full object-cover rounded-[16px]" />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-xl text-black uppercase tracking-tight leading-tight">Admin Portal</h3>
              <p className="text-[10px] font-black text-[#C8102E] uppercase tracking-widest mt-0.5">{role || 'Master User'}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-8 space-y-2">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => { onNavigate(item.id); onClose(); }}
              className="w-full group flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all active:bg-zinc-100 hover:bg-zinc-50"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-red-50 group-hover:text-[#C8102E] transition-colors shadow-sm">
                <Icon name={item.icon} className="w-5 h-5" />
              </div>
              <span className="text-xs font-black text-zinc-600 uppercase tracking-widest group-hover:text-black transition-colors">{item.label}</span>
            </button>
          ))}
          {isPro && (
            <button 
              onClick={onLogout}
              className="w-full group flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all active:bg-red-50 hover:bg-red-50 mt-4 border border-dashed border-red-100"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-red-100 flex items-center justify-center text-[#C8102E] shadow-sm">
                <Icon name="close" className="w-4 h-4" />
              </div>
              <span className="text-xs font-black text-[#C8102E] uppercase tracking-widest transition-colors">Sign Out</span>
            </button>
          )}
        </div>

        <div className="p-6 border-t border-zinc-100 bg-[#F8F9FB]">
           {!isPro && (
             <button 
              onClick={onLogout}
              className="w-full group flex items-center justify-center space-x-3 py-5 rounded-2xl bg-white border border-zinc-200 shadow-sm active:scale-[0.98] active:bg-red-50 transition-all"
             >
               <div className="w-6 h-6 rounded-full border border-red-200 flex items-center justify-center text-[#C8102E] group-active:border-red-500">
                  <Icon name="close" className="w-3.5 h-3.5" />
               </div>
               <span className="text-[11px] font-black text-zinc-900 uppercase tracking-[0.2em]">Sign Out</span>
             </button>
           )}
           <p className="text-center text-[8px] font-black text-zinc-400 uppercase mt-4 tracking-widest">NGK Technical Portal v4.2.0</p>
        </div>
      </div>
      <style>{`
        @keyframes drawerSlide {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-ios-drawer {
          animation: drawerSlide 0.5s cubic-bezier(0.32, 1, 0.23, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export const RoleFooter: React.FC<{ activeTab: string; onNavigate: (screen: any) => void; role?: string | null }> = ({ activeTab, onNavigate, role }) => {
  const isDistributor = role === 'Distributor';
  
  const tabs = [
    { id: 'user_home', label: 'Home', icon: 'home' },
    { id: 'my_enquiries', label: 'Enquiries', icon: 'cog' },
    { id: 'catalog_search', label: 'Search', icon: 'search' },
    { id: 'favorites', label: 'Favorites', icon: 'heart' },
    { id: 'user_profile', label: 'Profile', icon: 'user' },
  ];

  return (
    <nav className={`safe-area-padding-bottom border-t flex justify-around items-center px-1 py-3 shrink-0 shadow-2xl z-[100] ${isDistributor ? 'bg-zinc-950 border-white/5' : 'bg-white border-zinc-100'}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button 
            key={tab.id}
            onClick={() => onNavigate(tab.id)} 
            className={`flex-1 flex flex-col items-center space-y-1 transition-all active:scale-90 ${
              isActive 
                ? (isDistributor ? 'text-[#C8102E]' : 'text-[#C8102E]') 
                : (isDistributor ? 'text-zinc-500' : 'text-zinc-400')
            }`}
          >
            <Icon name={tab.icon} className="w-5 h-5" />
            <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-70'}`}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export const Modal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode 
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="absolute inset-0 z-[150] flex flex-col">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mt-auto w-full bg-white rounded-t-[32px] shadow-2xl animate-ios-slide-up flex flex-col max-h-[92%] overflow-hidden">
        <div className="sticky top-0 bg-white/80 backdrop-blur-md px-6 py-4 border-b border-zinc-100 flex items-center justify-between z-20">
          <h2 className="text-sm font-black text-black uppercase tracking-widest">{title}</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-zinc-500 active:scale-90 transition-transform hover:text-black">
            <Icon name="close" className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto bg-white">
          {children}
        </div>
      </div>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-ios-slide-up {
          animation: slideUp 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export const Icon: React.FC<{ name: string; className?: string }> = ({ name, className = "w-6 h-6" }) => {
  const icons: Record<string, React.ReactNode> = {
    user: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    store: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
    truck: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />,
    car: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />,
    search: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    heart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
    home: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    cog: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
    close: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />,
    refresh: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />,
    info: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    camera: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />,
    "arrow-right": <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />,
    "google": <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />,
  };

  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {icons[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};
