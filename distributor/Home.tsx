
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
    <div className="flex-1 bg-zinc-50 flex flex-col h-full overflow-hidden">
      <Header title="DISTRIBUTOR HUB" onMenu={onOpenMenu} onProfile={onProfile} className="bg-zinc-900" />
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div className="rounded-3xl p-6 bg-zinc-900 text-white shadow-xl animate-ios">
          <span className="bg-[#C8102E] px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest mb-2 inline-block">Wholesale Active</span>
          <h2 className="text-2xl font-black mb-1">Logistics Core</h2>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-tight">System Status: Optimal • 4 Depots Online</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Bulk Orders', val: '142', sub: 'In Transit', icon: 'truck', color: 'text-[#C8102E]' },
            { label: 'Stock Value', val: '$2.4M', sub: 'Regional Depots', icon: 'store', color: 'text-zinc-400' },
          ].map((item, i) => (
            <Card key={i} className="bg-white border-none shadow-sm p-5 space-y-3">
              <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center">
                <Icon name={item.icon} className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <h4 className="text-2xl font-black text-black">{item.val}</h4>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
              </div>
            </Card>
          ))}
        </div>
        <Card onClick={() => onNavigate('catalog_search')} className="flex items-center justify-between p-6 bg-black text-white rounded-[32px]">
          <div className="flex items-center space-x-4">
            <Icon name="search" className="w-6 h-6 text-[#C8102E]" />
            <div>
              <h4 className="font-black text-sm uppercase">Global Part Finder</h4>
              <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Cross-reference technical database</p>
            </div>
          </div>
          <Icon name="arrow-right" className="w-4 h-4 text-zinc-700" />
        </Card>
      </div>
      <RoleFooter activeTab="user_home" onNavigate={onNavigate} role="Distributor" />
    </div>
  );
};
export default Home;
