
import React, { useState, useRef } from 'react';
import { ScreenId, Vehicle } from '../types';
import { Header, Card, Icon, Badge, Button, Modal } from '../components/UI';
import { GoogleGenAI, Type } from "@google/genai";

interface MyGarageProps {
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
  onBack: () => void;
  onNavigate: (screen: ScreenId) => void;
}

const MyGarage: React.FC<MyGarageProps> = ({ vehicles, setVehicles, onBack, onNavigate }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    engine: '',
    vin: '',
    licenseNo: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({ make: '', model: '', year: '', engine: '', vin: '', licenseNo: '' });
  };

  const handleAddManual = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleSaveVehicle = () => {
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      make: formData.make || 'Unknown',
      model: formData.model || 'New Vehicle',
      year: formData.year || new Date().getFullYear().toString(),
      engine: formData.engine || 'N/A',
      isPrimary: vehicles.length === 0
    };
    setVehicles(prev => [...prev, newVehicle]);
    setIsAddModalOpen(false);
    // As per user request: "navigation should go back to last screen for product selection"
    onBack();
  };

  const removeVehicle = (id: string) => {
    setVehicles(prev => prev.filter(v => v.id !== id));
  };

  const setPrimary = (id: string) => {
    setVehicles(prev => prev.map(v => ({
      ...v,
      isPrimary: v.id === id
    })));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setIsAddModalOpen(true); // Open modal to show progress and later results

    try {
      const base64Data = await fileToBase64(file);
      const extractedData = await scanLicenseDisc(base64Data);
      
      if (extractedData) {
        setFormData({
          make: extractedData.make || '',
          model: extractedData.description || '',
          year: extractedData.expiryDate?.split('-')[0] || '', // Rough estimate from expiry
          engine: extractedData.engineNumber || '',
          vin: extractedData.vin || '',
          licenseNo: extractedData.licenseNumber || ''
        });
      }
    } catch (error) {
      console.error("Scanning failed:", error);
      alert("Failed to extract data. Please fill details manually.");
    } finally {
      setIsScanning(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString().split(',')[1] || '');
      reader.onerror = error => reject(error);
    });
  };

  const scanLicenseDisc = async (base64Image: string) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { inlineData: { mimeType: "image/jpeg", data: base64Image } },
            { text: "Extract vehicle information from this South African license disc. Focus on VIN, license number, make, engine number, and description." }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            vin: { type: Type.STRING },
            licenseNumber: { type: Type.STRING },
            make: { type: Type.STRING },
            engineNumber: { type: Type.STRING },
            description: { type: Type.STRING },
            expiryDate: { type: Type.STRING, description: "YYYY-MM-DD" }
          },
          required: ["vin", "make"]
        }
      }
    });

    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      return null;
    }
  };

  return (
    <div className="flex-1 bg-[#F2F2F7] flex flex-col h-full overflow-hidden">
      <Header title="MY GARAGE" onBack={onBack} onProfile={() => onNavigate('user_profile')} />

      <div className="flex-1 overflow-y-auto p-5 space-y-4 animate-ios">
        {/* Quick Actions Card */}
        <Card className="bg-gradient-to-br from-[#C8102E] to-[#920B21] border-none p-6 text-white shadow-xl">
          <div className="flex flex-col space-y-4">
            <div>
              <h2 className="text-lg font-black uppercase tracking-tight">Rapid Registration</h2>
              <p className="text-[10px] opacity-80 font-bold uppercase tracking-widest">Scan your license disc to add vehicle instantly</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-white text-[#C8102E] py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg flex flex-col items-center justify-center space-y-2 active:scale-95 transition-all"
              >
                <Icon name="camera" className="w-6 h-6" />
                <span>Scan Disc</span>
              </button>
              <button 
                onClick={handleAddManual}
                className="bg-black/20 backdrop-blur-md text-white border border-white/20 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex flex-col items-center justify-center space-y-2 active:scale-95 transition-all"
              >
                <Icon name="plus" className="w-6 h-6" />
                <span>Add Manual</span>
              </button>
            </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            capture="environment" 
            className="hidden" 
          />
        </Card>

        <div className="flex justify-between items-center mb-2 px-1 pt-2">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{vehicles.length} Vehicles Saved</span>
        </div>

        {vehicles.map((v, idx) => (
          <Card 
            key={v.id} 
            className={`animate-ios border-l-4 transition-all ${v.isPrimary ? 'border-l-[#C8102E] shadow-lg' : 'border-l-gray-200'}`}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  {v.isPrimary && <Badge variant="danger">Active Vehicle</Badge>}
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{v.year} Model</span>
                </div>
                <h3 className="text-lg font-black text-black uppercase leading-tight">{v.make} {v.model}</h3>
                <p className="text-[11px] font-bold text-[#C8102E] tracking-tighter mt-1">{v.engine}</p>
              </div>
              <button 
                onClick={() => removeVehicle(v.id)}
                className="p-2 text-gray-300 hover:text-red-500 transition-colors"
              >
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 flex space-x-2">
              <button 
                disabled={v.isPrimary}
                onClick={() => setPrimary(v.id)}
                className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                  v.isPrimary 
                    ? 'bg-gray-50 text-gray-400 border border-gray-100' 
                    : 'bg-black text-white active:scale-95 shadow-md'
                }`}
              >
                {v.isPrimary ? 'Currently Selected' : 'Set as Active'}
              </button>
              <button 
                onClick={() => onNavigate('catalog_search')}
                className="flex-1 bg-gray-100 text-black py-3 rounded-xl text-[9px] font-black uppercase tracking-widest active:scale-95 flex items-center justify-center space-x-2"
              >
                <Icon name="search" className="w-3.5 h-3.5" />
                <span>Find Parts</span>
              </button>
            </div>
          </Card>
        ))}

        {vehicles.length === 0 && (
          <div className="py-24 flex flex-col items-center justify-center text-center space-y-4 opacity-20">
            <Icon name="car" className="w-20 h-20" />
            <p className="text-sm font-black uppercase tracking-widest">Garage is currently empty</p>
          </div>
        )}
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => {
          setIsAddModalOpen(false);
          setIsScanning(false);
        }} 
        title={isScanning ? "Scanning License..." : "VEHICLE DETAILS"}
      >
        <div className="p-6 space-y-6 pb-12 animate-ios">
          {isScanning ? (
            <div className="py-10 flex flex-col items-center justify-center space-y-6">
              <div className="w-20 h-20 border-4 border-gray-100 border-t-[#C8102E] rounded-full animate-spin"></div>
              <p className="text-xs text-gray-400 font-black uppercase tracking-[0.2em] animate-pulse">Processing RSA License Disc...</p>
            </div>
          ) : (
            <>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest text-center">
                {formData.vin ? "Details extracted successfully. Please verify." : "Enter vehicle details to save them for quick lookups."}
              </p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Make</label>
                    <input 
                      type="text" 
                      value={formData.make}
                      onChange={(e) => handleInputChange('make', e.target.value)}
                      placeholder="e.g. Ford"
                      className="w-full bg-[#F2F2F7] border-none rounded-2xl py-4 px-5 text-sm font-black placeholder-gray-300 outline-none focus:ring-2 ring-[#C8102E]/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Year</label>
                    <input 
                      type="text" 
                      value={formData.year}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      placeholder="e.g. 2021"
                      className="w-full bg-[#F2F2F7] border-none rounded-2xl py-4 px-5 text-sm font-black placeholder-gray-300 outline-none focus:ring-2 ring-[#C8102E]/20"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Model / Description</label>
                  <input 
                    type="text" 
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    placeholder="e.g. Focus RS"
                    className="w-full bg-[#F2F2F7] border-none rounded-2xl py-4 px-5 text-sm font-black placeholder-gray-300 outline-none focus:ring-2 ring-[#C8102E]/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Engine Number</label>
                  <input 
                    type="text" 
                    value={formData.engine}
                    onChange={(e) => handleInputChange('engine', e.target.value)}
                    placeholder="e.g. PNDBDP34279"
                    className="w-full bg-[#F2F2F7] border-none rounded-2xl py-4 px-5 text-sm font-black placeholder-gray-300 outline-none focus:ring-2 ring-[#C8102E]/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">VIN (Chassis)</label>
                  <input 
                    type="text" 
                    value={formData.vin}
                    onChange={(e) => handleInputChange('vin', e.target.value)}
                    placeholder="e.g. MPB2XXMX..."
                    className="w-full bg-[#F2F2F7] border-none rounded-2xl py-4 px-5 text-sm font-black placeholder-gray-300 outline-none focus:ring-2 ring-[#C8102E]/20 uppercase"
                  />
                </div>
              </div>

              <div className="pt-4 flex flex-col space-y-3">
                <Button onClick={handleSaveVehicle}>Save to Garage</Button>
                <button 
                  onClick={() => setIsAddModalOpen(false)} 
                  className="text-[10px] font-black text-gray-400 uppercase py-2"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MyGarage;
