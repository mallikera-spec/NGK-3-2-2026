
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
        title={isProfessional ? `${role?.toUpperCase()} PORTAL` : "NGK Technical"} 
        onMenu={onOpenMenu}
        onProfile={onProfile}
        className={isProfessional ? "bg-black" : ""}
        rightElement={
          <button className="p-2 text-white relative">
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-white rounded-full border border-[#C8102E]"></div>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Role-Based Greeting Banner */}
        <div className={`rounded-3xl p-6 text-white shadow-xl relative overflow-hidden animate-ios ${isProfessional ? 'bg-zinc-900' : 'bg-black'}`}>
          <div className="relative z-10">
            <span className="bg-[#C8102E] px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider mb-2 inline-block">
              {isProfessional ? 'Operational Health' : 'New Release'}
            </span>
            <h2 className="text-2xl font-black mb-1">
              {isProfessional ? 'System Active' : 'Version 4.2.0'}
            </h2>
            <p className="text-gray-400 text-[10px] font-bold mb-4 uppercase tracking-tighter">
              {isProfessional ? 'Last stock sync: 4 minutes ago' : '342 new parts added this week'}
            </p>
            <button className="bg-white text-black px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-transform active:scale-95 shadow-md">
              {isProfessional ? 'Sync Inventory' : 'Check Updates'}
            </button>
          </div>
          <div className="absolute top-[-40px] right-[-20px] w-40 h-40 bg-[#C8102E] opacity-20 blur-3xl rounded-full"></div>
        </div>

        {isProfessional ? (
          /* PRO DASHBOARD METRICS */
          <section className="animate-ios space-y-4" style={{ animationDelay: '100ms' }}>
            <div className="flex justify-between items-center px-1">
              <h3 className="font-black text-black text-[10px] uppercase tracking-[0.2em]">Business Performance</h3>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Live Feed</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card onClick={() => onNavigate('my_enquiries')} className="bg-white border-none shadow-sm p-5 flex flex-col space-y-3">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-[#C8102E]">
                    <Icon name="cog" className="w-5 h-5" />
                  </div>
                  <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full animate-pulse">12 NEW</span>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-black">24</h4>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Pending Enquiries</p>
                </div>
              </Card>

              <Card className="bg-white border-none shadow-sm p-5 flex flex-col space-y-3">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                    <Icon name="truck" className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-black">8</h4>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Low Stock Alerts</p>
                </div>
              </Card>

              <Card className="col-span-2 bg-white border-none shadow-sm p-5 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                    <Icon name="store" className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-black uppercase tracking-widest">Customer Satisfaction</h4>
                    <p className="text-[9px] font-bold text-gray-400 uppercase">Average response time: 2.4h</p>
                  </div>
                </div>
                <div className="text-right">
                   <span className="text-xl font-black text-green-500">98%</span>
                </div>
              </Card>
            </div>
          </section>
        ) : (
          /* END USER GARAGE */
          <section className="animate-ios" style={{ animationDelay: '100ms' }}>
            <div className="flex justify-between items-center mb-3 px-1">
              <h3 className="font-black text-black text-[10px] uppercase tracking-[0.2em]">Saved Garage</h3>
              <button 
                onClick={() => onNavigate('my_garage')}
                className="text-[#C8102E] text-[10px] font-black uppercase tracking-tighter"
              >
                View All
              </button>
            </div>
            <Card 
              onClick={() => onNavigate('my_garage')}
              className="flex items-center space-x-4 p-5 rounded-[24px]"
            >
              <div className="w-12 h-12 bg-[#F2F2F7] rounded-xl flex items-center justify-center text-[#C8102E]">
                <Icon name="car" className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-black text-sm text-black uppercase">{primaryVehicle?.model || 'No Vehicle Saved'}</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  {primaryVehicle ? `${primaryVehicle.year} • ${primaryVehicle.engine}` : 'Tap to add your car'}
                </p>
              </div>
              <Icon name="arrow-right" className="w-4 h-4 text-gray-300" />
            </Card>
          </section>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card onClick={() => onNavigate('catalog_search')} className="flex flex-col items-center text-center py-8 space-y-3 bg-white border-none shadow-sm">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-[#C8102E]">
              <Icon name="search" className="w-7 h-7" />
            </div>
            <span className="font-black text-[10px] text-black uppercase tracking-widest">
              {isProfessional ? 'Inventory Lookup' : 'Catalog Search'}
            </span>
          </Card>
          
          <Card onClick={() => onNavigate('favorites')} className="flex flex-col items-center text-center py-8 space-y-3 relative bg-white border-none shadow-sm">
            <div className="absolute top-3 right-3 bg-[#C8102E] text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-black shadow-lg">3</div>
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
              <Icon name="heart" className="w-7 h-7" />
            </div>
            <span className="font-black text-[10px] text-black uppercase tracking-widest">Watchlist</span>
          </Card>

          {!isProfessional && (
            <Card onClick={() => onNavigate('technical_enquiry')} className="col-span-2 flex items-center justify-between p-6 bg-white border-none shadow-sm">
              <div className="flex items-center space-x-4">
                 <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Icon name="cog" className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-black uppercase">Technical Enquiry</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Direct contact with NGK Engineers</p>
                </div>
              </div>
              <Icon name="arrow-right" className="w-5 h-5 text-gray-300" />
            </Card>
          )}
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className={`ios-footer safe-area-padding-bottom border-t border-white/10 flex justify-around items-center px-1 py-4 shrink-0 shadow-2xl ${isProfessional ? 'bg-zinc-950' : ''}`}>
        <button onClick={() => onNavigate('user_home')} className="flex-1 flex flex-col items-center space-y-1.5 text-white">
          <Icon name="home" className="w-6 h-6" />
          <span className="text-[9px] font-black uppercase tracking-[0.05em]">Portal</span>
        </button>
        
        <button onClick={() => onNavigate('catalog_search')} className="flex-1 flex flex-col items-center space-y-1.5 text-white/50">
          <Icon name="search" className="w-6 h-6" />
          <span className="text-[9px] font-black uppercase tracking-[0.05em]">Search</span>
        </button>

        <button onClick={() => onNavigate('my_enquiries')} className="flex-1 flex flex-col items-center space-y-1.5 text-white/50">
          <Icon name="cog" className="w-6 h-6" />
          <span className="text-[9px] font-black uppercase tracking-[0.05em]">{isProfessional ? 'Inbox' : 'Enquiries'}</span>
        </button>

        <button onClick={() => onNavigate('dealer_locator')} className="flex-1 flex flex-col items-center space-y-1.5 text-white/50">
          <Icon name="store" className="w-6 h-6" />
          <span className="text-[9px] font-black uppercase tracking-[0.05em]">{isProfessional ? 'Depots' : 'Dealers'}</span>
        </button>
      </nav>
    </div>
  );
};

export default UserHome;
