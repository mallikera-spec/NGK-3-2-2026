
import React, { useState } from 'react';
import { Header, Card, Icon, Badge } from '../components/UI';

interface DealerLocatorProps {
  onBack: () => void;
  // Added onProfile prop to fix TypeScript error in App.tsx
  onProfile?: () => void;
}

interface Dealer {
  id: string;
  name: string;
  address: string;
  distance: string;
  phone: string;
  type: 'Reseller' | 'Distributor' | 'Workshop';
  isOpen: boolean;
}

const DealerLocator: React.FC<DealerLocatorProps> = ({ onBack, onProfile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Reseller' | 'Distributor'>('All');

  const dealers: Dealer[] = [
    { id: '1', name: 'Premium Auto Spares', address: '124 Automotive Way, Melbourne', distance: '1.2 km', phone: '03 9888 1234', type: 'Reseller', isOpen: true },
    { id: '2', name: 'Logistics Direct NGK', address: 'Warehouse 4, Logistics Park, VIC', distance: '4.8 km', phone: '03 9555 4321', type: 'Distributor', isOpen: true },
    { id: '3', name: 'Elite Performance Garage', address: '88 Speed Street, Southbank', distance: '5.1 km', phone: '03 9444 8888', type: 'Reseller', isOpen: false },
    { id: '4', name: 'Southern Cross Distributors', address: 'Unit 2, Industrial Dr, Geelong', distance: '62 km', phone: '03 5222 1111', type: 'Distributor', isOpen: true },
    { id: '5', name: 'Metro Car Parts', address: '45 High St, Northcote', distance: '7.5 km', phone: '03 9333 7777', type: 'Reseller', isOpen: true },
  ];

  const filteredDealers = dealers.filter(dealer => {
    const matchesSearch = dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         dealer.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || dealer.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 bg-[#F2F2F7] flex flex-col h-full overflow-hidden">
      {/* Pass onProfile to fix prop error */}
      <Header title="DEALER LOCATOR" onBack={onBack} onProfile={onProfile} />
      
      {/* Search & Filter Header */}
      <div className="bg-white p-5 space-y-4 shadow-sm z-10">
        <div className="relative">
          <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search by city, name or zip..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium focus:ring-2 ring-red-500/20 outline-none transition-all"
          />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
          {['All', 'Reseller', 'Distributor'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f as any)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                activeFilter === f 
                  ? 'bg-black text-white border-black shadow-md' 
                  : 'bg-white text-gray-400 border-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 animate-ios pb-10 safe-area-padding-bottom">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            {filteredDealers.length} Nearest Results
          </span>
          <button className="text-red-600 text-[10px] font-black uppercase flex items-center space-x-1">
             <Icon name="cog" className="w-3 h-3" />
             <span>Map Settings</span>
          </button>
        </div>

        {filteredDealers.map((dealer, idx) => (
          <Card key={dealer.id} className="animate-ios border-l-4 border-l-gray-100" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Badge variant={dealer.type === 'Distributor' ? 'info' : 'success'}>
                    {dealer.type}
                  </Badge>
                  {!dealer.isOpen && <Badge variant="danger">Closed</Badge>}
                </div>
                <h3 className="text-lg font-black text-black uppercase leading-tight">{dealer.name}</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter mt-1">{dealer.address}</p>
              </div>
              <div className="text-right">
                <p className="text-[#C8102E] font-black text-sm">{dealer.distance}</p>
                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Distance</p>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <button className="flex-1 bg-gray-100 text-black py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-2 active:scale-95 transition-all">
                <Icon name="car" className="w-3.5 h-3.5" />
                <span>Navigate</span>
              </button>
              <button className="flex-1 bg-black text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-2 active:scale-95 transition-all">
                <Icon name="truck" className="w-3.5 h-3.5" />
                <span>Call Store</span>
              </button>
            </div>
          </Card>
        ))}

        {filteredDealers.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 opacity-30">
            <Icon name="search" className="w-16 h-16" />
            <p className="text-sm font-black uppercase tracking-widest">No dealers found in this area</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealerLocator;
