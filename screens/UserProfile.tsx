
import React, { useState, useRef } from 'react';
import { UserRole, ScreenId } from '../types';
import { Header, Card, Icon, Badge, Modal, Button } from '../components/UI';

interface UserProfileProps {
  onBack: () => void;
  role: UserRole | null;
  onLogout?: () => void;
  onNavigate?: (screen: ScreenId) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onBack, role, onLogout, onNavigate }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeModal, setActiveModal] = useState<'personal' | 'business' | 'security' | 'notifications' | null>(null);
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states to make the modals truly interactive
  const [personalDetails, setPersonalDetails] = useState({ name: 'JOHN DOE', email: 'john.doe@automotive.com' });
  const [businessDetails, setBusinessDetails] = useState({ company: 'JD Performance Garage', taxId: 'RSA-992-102-X' });
  const [notifications, setNotifications] = useState({ email: true, push: true, sms: false });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'personal':
        return (
          <div className="p-6 space-y-6 animate-ios">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  value={personalDetails.name}
                  onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })}
                  className="w-full bg-[#F2F2F7] border-none rounded-2xl py-4 px-5 text-sm font-black outline-none focus:ring-2 ring-[#C8102E]/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  value={personalDetails.email}
                  onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                  className="w-full bg-[#F2F2F7] border-none rounded-2xl py-4 px-5 text-sm font-black outline-none focus:ring-2 ring-[#C8102E]/20"
                />
              </div>
            </div>
            <Button onClick={() => setActiveModal(null)}>Update Details</Button>
          </div>
        );
      case 'business':
        return (
          <div className="p-6 space-y-6 animate-ios">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Company Name</label>
                <input 
                  type="text" 
                  value={businessDetails.company}
                  onChange={(e) => setBusinessDetails({ ...businessDetails, company: e.target.value })}
                  className="w-full bg-[#F2F2F7] border-none rounded-2xl py-4 px-5 text-sm font-black outline-none focus:ring-2 ring-[#C8102E]/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">VAT / Tax ID</label>
                <input 
                  type="text" 
                  value={businessDetails.taxId}
                  onChange={(e) => setBusinessDetails({ ...businessDetails, taxId: e.target.value })}
                  className="w-full bg-[#F2F2F7] border-none rounded-2xl py-4 px-5 text-sm font-black outline-none focus:ring-2 ring-[#C8102E]/20"
                />
              </div>
            </div>
            <Button onClick={() => setActiveModal(null)}>Save Business Profile</Button>
          </div>
        );
      case 'security':
        return (
          <div className="p-6 space-y-6 animate-ios">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-[#F2F2F7] border-none rounded-2xl py-4 px-5 text-sm font-black outline-none focus:ring-2 ring-[#C8102E]/20" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-[#F2F2F7] border-none rounded-2xl py-4 px-5 text-sm font-black outline-none focus:ring-2 ring-[#C8102E]/20" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-[#F2F2F7] border-none rounded-2xl py-4 px-5 text-sm font-black outline-none focus:ring-2 ring-[#C8102E]/20" />
              </div>
            </div>
            <Button onClick={() => setActiveModal(null)}>Change Password</Button>
          </div>
        );
      case 'notifications':
        return (
          <div className="p-6 space-y-6 animate-ios">
            <div className="space-y-3">
              {[
                { key: 'email', label: 'Email Notifications' },
                { key: 'push', label: 'Push Notifications' },
                { key: 'sms', label: 'SMS Alerts' },
              ].map((pref) => (
                <div key={pref.key} className="flex items-center justify-between p-5 bg-[#F2F2F7] rounded-2xl transition-all">
                  <span className="text-xs font-black uppercase tracking-tight text-gray-700">{pref.label}</span>
                  <button 
                    onClick={() => setNotifications({ ...notifications, [pref.key as keyof typeof notifications]: !notifications[pref.key as keyof typeof notifications] })}
                    className={`w-14 h-7 rounded-full transition-all relative ${notifications[pref.key as keyof typeof notifications] ? 'bg-[#C8102E]' : 'bg-gray-300 shadow-inner'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all ${notifications[pref.key as keyof typeof notifications] ? 'left-8' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
            <Button onClick={() => setActiveModal(null)}>Save Preferences</Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-[#F2F2F7] flex flex-col h-full overflow-hidden relative">
      <Header title="MY PROFILE" onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-6 space-y-8 animate-ios">
        {/* Profile Card Section */}
        <div className="flex flex-col items-center text-center space-y-4 pt-4">
          <div 
            onClick={handleImageClick}
            className="w-24 h-24 rounded-[32px] border-4 border-white shadow-2xl overflow-hidden relative group cursor-pointer active:scale-95 transition-transform"
          >
            <img src={profileImage} alt="Avatar" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Icon name="camera" className="w-8 h-8 text-white" />
            </div>
          </div>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          
          <div>
            <h2 className="text-2xl font-black text-black uppercase tracking-tight">{personalDetails.name}</h2>
            <div className="flex items-center justify-center space-x-2 mt-1">
              <Badge variant="danger">{(role || 'End User').toUpperCase()}</Badge>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Verified Expert</span>
            </div>
          </div>
        </div>

        {/* Stats Grid - Linked to relevant screens */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => onNavigate?.('my_enquiries')}
            className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex flex-col items-center transition-all active:scale-[0.98] active:bg-gray-50 active:shadow-inner text-center"
          >
             <span className="text-3xl font-black text-black">128</span>
             <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Enquiries</span>
          </button>
          <button 
            onClick={() => onNavigate?.('favorites')}
            className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex flex-col items-center transition-all active:scale-[0.98] active:bg-gray-50 active:shadow-inner text-center"
          >
             <span className="text-3xl font-black text-black">14</span>
             <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Saved Items</span>
          </button>
        </div>

        {/* Settings Groups */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] px-1">Account Settings</h3>
          <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100">
             {[
               { id: 'personal', icon: 'user', label: 'Edit Personal Details' },
               { id: 'business', icon: 'store', label: 'Business Profile' },
               { id: 'security', icon: 'cog', label: 'Security & Password' },
               { id: 'notifications', icon: 'heart', label: 'Notification Preferences' },
             ].map((item) => (
               <button 
                key={item.id} 
                onClick={() => setActiveModal(item.id as any)}
                className="w-full flex items-center justify-between p-5 active:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 text-left group"
               >
                 <div className="flex items-center space-x-4">
                   <div className="w-8 h-8 flex items-center justify-center text-gray-300 group-active:text-[#C8102E] transition-colors">
                     <Icon name={item.icon} className="w-5 h-5" />
                   </div>
                   <span className="text-xs font-black text-black uppercase tracking-tight">{item.label}</span>
                 </div>
                 <Icon name="arrow-right" className="w-4 h-4 text-gray-200" />
               </button>
             ))}
          </div>
        </section>

        {/* Logout Section */}
        <div className="pt-6 pb-12">
           <button 
            onClick={() => setShowConfirm(true)}
            className="w-full bg-white border-2 border-red-50/50 py-5 rounded-3xl flex items-center justify-center space-x-3 text-[#C8102E] font-black uppercase text-[11px] tracking-widest active:bg-red-50 transition-all shadow-sm group"
           >
             <div className="w-5 h-5 flex items-center justify-center text-[#C8102E] transition-transform group-active:scale-90">
               <Icon name="close" className="w-4 h-4" />
             </div>
             <span>Secure Sign Out</span>
           </button>
           <p className="text-center text-[9px] font-bold text-gray-300 uppercase mt-4 tracking-widest">App Version 4.2.0 • Build 882</p>
        </div>
      </div>

      {/* Feature Modals */}
      <Modal 
        isOpen={activeModal !== null} 
        onClose={() => setActiveModal(null)} 
        title={(activeModal?.replace('_', ' ') || '').toUpperCase()}
      >
        {renderModalContent()}
      </Modal>

      {/* Logout Confirmation Action Sheet */}
      {showConfirm && (
        <div className="absolute inset-0 z-[1000] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-ios-fade" onClick={() => setShowConfirm(false)} />
          <div className="relative p-6 animate-ios-slide-up space-y-3 pb-12">
            <div className="bg-white/90 backdrop-blur-2xl rounded-[32px] overflow-hidden shadow-2xl">
              <div className="p-6 text-center border-b border-gray-100">
                <h4 className="text-[13px] font-black text-black uppercase tracking-widest mb-1">Confirm Sign Out</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Are you sure you want to exit the portal?</p>
              </div>
              <button 
                onClick={() => {
                  setShowConfirm(false);
                  onLogout?.();
                }}
                className="w-full py-5 text-[#C8102E] font-black text-[13px] uppercase tracking-widest active:bg-red-50 transition-colors"
              >
                Log Out
              </button>
            </div>
            <button 
              onClick={() => setShowConfirm(false)}
              className="w-full bg-white py-5 rounded-[24px] text-black font-black text-[13px] uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes ios-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-ios-fade {
          animation: ios-fade 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
