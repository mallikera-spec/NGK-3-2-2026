
import React, { useState, useRef, useEffect } from 'react';
import { ScreenId } from '../types';
import { Header, Card, Icon, Badge, Modal } from '../components/UI';
import { GoogleGenAI } from "@google/genai";

interface FavoritesProps {
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
  onProfile?: () => void;
}

const Product3DViewer: React.FC<{ 
  imageUrl: string; 
  isLoading?: boolean;
  isFullScreen?: boolean; 
  onClose?: () => void 
}> = ({ imageUrl, isLoading, isFullScreen, onClose }) => {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    const clientX = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? (e as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;
    lastX.current = clientX;
    lastY.current = clientY;
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    const clientX = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? (e as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;
    
    const deltaX = clientX - lastX.current;
    const deltaY = clientY - lastY.current;
    
    setRotation(prev => prev + deltaX * 0.8);
    
    if (isFullScreen) {
      const zoomDelta = deltaY * -0.005;
      setZoom(prev => Math.min(Math.max(0.5, prev + zoomDelta), 3));
    }
    
    lastX.current = clientX;
    lastY.current = clientY;
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 z-[250] bg-black/95 flex flex-col items-center justify-center animate-ios backdrop-blur-xl">
        <div className="absolute top-12 left-6 z-[260]">
          <h2 className="text-white font-black text-[10px] uppercase tracking-[0.3em]">360° Technical Inspection</h2>
        </div>
        <button onClick={onClose} className="absolute top-10 right-6 z-[260] p-4 bg-white/10 rounded-full text-white active:scale-90 shadow-2xl border border-white/10 backdrop-blur-md">
          <Icon name="close" className="w-6 h-6" />
        </button>
        
        <div 
          className="w-full h-full flex items-center justify-center touch-none cursor-grab active:cursor-grabbing" 
          onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={stopDragging} onMouseLeave={stopDragging} onTouchStart={handleMouseDown} onTouchMove={handleMouseMove} onTouchEnd={stopDragging}
        >
          <div style={{ transform: `rotateY(${rotation}deg) scale(${zoom})`, perspective: '2000px', transition: isDragging.current ? 'none' : 'transform 0.1s linear' }}>
            <img src={imageUrl} alt="Product" className="max-w-[300px] max-h-[400px] object-contain drop-shadow-[0_60px_100px_rgba(200,16,46,0.3)] select-none" draggable={false} />
          </div>
        </div>

        <div className="absolute bottom-12 flex flex-col items-center space-y-2">
          <p className="text-white/60 text-[9px] font-bold uppercase tracking-[0.4em]">Drag to Rotate • Pinch to Zoom</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[280px] bg-white flex items-center justify-center rounded-[48px] overflow-hidden border border-zinc-100 shadow-[inset_0_2px_12px_rgba(0,0,0,0.02)]">
      {isLoading ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#C8102E]/10 border-t-[#C8102E] rounded-full animate-spin"></div>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Loading 3D Model...</p>
        </div>
      ) : (
        <div 
          className="w-full h-full flex flex-col items-center justify-center transition-transform duration-75 cursor-grab active:cursor-grabbing" 
          style={{ transform: `rotateY(${rotation}deg)`, perspective: '1000px' }}
          onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={stopDragging} onMouseLeave={stopDragging} onTouchStart={handleMouseDown} onTouchMove={handleMouseMove} onTouchEnd={stopDragging}
        >
          <img src={imageUrl} alt="Part" className="max-w-[180px] max-h-[180px] object-contain drop-shadow-2xl select-none" draggable={false} />
        </div>
      )}
      
      <div className="absolute top-8 left-8 bg-[#C8102E] text-white text-[8px] font-black px-4 py-2 rounded-xl uppercase tracking-[0.1em] shadow-lg shadow-red-500/10 flex items-center space-x-2 z-10">
        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
        <span>3D INTERACTIVE</span>
      </div>
    </div>
  );
};

