
import React from 'react';
import { ScreenId } from '../types';
import { Card, Icon, Header, RoleFooter } from '../components/UI';

interface Props {
  onNavigate: (screen: ScreenId) => void;
  onOpenMenu: () => void;
  onProfile: () => void;
}

const Home: React.FC<Props> = ({ onNavigate, onOpenMenu, onProfile }) => {
  return (
    <div className="flex-1 bg-[#F2F2F7] flex flex-col h-full overflow-hidden">
      <Header title="RESELLER PORTAL" onMenu={onOpenMenu} onProfile={onProfile} />
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div className="rounded-3xl p-6 bg-black text-white shadow-xl animate-ios">
          <span className="bg-[#C8102E] px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest mb-2 inline-block">Workshop Ready</span>
          <h2 className="text-2xl font-black mb-1">Store Inventory</h2>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-tight">Stock Sync: Active • 12 Orders Pending</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card onClick={() => onNavigate('my_enquiries')} className="bg-white border-none shadow-sm p-5 space-y-3">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-[#C8102E]">
              <Icon name="cog" className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-2xl font-black text-black">12</h4>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">New Requests</p>
            </div>
          </Card>
          <Card className="bg-white border-none shadow-sm p-5 space-y-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <Icon name="truck" className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-2xl font-black text-black">3</h4>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Low Stock</p>
            </div>
          </Card>
        </div>
        <Card onClick={() => onNavigate('catalog_search')} className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm">
          <div className="flex items-center space-x-4">
            <Icon name="search" className="w-6 h-6 text-[#C8102E]" />
            <div>
              <h4 className="font-black text-sm uppercase text-black">Instant Catalog</h4>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Find part numbers for customers</p>
            </div>
          </div>
          <Icon name="arrow-right" className="w-4 h-4 text-gray-200" />
        </Card>
      </div>
      <RoleFooter activeTab="user_home" onNavigate={onNavigate} role="Reseller" />
    </div>
  );
};
export default Home;
