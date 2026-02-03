
import React, { useState, useRef, useEffect } from 'react';
import { ScreenId, CompatibilityResult } from '../types';
import { Header, Card, Icon, Badge, Button, Modal } from '../components/UI';

const Product3DViewer: React.FC<{ imageUrl: string; isFullScreen?: boolean; onClose?: () => void }> = ({ imageUrl, isFullScreen, onClose }) => {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const initialPinchDistance = useRef<number | null>(null);
  const lastZoom = useRef(1);

  const getDistance = (touches: React.TouchList) => {
    return Math.hypot(
      touches[0].pageX - touches[1].pageX,
      touches[0].pageY - touches[1].pageY
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      initialPinchDistance.current = getDistance(e.touches);
      lastZoom.current = zoom;
    } else if (e.touches.length === 1) {
      isDragging.current = true;
      lastX.current = e.touches[0].clientX;
      lastY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistance.current !== null) {
      e.preventDefault();
      const currentDistance = getDistance(e.touches);
      const scale = currentDistance / initialPinchDistance.current;
      const nextZoom = Math.min(Math.max(0.5, lastZoom.current * scale), 4);
      setZoom(nextZoom);
    } else if (e.touches.length === 1 && isDragging.current) {
      const clientX = e.touches[0].clientX;
      const deltaX = clientX - lastX.current;
      setRotation(prev => prev + deltaX * 0.8);
      lastX.current = clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      initialPinchDistance.current = null;
    }
    if (e.touches.length === 0) {
      isDragging.current = false;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastX.current;
    setRotation(prev => prev + deltaX * 0.8);
    lastX.current = e.clientX;
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY * -0.001;
    setZoom(prev => Math.min(Math.max(0.5, prev + delta), 4));
  };

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 z-[250] bg-black/95 flex flex-col items-center justify-center animate-ios backdrop-blur-xl touch-none">
        <div className="absolute top-12 left-6 z-[260]">
          <h2 className="text-white font-black text-[10px] uppercase tracking-[0.3em]">360° Technical Inspection</h2>
        </div>
        <button onClick={onClose} className="absolute top-10 right-6 z-[260] p-4 bg-white/10 rounded-full text-white active:scale-90 shadow-2xl border border-white/10 backdrop-blur-md">
          <Icon name="close" className="w-6 h-6" />
        </button>
        
        <div 
          className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing" 
          onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={stopDragging} onMouseLeave={stopDragging} 
          onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          <div style={{ transform: `rotateY(${rotation}deg) scale(${zoom})`, perspective: '2000px', transition: isDragging.current ? 'none' : 'transform 0.1s linear' }}>
            <img src={imageUrl} alt="Product" className="max-w-[300px] max-h-[400px] object-contain drop-shadow-[0_60px_100px_rgba(200,16,46,0.3)] select-none" draggable={false} />
          </div>
        </div>

        <div className="absolute bottom-12 flex flex-col items-center space-y-2">
          <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.4em]">Pinch to Zoom • Drag to Rotate</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[240px] bg-[#F8F9FA] flex items-center justify-center rounded-[32px] overflow-hidden border border-gray-100 shadow-inner touch-none">
      <div 
        className="w-full h-full flex flex-col items-center justify-center transition-transform duration-75 cursor-grab active:cursor-grabbing" 
        style={{ perspective: '1000px' }}
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={stopDragging} onMouseLeave={stopDragging}
        onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        <div style={{ transform: `rotateY(${rotation}deg) scale(${zoom})`, transition: isDragging.current ? 'none' : 'transform 0.1s linear' }}>
          <img src={imageUrl} alt="Part" className="max-w-[140px] max-h-[140px] object-contain drop-shadow-2xl select-none" draggable={false} />
        </div>
        <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.2em] mt-3">PINCH TO MAGNIFY • DRAG TO ROTATE</p>
      </div>
      <div className="absolute top-4 left-4 bg-[#C8102E] text-white text-[7px] font-black px-2.5 py-1 rounded-md uppercase tracking-[0.1em] shadow-lg shadow-red-500/10 flex items-center space-x-1 pointer-events-none">
        <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <span>3D MAGNIFICATION</span>
      </div>
    </div>
  );
};

