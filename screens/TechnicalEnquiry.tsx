
import React, { useState } from 'react';
import { ScreenId } from '../types';
import { Header, Button } from '../components/UI';

interface TechnicalEnquiryProps {
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
  // Added onProfile prop to fix TypeScript error in App.tsx
  onProfile?: () => void;
}

const TechnicalEnquiry: React.FC<TechnicalEnquiryProps> = ({ onNavigate, onBack, onProfile }) => {
  const [quantity, setQuantity] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onNavigate('user_home');
    }, 2500);
  };

  if (submitted) {
    return (
      <div className="flex-1 bg-white flex flex-col items-center justify-center p-10 text-center animate-ios">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#0B0F1A] mb-2">Enquiry Sent</h2>
        <p className="text-gray-500">Your request has been routed to NGK engineering for verification. You'll receive a notification within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white flex flex-col">
      {/* Pass onProfile to fix prop error */}
      <Header title="Technical Enquiry" onBack={onBack} onProfile={onProfile} />
      
      <div className="flex-1 overflow-y-auto p-5 animate-ios">
        <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start space-x-3">
          <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-blue-700 font-medium">This enquiry will be sent directly to NGK's technical department for application verification.</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Quantity Required</label>
            <div className="flex items-center space-x-4 bg-[#F2F2F7] rounded-2xl p-2">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 bg-white rounded-xl shadow-sm text-lg font-bold text-[#0B0F1A] active:scale-90 transition-transform"
              >
                −
              </button>
              <div className="flex-1 text-center font-bold text-lg">{quantity}</div>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 bg-white rounded-xl shadow-sm text-lg font-bold text-[#0B0F1A] active:scale-90 transition-transform"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Enquiry Details</label>
            <textarea 
              rows={5}
              placeholder="Describe your technical requirement or vehicle modification details..."
              className="w-full bg-[#F2F2F7] border-none rounded-2xl py-4 px-4 text-[#0B0F1A] font-medium placeholder-gray-400 outline-none focus:ring-2 ring-[#C8102E]/20"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Photo Reference (Optional)</label>
            <div className="w-full border-2 border-dashed border-gray-200 rounded-2xl h-32 flex flex-col items-center justify-center text-gray-400">
               <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-[10px] font-bold uppercase">Upload Current Part</span>
            </div>
          </div>
        </div>

        <div className="mt-10 pb-10">
          <Button onClick={handleSubmit}>
            Submit Enquiry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TechnicalEnquiry;
