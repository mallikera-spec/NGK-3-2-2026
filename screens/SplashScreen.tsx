
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex-1 bg-[#0E1320] flex flex-col items-center justify-center p-10">
      <div className="animate-ios flex flex-col items-center">
        {/* NGK Logo Simulation */}
        <div className="w-24 h-24 bg-[#C8102E] rounded-3xl flex items-center justify-center shadow-2xl mb-6">
          <span className="text-white font-black text-4xl italic">NGK</span>
        </div>
        <h1 className="text-white text-3xl font-bold tracking-tight mb-2">NGK SPARK PLUGS</h1>
        <p className="text-gray-400 text-sm tracking-[0.2em] font-light">INNOVATION FOR ALL</p>
      </div>
    </div>
  );
};

export default SplashScreen;