const Favorites: React.FC<FavoritesProps> = ({ onNavigate, onBack, onProfile }) => {
  const [parts, setParts] = useState([
    { 
      id: '1', 
      name: 'IRIDIUM IX SPARK PLUG', 
      partNo: 'BKR6EIX', 
      type: 'IGNITION', 
      price: '$24.99', 
      imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=600',
      details: {
        fitting: 'M14 x 1.25',
        gap: '0.8mm',
        resistor: 'Yes',
        heatRange: '6'
      }
    },
    { 
      id: '2', 
      name: 'OXYGEN SENSOR', 
      partNo: 'OZA603-N18', 
      type: 'SENSORS', 
      price: '$129.00', 
      imageUrl: 'https://images.unsplash.com/photo-1597404294360-fedede44308e?auto=format&fit=crop&q=80&w=600',
      details: {
        fitting: 'Direct Fit',
        wires: '4 Wire',
        length: '350mm',
        type: 'Zirconia'
      }
    },
    { 
      id: '3', 
      name: 'IGNITION COIL', 
      partNo: 'U5014', 
      type: 'IGNITION', 
      price: '$89.95', 
      imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600',
      details: {
        fitting: 'Bolt-on',
        voltage: '12V',
        resistance: '0.8kΩ',
        connection: '3 Pin'
      }
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isCheckingStock, setIsCheckingStock] = useState(false);
  const [stockStatus, setStockStatus] = useState<string | null>(null);
  const [generatedModelUrl, setGeneratedModelUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Swipe logic
  const touchStartX = useRef<number | null>(null);
  const swipeMinDistance = 60;

  const removePart = (id: string) => setParts(parts.filter(p => p.id !== id));
  const selectedProduct = selectedIdx !== null ? parts[selectedIdx] : null;

  const handleCheckStock = () => {
    setIsCheckingStock(true);
    setStockStatus(null);
    setTimeout(() => {
      setIsCheckingStock(false);
      setStockStatus("Found: High stock availability at regional warehouse.");
    }, 1200);
  };

  const handlePrevProduct = () => {
    if (selectedIdx !== null && selectedIdx > 0) {
      setSelectedIdx(selectedIdx - 1);
      setStockStatus(null);
    }
  };

  const handleNextProduct = () => {
    if (selectedIdx !== null && selectedIdx < parts.length - 1) {
      setSelectedIdx(selectedIdx + 1);
      setStockStatus(null);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || selectedIdx === null) return;
    
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

  // Load the "correct model" using Gemini AI
  useEffect(() => {
    const loadAiModel = async () => {
      if (selectedIdx === null || !selectedProduct) return;
      
      setIsGenerating(true);
      setGeneratedModelUrl(null);

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              {
                text: `Isolated high-quality studio product photo of automotive ${selectedProduct.name} (Part Number ${selectedProduct.partNo}). Clean white background, industrial lighting, technical catalog style, ultra sharp focus.`,
              },
            ],
          },
        });
        
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setGeneratedModelUrl(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } catch (error) {
        console.error("Failed to generate correct 3D model visualization:", error);
      } finally {
        setIsGenerating(false);
      }
    };

    if (selectedIdx !== null) {
      loadAiModel();
    }
  }, [selectedIdx]);

  return (
    <div className="flex-1 bg-[#F2F2F7] flex flex-col h-full overflow-hidden">
      <Header title="MY FAVORITES" onBack={onBack} onProfile={onProfile} />
      
      <div className="flex-1 overflow-y-auto p-5 space-y-4 animate-ios pb-24">
        <div className="flex items-center justify-between px-1 mb-2">
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{parts.length} ITEMS SAVED</span>
          <button onClick={() => setIsEditing(!isEditing)} className="text-[#C8102E] text-[10px] font-black uppercase tracking-widest hover:opacity-70 transition-opacity">
            {isEditing ? 'DONE' : 'EDIT LIST'}
          </button>
        </div>

        {parts.map((part, idx) => (
          <Card 
            key={part.id} 
            onClick={() => isEditing ? removePart(part.id) : setSelectedIdx(idx)}
            className="animate-ios border-none shadow-md rounded-[32px] overflow-hidden bg-white p-6" 
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex justify-between items-start mb-2">
              <Badge variant="info">{part.type}</Badge>
              <button 
                className={`transition-all duration-300 ${isEditing ? 'text-red-600 scale-125' : 'text-red-500 active:scale-90'}`}
                onClick={(e) => {
                  if(isEditing) {
                    e.stopPropagation();
                    removePart(part.id);
                  }
                }}
              >
                <Icon name={isEditing ? 'close' : 'heart'} className={`w-5 h-5 ${!isEditing ? 'fill-current' : ''}`} />
              </button>
            </div>
            
            <h3 className="text-lg font-black text-zinc-900 uppercase tracking-tight leading-none mb-1">{part.name}</h3>
            <p className="text-[12px] font-black text-[#C8102E] uppercase tracking-tighter mb-4">{part.partNo}</p>
            
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-sm font-black text-zinc-900">{part.price}</span>
              <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">AVAILABLE</span>
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedIdx(idx); }}
              className="w-full bg-black text-white py-4 rounded-full text-[10px] font-black uppercase tracking-[0.15em] active:scale-[0.98] transition-all flex items-center justify-center space-x-3 shadow-lg"
            >
              <Icon name="search" className="w-4 h-4" />
              <span>VIEW DETAILS</span>
            </button>
          </Card>
        ))}
      </div>

      <Modal 
        isOpen={!!selectedProduct} 
        onClose={() => { setSelectedIdx(null); setStockStatus(null); setGeneratedModelUrl(null); }} 
        title={selectedProduct?.partNo || "PART DETAILS"}
      >
        <div 
          className="flex flex-col h-full bg-white relative animate-ios touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Pips / Dots Indicator */}
          <div className="absolute top-2 left-0 right-0 flex justify-center space-x-1.5 z-30">
            {parts.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1 rounded-full transition-all duration-300 ${idx === selectedIdx ? 'w-6 bg-[#C8102E]' : 'w-1 bg-zinc-200'}`}
              />
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 pt-6 space-y-8 pb-[140px]">
            {/* Swiper Arrows - Exact Screenshot Styling */}
            {selectedIdx !== null && selectedIdx > 0 && (
              <button 
                onClick={(e) => { e.stopPropagation(); handlePrevProduct(); }}
                className="absolute left-2 top-[130px] z-40 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-xl border border-zinc-100 active:scale-90 transition-all text-[#C8102E]"
              >
                <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {selectedIdx !== null && selectedIdx < parts.length - 1 && (
              <button 
                onClick={(e) => { e.stopPropagation(); handleNextProduct(); }}
                className="absolute right-2 top-[130px] z-40 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-xl border border-zinc-100 active:scale-90 transition-all text-[#C8102E]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            <section className="animate-ios" onClick={() => setIsFullScreen(true)}>
              <Product3DViewer 
                imageUrl={generatedModelUrl || selectedProduct?.imageUrl || ''} 
                isLoading={isGenerating}
              />
            </section>

            <section className="animate-ios space-y-1">
              <div className="flex items-center space-x-3 mb-2">
                <Badge variant="success">VERIFIED FIT</Badge>
                <span className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em]">{selectedProduct?.type}</span>
              </div>
              <h1 className="text-3xl font-black text-black leading-tight uppercase tracking-tight">
                {selectedProduct?.name}
              </h1>
              <p className="text-[#C8102E] font-black text-xl tracking-tighter">
                {selectedProduct?.partNo}
              </p>
            </section>

            {stockStatus && (
              <div className="bg-green-50 p-4 rounded-2xl border border-green-100 animate-ios">
                <p className="text-[10px] font-black text-green-700 uppercase tracking-tight">{stockStatus}</p>
              </div>
            )}

            <section className="animate-ios space-y-4">
              <div className="flex items-center space-x-3">
                <Icon name="info" className="w-4 h-4 text-zinc-400" />
                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">QUICK SPECS</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-50 p-8 rounded-[40px] flex flex-col justify-center items-center text-center border border-zinc-100/50">
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">PRICE</span>
                  <span className="text-xl font-black text-zinc-900 leading-none">{selectedProduct?.price}</span>
                </div>
                <div className="bg-zinc-50 p-8 rounded-[40px] flex flex-col justify-center items-center text-center border border-zinc-100/50">
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">STOCK</span>
                  <span className="text-xl font-black text-green-600 uppercase tracking-tight leading-none">HIGH</span>
                </div>
              </div>
              
              {/* Additional Technical Details for Professionals - Enhanced Contrast */}
              <div className="bg-white rounded-[32px] border border-zinc-100 overflow-hidden divide-y divide-zinc-50">
                {Object.entries(selectedProduct?.details || {}).map(([key, val], i) => (
                  <div key={i} className="flex justify-between items-center px-6 py-4">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{key}</span>
                    <span className="text-[11px] font-black text-zinc-900 uppercase">{val as string}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md px-6 pt-4 pb-12 border-t border-zinc-100 z-[160] max-w-md mx-auto">
            <div className="flex flex-row space-x-3 w-full h-16">
              <button 
                onClick={handleCheckStock}
                disabled={isCheckingStock}
                className="flex-1 bg-white border-2 border-zinc-100 text-zinc-900 rounded-[20px] text-[10px] font-black uppercase tracking-widest shadow-sm active:scale-[0.98] transition-all flex flex-col items-center justify-center disabled:opacity-50"
              >
                {isCheckingStock ? (
                  <div className="w-5 h-5 border-2 border-zinc-900/10 border-t-zinc-900 rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Icon name="search" className="w-5 h-5 mb-1" />
                    <span>STOCK</span>
                  </>
                )}
              </button>
              <button 
                onClick={() => { setSelectedIdx(null); onNavigate('technical_enquiry'); }}
                className="flex-1 bg-black text-white rounded-[20px] text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all flex flex-col items-center justify-center hover:bg-zinc-800"
              >
                <Icon name="cog" className="w-5 h-5 mb-1 text-white/80" />
                <span>ENQUIRY</span>
              </button>
              <button 
                onClick={() => { setSelectedIdx(null); onNavigate('dealer_locator'); }}
                className="flex-1 bg-[#C8102E] text-white rounded-[20px] text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all flex flex-col items-center justify-center hover:bg-red-700"
              >
                <Icon name="store" className="w-5 h-5 mb-1 text-white/80" />
                <span>DEALERS</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {isFullScreen && selectedProduct && (
        <Product3DViewer 
          imageUrl={generatedModelUrl || selectedProduct.imageUrl || ''} 
          isFullScreen={true} 
          onClose={() => setIsFullScreen(false)} 
        />
      )}
    </div>
  );
};

export default Favorites;
