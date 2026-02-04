import React, { useMemo } from 'react';
import { ScreenId } from '../types';
import { Header, Icon, Button } from '../components/UI';

interface CatalogSearchProps {
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
  onProfile?: () => void;
}

const POPULAR_BRANDS = [
  { name: 'Audi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/256px-Audi-Logo_2016.svg.png' },
  { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/256px-BMW.svg.png' },
  { name: 'Mercedes-Benz', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/256px-Mercedes-Logo.svg.png' },
  { name: 'Volkswagen', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/256px-Volkswagen_logo_2019.svg.png' },
  { name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Toyota_logo_%282020%29.svg/256px-Toyota_logo_%282020%29.svg.png' },
  { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda.svg/256px-Honda.svg.png' },
  { name: 'Ford', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/256px-Ford_logo_flat.svg.png' },
  { name: 'Nissan', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nissan_logo.svg/256px-Nissan_logo.svg.png' },
  { name: 'Hyundai', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/256px-Hyundai_Motor_Company_logo.svg.png' },
];

const CATALOG_DATA = {
  "Passenger": {
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
  "Motorcycle": {
    "Honda": { "CBR 1000RR": ["2020+"], "Africa Twin": ["All"] },
    "BMW": { "S1000RR": ["2019+"], "R1250GS": ["All"] },
    "Yamaha": { "R1": ["2015+"], "MT-07": ["All"] }
  },
  "Garden equipment": {
    "Husqvarna": { "Automower": ["All"] },
    "Stihl": { "MS 170": ["Chain Saw"] }
  },
  "Go Cart": {
    "Rotax": { "Max": ["125 Evo"] },
    "IAME": { "X30": ["125cc"] }
  },
  "Construction machine": {
    "Caterpillar": { "320D": ["Excavator"] },
    "JCB": { "3CX": ["Backhoe Loader"] }
  },
  "Marine": {
    "Yamaha": { "F150": ["Outboard"] },
    "Mercury": { "Verado": ["All"] }
  }
};

const APP_TYPES = [
  "Passenger",
  "Motorcycle",
  "Garden equipment",
  "Go Cart",
  "Construction machine",
  "Marine"
];

const STEP_TITLES: Record<number, string> = {
  1: 'Application Setup',
  2: 'Manufacturer Setup',
  3: 'Series Selection',
  4: 'Variant Selection'
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
    return mfgData ? (mfgData as any)[make] : [];
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

  const getStepTitle = () => {
    if (searchMode === 'part') return 'Global Lookup';
    return STEP_TITLES[currentStep] || 'Vehicle Setup';
  };

  return (
    <div className="flex-1 bg-white flex flex-col h-full overflow-hidden">
      <Header title="PARTS FINDER" onBack={handleHeaderBack} onProfile={onProfile} />
      
      <div className="flex-1 overflow-y-auto p-6 animate-ios flex flex-col pb-40">
        <section className="mb-8 shrink-0">
          <h4 className="text-[11px] font-poppins font-black text-black uppercase ml-1 mb-4 tracking-[0.2em]">Recently Searched</h4>
          <div className="flex flex-wrap gap-3">
            {recentSearches.map((s, i) => (
              <button 
                key={i} 
                onClick={() => searchMode === 'vehicle' ? updateState({ manufacture: s.split(' ')[0], make: s.split(' ')[1] }) : updateState({ partNumber: s })}
                className="bg-zinc-100 border border-zinc-200 px-5 py-3 rounded-2xl text-[12px] font-poppins font-black text-black active:scale-95 transition-transform"
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        <div className="bg-zinc-100 p-1.5 rounded-[24px] flex mb-10 shrink-0 border border-zinc-200 shadow-inner">
          <button 
            onClick={() => updateState({ searchMode: 'vehicle' })}
            className={`flex-1 py-4 text-[12px] font-poppins font-black rounded-2xl transition-all uppercase tracking-widest ${searchMode === 'vehicle' ? 'bg-white shadow-md text-black' : 'text-zinc-950 opacity-60'}`}
          >
            Vehicle Finder
          </button>
          <button 
            onClick={() => updateState({ searchMode: 'part' })}
            className={`flex-1 py-4 text-[12px] font-poppins font-black rounded-2xl transition-all uppercase tracking-widest ${searchMode === 'part' ? 'bg-white shadow-md text-black' : 'text-zinc-950 opacity-60'}`}
          >
            Part Number
          </button>
        </div>

        <div className="flex justify-between items-end border-b-2 border-zinc-100 pb-4 mb-10 shrink-0 min-h-[48px]">
          <h2 className="text-xl font-poppins font-black text-black uppercase tracking-tight">
            {getStepTitle()}
          </h2>
          {searchMode === 'vehicle' && (
            <div className="flex items-center space-x-2 pb-0.5">
              {[1, 2, 3, 4].map((stepNum) => (
                <button
                  key={stepNum}
                  onClick={() => updateState({ currentStep: stepNum })}
                  className={`flex items-center justify-center rounded-xl transition-all duration-300 active:scale-90 ${
                    stepNum === currentStep 
                      ? 'bg-[#C8102E] text-white w-14 h-7 shadow-lg' 
                      : stepNum < currentStep 
                        ? 'bg-zinc-950 text-white w-7 h-7' 
                        : 'bg-zinc-100 text-zinc-400 w-7 h-7 border border-zinc-200 opacity-50'
                  }`}
                >
                  <span className="text-[10px] font-poppins font-black">
                    {stepNum === currentStep ? `S${stepNum}` : stepNum}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1">
          {searchMode === 'vehicle' ? (
            <>
              {currentStep === 1 && (
                <section className="space-y-6 animate-ios">
                  <label className="text-[11px] font-poppins font-black text-black uppercase ml-1 tracking-[0.2em]">1. Choose Application</label>
                  <div className="grid grid-cols-1 gap-4">
                    {APP_TYPES.map(type => (
                      <button 
                        key={type}
                        onClick={() => updateState({ 
                          appType: type, 
                          manufacture: '', 
                          make: '', 
                          model: '',
                          currentStep: 2
                        })}
                        className={`py-6 rounded-3xl font-poppins font-black text-base border-2 transition-all flex items-center justify-between px-8 ${appType === type ? 'border-[#C8102E] bg-red-50 text-[#C8102E]' : 'border-zinc-100 bg-white text-black hover:border-zinc-950 shadow-sm'}`}
                      >
                        <span className="font-black uppercase tracking-tight">{type}</span>
                        {appType === type && <Icon name="check" className="w-6 h-6 text-[#C8102E]" />}
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {currentStep === 2 && (
                <section className="space-y-8 animate-ios">
                  <div className="space-y-4">
                    <label className="text-[11px] font-poppins font-black text-black uppercase tracking-[0.2em] ml-1">2. Select Manufacturer</label>
                    <div className="relative">
                      <select 
                        value={manufacture} 
                        onChange={(e) => updateState({ 
                          manufacture: e.target.value, 
                          make: '', 
                          model: '',
                          currentStep: 3 
                        })}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-3xl py-6 px-8 text-black font-poppins font-black appearance-none outline-none focus:ring-4 ring-[#C8102E]/10 text-xl shadow-sm"
                      >
                        <option value="">Search Brand...</option>
                        {manufactureOptions.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-[#C8102E]">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5 pt-4">
                    <div className="flex items-center justify-between px-1">
                      <label className="text-[11px] font-poppins font-black text-black uppercase tracking-[0.25em]">Popular Makers</label>
                      <div className="h-[2px] flex-1 bg-zinc-100 ml-6"></div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {POPULAR_BRANDS.map((brand) => (
                        <button
                          key={brand.name}
                          onClick={() => updateState({ 
                            manufacture: brand.name, 
                            make: '', 
                            model: '',
                            currentStep: 3 
                          })}
                          className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all active:scale-90 group shadow-sm ${
                            manufacture === brand.name 
                              ? 'border-[#C8102E] bg-red-50/50' 
                              : 'border-zinc-100 bg-white'
                          }`}
                        >
                          <div className="w-12 h-12 mb-3 flex items-center justify-center">
                            <img 
                              src={brand.logo} 
                              alt={brand.name} 
                              className={`max-w-full max-h-full object-contain transition-all duration-300 ${
                                manufacture === brand.name ? 'scale-110' : 'opacity-90 hover:opacity-100'
                              }`}
                            />
                          </div>
                          <span className={`text-[10px] font-poppins font-black uppercase tracking-widest text-center leading-none ${
                            manufacture === brand.name ? 'text-[#C8102E]' : 'text-black'
                          }`}>
                            {brand.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </section>
              )}
              {currentStep > 2 && (
                 <section className="space-y-6 animate-ios">
                    <label className="text-[11px] font-poppins font-black text-black uppercase ml-1 tracking-[0.2em]">{currentStep}. Selection</label>
                    <div className="relative">
                      <select 
                        value={currentStep === 3 ? make : model} 
                        onChange={(e) => {
                          if (currentStep === 3) updateState({ make: e.target.value, currentStep: 4 });
                          else updateState({ model: e.target.value });
                        }}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-3xl py-8 px-8 text-black font-poppins font-black appearance-none outline-none focus:ring-4 ring-[#C8102E]/10 text-2xl shadow-sm uppercase"
                      >
                        <option value="">{currentStep === 3 ? "SELECT SERIES" : "SELECT VARIANT"}</option>
                        {(currentStep === 3 ? makeOptions : modelOptions).map((m: any, i: number) => <option key={i} value={m}>{m}</option>)}
                      </select>
                      <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-[#C8102E]">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                 </section>
              )}
            </>
          ) : (
            <section className="space-y-6 animate-ios">
              <label className="text-[11px] font-poppins font-black text-black uppercase ml-1 tracking-[0.2em]">Enter Part Number</label>
              <div className="relative">
                <Icon name="search" className="absolute left-8 top-1/2 -translate-y-1/2 w-8 h-8 text-[#C8102E]" />
                <input 
                  type="text"
                  placeholder="e.g. BKR6EIX"
                  value={partNumber}
                  onChange={(e) => updateState({ partNumber: e.target.value.toUpperCase() })}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-3xl py-8 pl-20 pr-8 text-black font-poppins font-black placeholder-zinc-300 outline-none focus:ring-4 ring-[#C8102E]/10 text-3xl tracking-tight shadow-sm"
                />
              </div>
              <p className="text-[11px] text-zinc-950 font-poppins font-black px-1 uppercase tracking-tight leading-relaxed">Search our global technical database with at least 3 characters.</p>
            </section>
          )}

          {!isStepValid() && (
            <div className="flex flex-col items-center justify-center py-20 text-center text-zinc-950">
              <Icon name="info" className="w-16 h-16 mb-6 opacity-30" />
              <p className="text-[13px] font-poppins font-black uppercase tracking-widest max-w-[240px]">Fill required fields to continue</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-xl border-t border-zinc-100 px-8 py-8 fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.08)]">
        <button 
          disabled={!isStepValid()}
          onClick={handleNextStep}
          className={`w-full py-6 rounded-[24px] text-base font-poppins font-black uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-2xl disabled:opacity-30 disabled:grayscale ${
            (searchMode === 'vehicle' && currentStep < 4) ? 'bg-zinc-950 text-white' : 'bg-[#C8102E] text-white shadow-red-500/20'
          }`}
        >
          {searchMode === 'vehicle' && currentStep < 4 ? 'Continue Setup' : 'Search Database'}
        </button>
      </div>
    </div>
  );
};

export default CatalogSearch;