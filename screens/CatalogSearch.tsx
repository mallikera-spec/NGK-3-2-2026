
import React, { useMemo } from 'react';
import { ScreenId } from '../types';
import { Header, Icon, Button } from '../components/UI';

interface CatalogSearchProps {
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
  // Added onProfile prop to fix TypeScript error in App.tsx
  onProfile?: () => void;
}

const POPULAR_BRANDS = [
  { name: 'Audi', logo: 'https://www.carlogos.org/car-logos/audi-logo-2016-640.png' },
  { name: 'BMW', logo: 'https://www.carlogos.org/car-logos/bmw-logo-2020-640.png' },
  { name: 'Mercedes-Benz', logo: 'https://www.carlogos.org/car-logos/mercedes-benz-logo-2011-640.png' },
  { name: 'Volkswagen', logo: 'https://www.carlogos.org/car-logos/volkswagen-logo-2019-640.png' },
  { name: 'Toyota', logo: 'https://www.carlogos.org/car-logos/toyota-logo-2020-640.png' },
  { name: 'Honda', logo: 'https://www.carlogos.org/car-logos/honda-logo-1700x1150.png' },
  { name: 'Ford', logo: 'https://www.carlogos.org/car-logos/ford-logo-2017-640.png' },
  { name: 'Nissan', logo: 'https://www.carlogos.org/car-logos/nissan-logo-2020-640.png' },
  { name: 'Hyundai', logo: 'https://www.carlogos.org/car-logos/hyundai-logo-640.png' },
];

const CATALOG_DATA = {
  "Vehicle": {
    "Audi": {
      "A1": ["80, 82, (B1)"],
      "A3": ["S/Wagon"],
      "A3 Sportback": ["All models~ Excl. Quattro, Sport susp. S4"],
      "A4": ["Quattro sedan, Avant, Standard susp.~ Excl. S4, Sport susp."],
      "A5": ["1.6, 1.9, 2.0 (43, C2)"],
      "A5 Sportback": ["All models"],
      "A6": ["S4 2.2 ~ Excl. 4.2, Sport susp."],
      "A7": ["Cabriolet~ Excl. Telescopic Type Rear Shock"],
      "Cabriolet": ["Hatch 1.2 TFSI, 1.4TFSI, 1.6 TDI (Front struts)"],
      "Q2": ["Hatch 1.2 TSFI, 1.4 TSFI, 1.6 TDI"],
      "Q3": ["Sportback 1.4 TFSi Sport"],
      "Q5": ["1.0 & 1.2 TSFi"],
      "Q7": ["1.4TFSI, 1.8TFSI"],
      "S3": ["1.8 TFSI, 2.0 TDI Quattro"],
      "S4": ["1.8, 1.8 Turbo"],
      "S5": ["2.0 FSI, 2.0 TDI"],
      "S6": ["2.0 FSI, 2.0 TDI"],
      "TT": ["A3 8v1-8vk 55mm Shaft"]
    },
    "BMW": {
      "3 Series": ["318i", "320i", "330e Hybrid"],
      "5 Series": ["520d", "530i"]
    },
    "Mercedes-Benz": {
      "A-Class": ["A180", "A200"],
      "C-Class": ["C200", "C300"]
    },
    "Volkswagen": {
      "Golf": ["GTI", "R", "TDI"],
      "Tiguan": ["162 TSI", "110 TDI"]
    }
  },
  "Commercial": {
    "Mercedes-Benz": {
      "Sprinter": ["314 CDI", "316 CDI"],
      "Vito": ["114 CDI", "116 CDI"]
    }
  }
};

