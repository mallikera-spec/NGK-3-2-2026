import React from 'react';
import { ScreenId, UserRole, Vehicle } from '../types';
import { Card, Icon, Header } from '../components/UI';

interface UserHomeProps {
  onNavigate: (screen: ScreenId) => void;
  role: UserRole | null;
  onOpenMenu: () => void;
  onProfile: () => void;
  primaryVehicle?: Vehicle;
}

const UserHome: React.FC<UserHomeProps> = ({ onNavigate, role, onOpenMenu, onProfile, primaryVehicle }) => {
  const isProfessional = role === 'Reseller' || role === 'Distributor';

  return (
    <div className="flex-1 bg-[#F2F2F7] flex flex-col h-full overflow-hidden">
      <Header 
        title={isProfessional ? `${role?.toUpperCase()} PORTAL` : "NGK TECHNICAL"} 
        onMenu={onOpenMenu}
        onProfile={onProfile}
        className={isProfessional ? "bg-black" : ""}
        rightElement={
          <button className="p-2 text-white relative">
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-white rounded-full border border-[#C8102E]"></div>
            <Icon name="bell" className="w-7 h-7" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
        <div className={`rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden animate-ios ${isProfessional ? 'bg-zinc-900' : 'bg-black'}`}>
          <div className="relative z-10">
            <span className="bg-[#C8102E] px-3 py-1 rounded-lg text-[10px] font-poppins font-bold uppercase tracking-widest mb-3 inline-block">
              {isProfessional ? 'OPERATIONAL HEALTH' : 'NEW RELEASE'}
            </span>
            <h2 className="text-3xl font-poppins font-black mb-1">
              {isProfessional ? 'SYSTEM ACTIVE' : 'Version 4.2.0'}
            </h2>
            <p className="text-zinc-100 text-[11px] font-poppins font-bold mb-6 uppercase tracking-widest opacity-90">
              {isProfessional ? 'Last stock sync: 4 minutes ago' : '342 new parts added this week'}
            </p>
            <button className="bg-white text-black px-6 py-3 rounded-2xl text-[11px] font-poppins font-bold uppercase tracking-[0.2em] transition-transform active:scale-95 shadow-xl">
              {isProfessional ? 'Sync Inventory' : 'Check Updates'}
            </button>
          </div>
          <div className="absolute top-[-40px] right-[-20px] w-48 h-48 bg-[#C8102E] opacity-20 blur-3xl rounded-full"></div>
        </div>

        {isProfessional ? (
          <section className="animate-ios space-y-5" style={{ animationDelay: '100ms' }}>
            <div className="flex justify-between items-center px-1">
              <h3 className="font-poppins font-black text-black text-[11px] uppercase tracking-[0.3em]">Business Intelligence</h3>
              <span className="text-[11px] font-poppins font-bold text-zinc-950 uppercase tracking-widest">Live Sync</span>
            </div>
            
            <div className="grid grid-cols-2 gap-5">
              <Card onClick={() => onNavigate('my_enquiries')} className="bg-white border-none shadow-md p-6 flex flex-col space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-[#C8102E]">
                    <Icon name="cog" className="w-7 h-7" />
                  </div>
                  <span className="bg-red-600 text-white text-[10px] font-poppins font-bold px-2 py-1 rounded-lg animate-pulse">12 NEW</span>
                </div>
                <div>
                  <h4 className="text-3xl font-poppins font-black text-black leading-none">24</h4>
                  <p className="text-[10px] font-poppins font-bold text-zinc-950 uppercase tracking-widest mt-1">Pending Enquiries</p>
                </div>
              </Card>

              <Card className="bg-white border-none shadow-md p-6 flex flex-col space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-700">
                    <Icon name="truck" className="w-7 h-7" />
                  </div>
                </div>
                <div>
                  <h4 className="text-3xl font-poppins font-black text-black leading-none">8</h4>
                  <p className="text-[10px] font-poppins font-bold text-zinc-950 uppercase tracking-widest mt-1">Low Stock Alerts</p>
                </div>
              </Card>

              <Card className="col-span-2 bg-white border-none shadow-md p-6 flex items-center justify-between">
                <div className="flex items-center space-x-5">
                  <div className="w-16 h-16 bg-blue-50 rounded-[24px] flex items-center justify-center text-blue-800">
                    <Icon name="store" className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-poppins font-black text-black uppercase tracking-widest mb-0.5">Customer Satisfaction</h4>
                    <p className="text-[10px] font-poppins font-bold text-zinc-950 uppercase opacity-80">Avg response: 2.4h</p>
                  </div>
                </div>
                <div className="text-right">
                   <span className="text-2xl font-poppins font-black text-green-700">98%</span>
                </div>
              </Card>
            </div>
          </section>
        ) : (
          <section className="animate-ios" style={{ animationDelay: '100ms' }}>
            <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="font-poppins font-black text-black text-[11px] uppercase tracking-[0.3em]">Saved Garage</h3>
              <button 
                onClick={() => onNavigate('my_garage')}
                className="text-[#C8102E] text-[11px] font-poppins font-bold uppercase tracking-widest"
              >
                VIEW ALL
              </button>
            </div>
            <Card 
              onClick={() => onNavigate('my_garage')}
              className="flex items-center space-x-5 p-6 rounded-[32px] shadow-md"
            >
              <div className="w-16 h-16 bg-red-50 rounded-[20px] flex items-center justify-center text-[#C8102E]">
                <Icon name="car" className="w-9 h-9" />
              </div>
              <div className="flex-1">
                <h4 className="font-poppins font-black text-base text-black uppercase leading-tight tracking-tight">{primaryVehicle?.model || 'No Vehicle Saved'}</h4>
                <p className="text-[11px] font-poppins font-bold text-zinc-950 uppercase tracking-tighter mt-1">
                  {primaryVehicle ? `${primaryVehicle.year} • ${primaryVehicle.engine}` : 'Tap to add your car'}
                </p>
              </div>
              <Icon name="arrow-right" className="w-5 h-5 text-zinc-950" />
            </Card>
          </section>
        )}

        <div className="grid grid-cols-2 gap-5">
          <Card onClick={() => onNavigate('catalog_search')} className="flex flex-col items-center text-center py-10 space-y-4 bg-white border-none shadow-md">
            <div className="w-20 h-20 bg-red-50 rounded-[28px] flex items-center justify-center text-[#C8102E]">
              <Icon name="search" className="w-10 h-10" />
            </div>
            <span className="font-poppins font-black text-[11px] text-black uppercase tracking-[0.15em]">
              {isProfessional ? 'STOCK LOOKUP' : 'CATALOG SEARCH'}
            </span>
          </Card>
          
          <Card onClick={() => onNavigate('favorites')} className="flex flex-col items-center text-center py-10 space-y-4 relative bg-white border-none shadow-md">
            <div className="absolute top-4 right-4 bg-[#C8102E] text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full font-black shadow-lg">3</div>
            <div className="w-20 h-20 bg-zinc-100 rounded-[28px] flex items-center justify-center text-zinc-950">
              <Icon name="heart" className="w-10 h-10" />
            </div>
            <span className="font-poppins font-black text-[11px] text-black uppercase tracking-[0.15em]">WATCHLIST</span>
          </Card>

          {!isProfessional && (
            <Card onClick={() => onNavigate('technical_enquiry')} className="col-span-2 flex items-center justify-between p-8 bg-white border-none shadow-md">
              <div className="flex items-center space-x-5">
                 <div className="w-16 h-16 bg-blue-50 rounded-[24px] flex items-center justify-center text-blue-800">
                  <Icon name="cog" className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-poppins font-black text-base text-black uppercase tracking-tight">Technical Enquiry</h4>
                  <p className="text-[11px] font-poppins font-bold text-zinc-950 uppercase tracking-tighter mt-1">Direct contact with NGK Engineers</p>
                </div>
              </div>
              <Icon name="arrow-right" className="w-6 h-6 text-zinc-950" />
            </Card>
          )}
        </div>
      </div>

      <nav className={`ios-footer safe-area-padding-bottom border-t border-zinc-100 flex justify-around items-center px-1 py-5 shrink-0 shadow-2xl ${isProfessional ? 'bg-zinc-950' : 'bg-white'}`}>
        {/* Fix: Explicitly typing the array to avoid ScreenId assignability error */}
        {(
          [
            { id: 'user_home', label: 'Portal', icon: 'home' },
            { id: 'catalog_search', label: 'Search', icon: 'search' },
            { id: 'my_enquiries', label: isProfessional ? 'Inbox' : 'Enquiries', icon: 'cog' },
            { id: 'dealer_locator', label: isProfessional ? 'Depots' : 'Dealers', icon: 'store' },
          ] as { id: ScreenId; label: string; icon: string }[]
        ).map((tab) => (
          <button 
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex-1 flex flex-col items-center space-y-2 transition-colors ${tab.id === 'user_home' ? 'text-[#C8102E]' : (isProfessional ? 'text-white/60' : 'text-zinc-950')}`}
          >
            <Icon name={tab.icon} className="w-8 h-8" />
            <span className="text-[10px] font-poppins font-black uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default UserHome;