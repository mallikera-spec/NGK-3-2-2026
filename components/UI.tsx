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
  const baseStyles = "py-4 px-6 rounded-2xl font-poppins font-bold transition-all active:scale-95 flex items-center justify-center disabled:opacity-50 disabled:grayscale disabled:pointer-events-none uppercase tracking-widest text-[12px]";
  const variants = {
    primary: "bg-[#C8102E] text-white shadow-lg shadow-red-500/20",
    secondary: "bg-[#27272A] text-white shadow-sm",
    black: "bg-black text-white shadow-xl",
    outline: "bg-transparent border-2 border-zinc-950 text-zinc-950"
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
    success: 'bg-green-700 text-white border-transparent shadow-sm',
    danger: 'bg-red-700 text-white border-transparent shadow-sm',
    warning: 'bg-amber-700 text-white border-transparent shadow-sm',
    info: 'bg-blue-800 text-white border-transparent shadow-sm',
  };
  return (
    <span className={`text-[10px] font-poppins font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg ${styles[variant]}`}>
      {children}
    </span>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void; style?: React.CSSProperties }> = ({ children, className = '', onClick, style }) => {
  return (
    <div 
      onClick={onClick}
      style={style}
      className={`bg-white rounded-[32px] p-6 shadow-md border border-zinc-100 transition-all active:bg-zinc-50 active:scale-[0.98] ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export const Icon: React.FC<{ name: string; className?: string }> = ({ name, className = "w-6 h-6" }) => {
  // Ultra-modern SF-style iconography paths (Thicker, more filled)
  switch (name) {
    case 'home': 
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" /><path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" /></svg>;
    case 'car': 
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h.75a3 3 0 1 1 6 0h.375c1.035 0 1.875-.84 1.875-1.875V15h-3Z" /><path d="M22.5 13.5h-7.5V6.375c0-1.036.84-1.875 1.875-1.875h3.75c1.035 0 1.875.84 1.875 1.875V13.5Z" /></svg>;
    case 'search': 
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" /></svg>;
    case 'heart': 
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001Z" /></svg>;
    case 'chat': 
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z" clipRule="evenodd" /></svg>;
    case 'map': 
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 3.58-2.977c1.563-1.66 2.71-3.408 2.71-5.174 0-3.702-2.998-6.701-6.702-6.702S5.55 10.548 5.55 14.25c0 1.766 1.147 3.515 2.71 5.174a16.975 16.975 0 0 0 3.28 2.927ZM12 16.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" /></svg>;
    case 'cog': 
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.154.43l-.84.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.115-.26.297-.348.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.154-.43l.84-.692a1.875 1.875 0 0 0 .432-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" /></svg>;
    case 'plus': 
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" /></svg>;
    case 'user': 
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" /></svg>;
    case 'store': 
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386l2.23 7.584a.75.75 0 0 0 .72.541h10.354a.75.75 0 0 0 .73-.585l1.652-7.5c.06-.274-.01-.563-.19-.785a.75.75 0 0 0-.58-.265H5.404L5.163 1.95A.75.75 0 0 0 4.417 1.5H2.25ZM6.231 13.5l-.23 1.5h11.454a.75.75 0 0 1 0 1.5H5.211l-.31 1.5h14.349a.75.75 0 0 0 .75-.75V13.5H6.231Z" /><path d="M7.5 21a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM18.75 21a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" /></svg>;
    case 'truck': 
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h.75a3 3 0 1 1 6 0h.375c1.035 0 1.875-.84 1.875-1.875V15h-3Z" /><path d="M22.5 13.5h-7.5V6.375c0-1.036.84-1.875 1.875-1.875h3.75c1.035 0 1.875.84 1.875 1.875V13.5Z" /></svg>;
    case 'arrow-right': 
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" /></svg>;
    case 'check': 
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" /></svg>;
    case 'close': 
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" /></svg>;
    case 'info': 
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.433.232 2.433 1.587 0 .429-.267.808-.667.958L12 13.25a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5h-.167c-.23-.115-.333-.377-.333-.625 0-1.127.818-1.536 1.536-1.082 1.146.573 2.433-.232 2.433-1.587 0-1.355-1.095-2.45-2.45-2.45s-2.45 1.095-2.45 2.45a.75.75 0 0 0 1.5 0c0-.525.425-.95.95-.95s.95.425.95.95-.425.95-.95.95-.95-.425-.95-.95a.75.75 0 0 0-1.5 0Z" clipRule="evenodd" /></svg>;
    case 'camera': 
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h1.386a2.25 2.25 0 0 0 1.674-.751l.033-.035A2.25 2.25 0 0 1 8.532 2.25h6.936a2.25 2.25 0 0 1 1.689.763l.033.035a2.25 2.25 0 0 0 1.674.751H20.25A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM9 10.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" clipRule="evenodd" /></svg>;
    case 'bell':
        return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" /></svg>;
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
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12ZM3 17.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" />
            </svg>
          </button>
        )}
        {onBack && (
          <button onClick={onBack} className="p-2 -ml-2 text-white active:opacity-50 transition-opacity">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        <h1 className="text-xl font-black tracking-tight text-white uppercase font-poppins">{title}</h1>
      </div>
      <div className="mt-2 flex items-center space-x-2">
        {rightElement}
        <button 
          onClick={onProfile}
          className="w-10 h-10 rounded-full border-2 border-white/70 flex items-center justify-center bg-white/10 ml-2 active:scale-95 transition-transform shadow-md"
        >
          <Icon name="home" className="w-6 h-6 text-white" />
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
            <div className="w-14 h-14 rounded-full border border-white/20 p-0.5 bg-zinc-800 overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Karri" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-base text-white truncate w-32 font-poppins">Johnathan Doe</h3>
            <p className="text-[10px] font-bold text-[#C8102E] uppercase tracking-widest mt-0.5 font-poppins">{role || 'END USER'}</p>
          </div>
        </div>

        <div className="h-[1px] w-full bg-white/5" />

        <div className="flex-1 overflow-y-auto py-6 space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="px-6 space-y-4">
              <h4 className="text-[10px] font-bold text-zinc-100 uppercase tracking-[0.2em] font-poppins">{section.title}</h4>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => { onNavigate(item.id); onClose(); }}
                    className="w-full flex items-center space-x-4 py-3 px-3 -ml-3 rounded-xl transition-all active:bg-white/5 hover:bg-white/5 group"
                  >
                    <div className="text-zinc-100 group-hover:text-white group-active:text-[#C8102E] transition-colors">
                      <Icon name={item.icon} className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="px-6 space-y-4 pt-4 border-t border-white/5">
             <h4 className="text-[10px] font-bold text-zinc-100 uppercase tracking-[0.2em] font-poppins">More</h4>
             <button 
                onClick={() => { onNavigate('user_profile'); onClose(); }}
                className="w-full flex items-center space-x-4 py-3 px-3 -ml-3 rounded-xl transition-all hover:bg-white/5 group"
             >
                <div className="text-zinc-100 group-hover:text-white transition-colors">
                  <Icon name="cog" className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-white/90 group-hover:text-white">Settings</span>
             </button>
             <button 
                onClick={onLogout}
                className="w-full flex items-center space-x-4 py-3 px-3 -ml-3 rounded-xl transition-all hover:bg-white/5 group"
             >
                <div className="text-zinc-100 group-hover:text-white transition-colors">
                  <Icon name="close" className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-white/90 group-hover:text-white">Sign Out</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex flex-col justify-end items-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md h-[92%] rounded-t-[40px] shadow-2xl flex flex-col overflow-hidden animate-ios-slide-up">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between shrink-0">
          <h3 className="font-poppins font-bold text-xs uppercase tracking-[0.2em] text-zinc-950">{title}</h3>
          <button onClick={onClose} className="p-2 -mr-2 text-zinc-950 active:scale-90 transition-transform">
             <Icon name="close" className="w-8 h-8" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

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
          className={`flex-1 flex flex-col items-center space-y-2 transition-colors ${activeTab === tab.id ? 'text-white' : (isProfessional ? 'text-white/60' : 'text-zinc-950')}`}
        >
          <Icon name={tab.icon} className="w-8 h-8" />
          <span className="text-[10px] font-poppins font-bold uppercase tracking-widest">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};