const CatalogSearch: React.FC<CatalogSearchProps> = ({ onNavigate, onBack, state, setState, onProfile }) => {
  const { appType, manufacture, make, model, currentStep, searchMode = 'vehicle', partNumber = '' } = state;

  const manufactureOptions = useMemo(() => {
    const typeData = CATALOG_DATA[appType as keyof typeof CATALOG_DATA];
    return typeData ? Object.keys(typeData) : [];
  }, [appType]);

  const makeOptions = useMemo(() => {
    if (!manufacture) return [];
    const typeData = CATALOG_DATA[appType as keyof typeof CATALOG_DATA];
    const mfgData = typeData ? (typeData as any)[manufacture] : null;
    return mfgData ? Object.keys(mfgData) : [];
  }, [appType, manufacture]);

  const modelOptions = useMemo(() => {
    if (!manufacture || !make) return [];
    const typeData = CATALOG_DATA[appType as keyof typeof CATALOG_DATA];
    const mfgData = typeData ? (typeData as any)[manufacture] : null;
    const makeData = mfgData ? mfgData[make] : null;
    return makeData || [];
  }, [appType, manufacture, make]);

  const updateState = (updates: any) => setState((prev: any) => ({ ...prev, ...updates }));

  const handleNextStep = () => {
    if (searchMode === 'vehicle') {
      if (currentStep < 4) {
        updateState({ currentStep: currentStep + 1 });
      } else {
        onNavigate('search_results');
      }
    } else {
      onNavigate('search_results');
    }
  };

  const handleHeaderBack = () => {
    if (searchMode === 'vehicle' && currentStep > 1) {
      updateState({ currentStep: currentStep - 1 });
    } else {
      onBack();
    }
  };

  const isStepValid = () => {
    if (searchMode === 'part') return partNumber.length >= 3;
    
    if (currentStep === 1) return !!appType;
    if (currentStep === 2) return !!manufacture;
    if (currentStep === 3) return !!make;
    if (currentStep === 4) return !!model;
    return false;
  };

  const recentSearches = searchMode === 'vehicle' ? ['Audi A4 (2022)', 'VW Golf GTI'] : ['BKR6EIX-11', 'OZA603-N18'];

  return (
    <div className="flex-1 bg-white flex flex-col h-full overflow-hidden">
      {/* Pass onProfile to fix prop error */}
      <Header title="Product Discovery" onBack={handleHeaderBack} onProfile={onProfile} />
      
      <div className="flex-1 overflow-y-auto p-5 animate-ios flex flex-col pb-32">
        <section className="mb-6 shrink-0">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-3 tracking-widest">Recently Searched</h4>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((s, i) => (
              <button 
                key={i} 
                onClick={() => searchMode === 'vehicle' ? updateState({ manufacture: s.split(' ')[0], make: s.split(' ')[1] }) : updateState({ partNumber: s })}
                className="bg-[#F2F2F7] px-4 py-2 rounded-full text-[11px] font-bold text-gray-700 active:scale-95 transition-transform"
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        <div className="bg-gray-100 p-1 rounded-2xl flex mb-8 shrink-0">
          <button 
            onClick={() => updateState({ searchMode: 'vehicle' })}
            className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${searchMode === 'vehicle' ? 'bg-white shadow-sm text-[#0B0F1A]' : 'text-gray-400'}`}
          >
            Vehicle Finder
          </button>
          <button 
            onClick={() => updateState({ searchMode: 'part' })}
            className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${searchMode === 'part' ? 'bg-white shadow-sm text-[#0B0F1A]' : 'text-gray-400'}`}
          >
            Part Number
          </button>
        </div>

        <div className="flex justify-between items-end border-b border-gray-100 pb-2 mb-8 shrink-0">
          <h2 className="text-xl font-bold text-[#0B0F1A]">
            {searchMode === 'vehicle' ? 'Vehicle Details' : 'Component Lookup'}
          </h2>
          {searchMode === 'vehicle' && (
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Step {currentStep} of 4</span>
          )}
        </div>

        <div className="flex-1">
          {searchMode === 'vehicle' ? (
            <>
              {currentStep === 1 && (
                <section className="space-y-4 animate-ios">
                  <label className="text-[11px] font-extrabold text-[#0B0F1A] uppercase ml-1 tracking-widest">1. Application Type</label>
                  <div className="grid grid-cols-1 gap-3">
                    {['Vehicle', 'Commercial'].map(type => (
                      <button 
                        key={type}
                        onClick={() => updateState({ 
                          appType: type, 
                          manufacture: '', 
                          make: '', 
                          model: '',
                          currentStep: 2
                        })}
                        className={`py-6 rounded-2xl font-bold text-base border-2 transition-all flex items-center justify-between px-6 ${appType === type ? 'border-[#C8102E] bg-red-50 text-[#C8102E]' : 'border-gray-50 bg-gray-50 text-gray-400'}`}
                      >
                        <span className="font-extrabold">{type === 'Vehicle' ? 'Passenger Vehicle' : 'Commercial Vehicle'}</span>
                        {appType === type && <Icon name="check" className="w-5 h-5 text-[#C8102E]" />}
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {currentStep === 2 && (
                <section className="space-y-6 animate-ios">
                  <div className="space-y-4">
                    <label className="text-[11px] font-extrabold text-[#0B0F1A] uppercase tracking-widest">2. Manufacturer</label>
                    <div className="relative">
                      <select 
                        value={manufacture} 
                        onChange={(e) => updateState({ 
                          manufacture: e.target.value, 
                          make: '', 
                          model: '',
                          currentStep: 3 
                        })}
                        className="w-full bg-[#F2F2F7] border-none rounded-2xl py-6 px-6 text-[#0B0F1A] font-black appearance-none outline-none focus:ring-2 ring-[#C8102E]/20 text-xl"
                      >
                        <option value="">Select Brand</option>
                        {manufactureOptions.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>

                  {/* Popular Brand Selection Grid */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between px-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Popular Brands</label>
                      <div className="h-[1px] flex-1 bg-gray-100 ml-4"></div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      {POPULAR_BRANDS.map((brand) => (
                        <button
                          key={brand.name}
                          onClick={() => updateState({ 
                            manufacture: brand.name, 
                            make: '', 
                            model: '',
                            currentStep: 3 
                          })}
                          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all active:scale-95 group ${
                            manufacture === brand.name 
                              ? 'border-[#C8102E] bg-red-50/30' 
                              : 'border-gray-100 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="w-10 h-10 mb-2 flex items-center justify-center">
                            <img 
                              src={brand.logo} 
                              alt={brand.name} 
                              className={`max-w-full max-h-full object-contain grayscale transition-all ${
                                manufacture === brand.name ? 'grayscale-0' : 'group-hover:grayscale-0'
                              }`}
                            />
                          </div>
                          <span className={`text-[9px] font-black uppercase tracking-widest text-center ${
                            manufacture === brand.name ? 'text-[#C8102E]' : 'text-gray-400'
                          }`}>
                            {brand.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {currentStep === 3 && (
                <section className="space-y-4 animate-ios">
                  <label className="text-[11px] font-extrabold text-[#0B0F1A] uppercase ml-1 tracking-widest">3. Make / Model</label>
                  <div className="relative">
                    <select 
                      value={make} 
                      onChange={(e) => updateState({ 
                        make: e.target.value, 
                        model: '',
                        currentStep: 4 
                      })}
                      className="w-full bg-[#F2F2F7] border-none rounded-2xl py-6 px-6 text-[#0B0F1A] font-black appearance-none outline-none focus:ring-2 ring-[#C8102E]/20 text-xl"
                    >
                      <option value="">Select Series</option>
                      {makeOptions.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </section>
              )}

              {currentStep === 4 && (
                <section className="space-y-4 animate-ios">
                  <label className="text-[11px] font-extrabold text-[#0B0F1A] uppercase ml-1 tracking-widest">4. Variant / Specification</label>
                  <div className="relative">
                    <select 
                      value={model} 
                      onChange={(e) => updateState({ model: e.target.value })}
                      className="w-full bg-[#F2F2F7] border-none rounded-2xl py-6 px-6 text-[#0B0F1A] font-black appearance-none outline-none focus:ring-2 ring-[#C8102E]/20 text-xl"
                    >
                      <option value="">Select Variant</option>
                      {modelOptions.map((m, i) => <option key={i} value={m}>{m}</option>)}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </section>
              )}
            </>
          ) : (
            <section className="space-y-4 animate-ios">
              <label className="text-[11px] font-extrabold text-[#0B0F1A] uppercase ml-1 tracking-widest">Enter Part Number</label>
              <div className="relative">
                <Icon name="search" className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input 
                  type="text"
                  placeholder="e.g. BKR6EIX"
                  value={partNumber}
                  onChange={(e) => updateState({ partNumber: e.target.value.toUpperCase() })}
                  className="w-full bg-[#F2F2F7] border-none rounded-2xl py-6 pl-16 pr-6 text-[#0B0F1A] font-black placeholder-gray-300 outline-none focus:ring-2 ring-[#C8102E]/20 text-xl tracking-tight"
                />
              </div>
              <p className="text-[10px] text-gray-400 font-bold px-1 uppercase tracking-tighter">Enter at least 3 characters to search the global technical database.</p>
            </section>
          )}

          {!isStepValid() && (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
              <Icon name="info" className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-sm font-bold max-w-[280px]">Complete this selection to proceed.</p>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Button */}
      <div className="bg-white/80 backdrop-blur-md border-t border-gray-100 px-6 py-6 fixed bottom-0 left-0 right-0 max-w-md mx-auto z-20">
        <button 
          disabled={!isStepValid()}
          onClick={handleNextStep}
          className={`w-full py-5 rounded-2xl text-base font-black uppercase tracking-wider transition-all active:scale-95 shadow-lg disabled:opacity-50 disabled:grayscale ${
            (searchMode === 'vehicle' && currentStep < 4) ? 'bg-[#5B6271] text-white' : 'bg-[#C8102E] text-white'
          }`}
        >
          {searchMode === 'vehicle' && currentStep < 4 ? 'Continue Selection' : 'Find Compatible Parts'}
        </button>
      </div>
    </div>
  );
};

export default CatalogSearch;
