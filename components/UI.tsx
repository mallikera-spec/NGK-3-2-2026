
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

// Icon component for consistent SVG usage across the app
export const Icon: React.FC<{ name: string; className?: string }> = ({ name, className = "w-6 h-6" }) => {
  switch (name) {
    case 'home': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
    case 'car': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>;
    case 'search': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
    case 'heart': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
    case 'chat': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>;
    case 'map': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 7m0 10V7" /></svg>;
    case 'cog': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    case 'plus': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
    case 'user': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
    case 'store': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
    case 'truck': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1" /></svg>;
    case 'arrow-right': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
    case 'check': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
    case 'close': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
    case 'info': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    case 'camera': return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    default: return null;
  }
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
  
  const sections = [
    {
      title: 'Navigation',
      items: [
        { id: 'user_home', label: 'Home', icon: 'home' },
        { id: 'my_garage', label: 'Garage', icon: 'car' },
      ]
    },
    {
      title: 'Catalog',
      items: [
        { id: 'catalog_search', label: 'Parts Finder', icon: 'search' },
        { id: 'favorites', label: 'Watchlist', icon: 'heart' },
      ]
    },
    {
      title: 'Support',
      items: [
        { id: 'my_enquiries', label: 'Enquiries', icon: 'chat' },
        { id: 'dealer_locator', label: 'Depots', icon: 'map' },
      ]
    }
  ];

  return (
    <div className="absolute inset-0 z-[200]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="absolute top-0 left-0 h-full w-[80%] max-w-[280px] bg-[#0E1320] shadow-2xl animate-ios-drawer flex flex-col overflow-hidden text-white border-r border-white/5">
        
        <div className="pt-16 pb-8 px-6 flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border border-white/20 p-0.5 bg-zinc-800 overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Karri" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-base text-white truncate w-32">Johnathan Doe</h3>
            <p className="text-[10px] font-bold text-[#C8102E] uppercase tracking-widest mt-0.5">{role || 'END USER'}</p>
          </div>
        </div>

        <div className="h-[1px] w-full bg-white/5" />

        <div className="flex-1 overflow-y-auto py-6 space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="px-6 space-y-4">
              <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">{section.title}</h4>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => { onNavigate(item.id); onClose(); }}
                    className="w-full flex items-center space-x-4 py-3 px-3 -ml-3 rounded-xl transition-all active:bg-white/5 hover:bg-white/5 group"
                  >
                    <div className="text-white/40 group-hover:text-white group-active:text-[#C8102E] transition-colors">
                      <Icon name={item.icon} className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="px-6 space-y-4 pt-4 border-t border-white/5">
             <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">More</h4>
             <button 
                onClick={() => { onNavigate('user_profile'); onClose(); }}
                className="w-full flex items-center space-x-4 py-3 px-3 -ml-3 rounded-xl transition-all hover:bg-white/5 group"
             >
                <div className="text-white/40 group-hover:text-white transition-colors">
                  <Icon name="cog" className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-white/80 group-hover:text-white">Settings</span>
             </button>
             <button 
                onClick={onLogout}
                className="w-full flex items-center space-x-4 py-3 px-3 -ml-3 rounded-xl transition-all hover:bg-white/5 group"
             >
                <div className="text-white/40 group-hover:text-white transition-colors">
                  <Icon name="close" className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-white/80 group-hover:text-white">Sign Out</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal component for showing detailed content overlays
export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full h-[92%] rounded-t-[40px] shadow-2xl flex flex-col overflow-hidden animate-ios-slide-up">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
          <h3 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400">{title}</h3>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-300 active:scale-90 transition-transform">
             <Icon name="close" className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

// RoleFooter component for role-specific bottom navigation
export const RoleFooter: React.FC<{ activeTab: string; onNavigate: (screen: any) => void; role: string }> = ({ activeTab, onNavigate, role }) => {
  const isProfessional = role === 'Reseller' || role === 'Distributor';
  return (
    <nav className={`ios-footer safe-area-padding-bottom border-t border-white/10 flex justify-around items-center px-1 py-4 shrink-0 shadow-2xl ${isProfessional ? 'bg-zinc-950' : 'bg-white'}`}>
      {[
        { id: 'user_home', label: 'Portal', icon: 'home' },
        { id: 'catalog_search', label: 'Search', icon: 'search' },
        { id: 'my_enquiries', label: isProfessional ? 'Inbox' : 'Enquiries', icon: 'cog' },
        { id: 'dealer_locator', label: isProfessional ? 'Depots' : 'Dealers', icon: 'store' },
      ].map((tab) => (
        <button 
          key={tab.id}
          onClick={() => onNavigate(tab.id)} 
          className={`flex-1 flex flex-col items-center space-y-1.5 transition-colors ${activeTab === tab.id ? 'text-white' : (isProfessional ? 'text-white/40' : 'text-zinc-400')}`}
        >
          <Icon name={tab.icon} className="w-6 h-6" />
          <span className="text-[9px] font-black uppercase tracking-[0.05em]">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};