// Interface for SearchResults component props
interface SearchResultsProps {
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
  activeVehicle: string;
  onProfile?: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ onNavigate, onBack, activeVehicle, onProfile }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isCheckingStock, setIsCheckingStock] = useState(false);
  const [stockStatus, setStockStatus] = useState<string | null>(null);
  
  // Swipe Logic Refs for card navigation
  const touchStartX = useRef<number | null>(null);
  const swipeMinDistance = 60;

  const results: CompatibilityResult[] = [
    {
      id: '1',
      name: 'Excel-G Premium Shock Absorber',
      partNumber: '339700',
      category: 'Suspension',
      isCompatible: true,
      specs: { engine: '1.8L TFSI', fuel: 'Petrol', drivetrain: 'FWD / Quattro' },
      imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600',
      details: {
        frontPicto: 'P34-01',
        frontPremium: 'Grade A+',
        frontExcel: '339700',
        frontGasAJust: '554001',
        frontMountingKit: 'SM501',
        frontProtectionKit: 'PK001',
        rearFittingType: 'Eyelet',
        rearPremium: 'Grade B',
        rearExcelG: '344500',
        rearGasAJust: '553002',
        rearMountingKit: 'SM502',
        rearProtectionKit: 'PK002',
      }
    },
    {
      id: '2',
      name: 'Performance Iridium Spark Plug',
      partNumber: 'BKR6EIX-11',
      category: 'Ignition',
      isCompatible: true,
      specs: { engine: '1.8L / 2.0L TDI', fuel: 'Multi-Fuel', drivetrain: 'All Variants' },
      imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=600',
    }
  ];

  const handleCheckStock = () => {
    setIsCheckingStock(true);
    setStockStatus(null);
    setTimeout(() => {
      setIsCheckingStock(false);
      setStockStatus("Found: 12 units available at nearby regional warehouse.");
    }, 1500);
  };

  const handlePrevProduct = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      setStockStatus(null);
    }
  };

  const handleNextProduct = () => {
    if (selectedIndex !== null && selectedIndex < results.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      setStockStatus(null);
    }
  };

  const handleContainerTouchStart = (e: React.TouchEvent) => {
    // Only handle swipe if it's 1 finger and not on the 3D viewer (which uses touch-none)
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleContainerTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || selectedIndex === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX;

    if (Math.abs(distance) > swipeMinDistance) {
      if (distance > 0) {
        handleNextProduct();
      } else {
        handlePrevProduct();
      }
    }
    touchStartX.current = null;
  };

  const selectedProduct = selectedIndex !== null ? results[selectedIndex] : null;

  return (
    <div className="flex-1 bg-[#F2F2F7] flex flex-col h-full overflow-hidden">
      <Header title="VERIFIED PARTS" onBack={onBack} onProfile={onProfile} />
      
      <div className="flex-1 overflow-y-auto p-5 space-y-4 animate-ios pb-20">
        <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 mb-2 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Active Reference</p>
            <h4 className="font-bold text-black text-sm uppercase truncate max-w-[200px]">{activeVehicle || 'Global Database'}</h4>
          </div>
          <Icon name="cog" className="w-5 h-5 text-gray-200" />
        </div>

        {results.map((item, index) => (
          <Card key={item.id} onClick={() => setSelectedIndex(index)} className="animate-ios border-none shadow-sm rounded-[24px]">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-1 flex-1">
                <Badge variant={item.isCompatible ? 'success' : 'danger'}>{item.isCompatible ? 'Verified fit' : 'Incompatible'}</Badge>
                <h3 className="font-black text-black text-base uppercase mt-1 tracking-tight">{item.name}</h3>
                <p className="text-xs font-black text-[#C8102E] tracking-tighter">{item.partNumber}</p>
              </div>
              <Icon name="heart" className="w-5 h-5 text-gray-200" />
            </div>
            <Button onClick={() => setSelectedIndex(index)} variant="black" className="py-3.5 text-[10px]">View Technical Specs</Button>
          </Card>
        ))}
      </div>

      <Modal 
        isOpen={!!selectedProduct} 
        onClose={() => { setSelectedIndex(null); setStockStatus(null); }} 
        title={selectedProduct?.partNumber || "PART DETAILS"}
      >
        <div 
          className="flex flex-col h-full bg-white relative animate-ios touch-pan-y"
          onTouchStart={handleContainerTouchStart}
          onTouchEnd={handleContainerTouchEnd}
        >
          {/* Swiper Progress Dots */}
          <div className="absolute top-0 left-0 right-0 flex justify-center space-x-1.5 py-1 z-30 pointer-events-none">
            {results.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1 rounded-full transition-all duration-300 ${idx === selectedIndex ? 'w-4 bg-[#C8102E]' : 'w-1 bg-gray-200'}`}
              />
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-5 pb-[140px]">
            <section className="animate-ios" onDoubleClick={() => setIsFullScreen(true)}>
              <Product3DViewer imageUrl={selectedProduct?.imageUrl || ''} />
            </section>

            <section className="animate-ios space-y-1">
              <div className="flex items-center space-x-2 mb-1">
                <Badge variant="success">VERIFIED FIT</Badge>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{selectedProduct?.category}</span>
              </div>
              <h1 className="text-2xl font-black text-black leading-tight uppercase tracking-tight">
                {selectedProduct?.name}
              </h1>
              <p className="text-[#C8102E] font-black text-lg tracking-tighter">
                {selectedProduct?.partNumber}
              </p>
            </section>

            {stockStatus && (
              <div className="bg-green-50 p-4 rounded-2xl border border-green-100 animate-ios">
                <p className="text-[10px] font-black text-green-700 uppercase tracking-tight">{stockStatus}</p>
              </div>
            )}

            <section className="animate-ios space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="info" className="w-3.5 h-3.5 text-gray-400" />
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">TECHNICAL SPECIFICATIONS</h3>
              </div>
              
              <div className="bg-[#F8F9FA] rounded-[24px] overflow-hidden border border-gray-100 divide-y divide-gray-50">
                {[
                  { label: 'Year', value: activeVehicle.split(' ').pop() || '2021+' },
                  { label: 'Front Picto', value: selectedProduct?.details?.frontPicto },
                  { label: 'Front Premium', value: selectedProduct?.details?.frontPremium },
                  { label: 'Front Excel', value: selectedProduct?.details?.frontExcel },
                  { label: 'Front GAS-a-Just', value: selectedProduct?.details?.frontGasAJust },
                  { label: 'Front Mounting kit', value: selectedProduct?.details?.frontMountingKit },
                  { label: 'Front Protection Kit', value: selectedProduct?.details?.frontProtectionKit },
                  { label: 'Rear Fitting Type', value: selectedProduct?.details?.rearFittingType },
                  { label: 'Rear Premium', value: selectedProduct?.details?.rearPremium },
                  { label: 'Rear Excel-G', value: selectedProduct?.details?.rearExcelG },
                  { label: 'Rear GAS-a-Just', value: selectedProduct?.details?.rearGasAJust },
                  { label: 'Rear Mounting Kit', value: selectedProduct?.details?.rearMountingKit },
                  { label: 'Rear Protection Kit', value: selectedProduct?.details?.rearProtectionKit },
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between items-center p-3.5">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">{spec.label}</span>
                    <span className="text-[10px] font-black text-black uppercase">{spec.value || 'N/A'}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md px-4 pt-4 pb-10 border-t border-gray-100 z-[160] max-w-md mx-auto shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <div className="flex flex-row space-x-2 w-full h-14">
              <button 
                onClick={handleCheckStock}
                disabled={isCheckingStock}
                className="flex-1 bg-white border border-gray-200 text-black rounded-xl text-[9px] font-black uppercase tracking-tight shadow-sm active:scale-[0.98] transition-all flex flex-col items-center justify-center disabled:opacity-50"
              >
                {isCheckingStock ? (
                  <div className="w-4 h-4 border-2 border-black/10 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Icon name="search" className="w-4 h-4 mb-0.5" />
                    <span>Stock</span>
                  </>
                )}
              </button>
              <button 
                onClick={() => { setSelectedIndex(null); onNavigate('technical_enquiry'); }}
                className="flex-1 bg-black text-white rounded-xl text-[9px] font-black uppercase tracking-tight shadow-md active:scale-[0.98] transition-all flex flex-col items-center justify-center"
              >
                <Icon name="cog" className="w-4 h-4 mb-0.5 text-white/70" />
                <span>Enquiry</span>
              </button>
              <button 
                onClick={() => { setSelectedIndex(null); onNavigate('dealer_locator'); }}
                className="flex-1 bg-[#C8102E] text-white rounded-xl text-[9px] font-black uppercase tracking-tight shadow-md active:scale-[0.98] transition-all flex flex-col items-center justify-center"
              >
                <Icon name="store" className="w-4 h-4 mb-0.5 text-white/70" />
                <span>Dealers</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {isFullScreen && selectedProduct && (
        <Product3DViewer imageUrl={selectedProduct.imageUrl || ''} isFullScreen={true} onClose={() => setIsFullScreen(false)} />
      )}
    </div>
  );
};

export default SearchResults;
