
import React, { useState, useEffect, useRef } from 'react';
import { ScreenId } from '../types';
import { Header, Card, Icon, Badge, Modal } from '../components/UI';

interface MyEnquiriesProps {
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
  onProfile?: () => void;
}

interface Message {
  sender: 'wholesaler' | 'system' | 'user';
  text: string;
  timestamp: string;
}

interface Enquiry {
  id: string;
  customerName?: string;
  date: string;
  status: 'Approved' | 'Pending' | 'Resolved';
  part: string;
  message: string;
  conversation: Message[];
}

const MyEnquiries: React.FC<MyEnquiriesProps> = ({ onNavigate, onBack, onProfile }) => {
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Approved' | 'Pending' | 'Resolved'>('All');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [enquiries, setEnquiries] = useState<Enquiry[]>([
    { 
      id: 'ENQ-8821', 
      customerName: 'Marcus V.',
      date: 'OCT 12, 2023', 
      status: 'Approved', 
      part: 'BKR6EIX-11', 
      message: 'Verification for custom turbo setup.',
      conversation: [
        { sender: 'user', text: 'Will this plug work with a high-boost turbo setup?', timestamp: '10:15 AM' },
        { sender: 'wholesaler', text: 'The BKR6EIX-11 is heat-graded for high performance. It is compatible with your custom setup.', timestamp: '11:30 AM' },
        { sender: 'system', text: 'Enquiry has been approved by technical supervisor.', timestamp: '11:32 AM' }
      ]
    },
    { 
      id: 'ENQ-8742', 
      customerName: 'Sarah K.',
      date: 'SEP 28, 2023', 
      status: 'Pending', 
      part: 'OZA603-N18', 
      message: 'Compatibility with 2024 model year.',
      conversation: [
        { sender: 'user', text: 'Does this fit the new 2024 chassis?', timestamp: '09:00 AM' },
      ]
    },
    { 
      id: 'ENQ-8510', 
      customerName: 'Technical Dept',
      date: 'SEP 15, 2023', 
      status: 'Resolved', 
      part: 'U5014', 
      message: 'Testing ignition coil resistance.',
      conversation: [
        { sender: 'system', text: 'Enquiry resolved by automated diagnostics.', timestamp: '04:00 PM' },
      ]
    },
  ]);

  useEffect(() => {
    const role = localStorage.getItem('user_role') || 'End User';
    setUserRole(role);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (selectedEnquiryId) {
      scrollToBottom();
    }
  }, [selectedEnquiryId, enquiries]);

  const isProfessional = userRole === 'Reseller' || userRole === 'Distributor';
  const selectedEnquiry = enquiries.find(e => e.id === selectedEnquiryId) || null;

  const filteredEnquiries = enquiries.filter(enq => 
    activeFilter === 'All' || enq.status === activeFilter
  );

  const handleSendMessage = () => {
    if (!replyText.trim() || !selectedEnquiryId) return;

    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newMessage: Message = {
      sender: isProfessional ? 'wholesaler' : 'user',
      text: replyText,
      timestamp: timestamp
    };

    setEnquiries(prev => prev.map(enq => {
      if (enq.id === selectedEnquiryId) {
        return {
          ...enq,
          conversation: [...enq.conversation, newMessage]
        };
      }
      return enq;
    }));

    setReplyText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getBadgeVariant = (status: string) => {
    switch(status) {
      case 'Approved': return 'success';
      case 'Pending': return 'warning';
      default: return 'info';
    }
  };

  const filterOptions = ['All', 'Approved', 'Pending', 'Resolved'];

  return (
    <div className="flex-1 bg-[#F2F2F7] flex flex-col h-full overflow-hidden relative">
      <Header title="MY ENQUIRIES" onBack={onBack} onProfile={onProfile} />
      
      {/* Dynamic Filter Panel - Enhanced Contrast */}
      <div className="bg-white px-5 py-4 shadow-sm z-20 border-b border-zinc-100 shrink-0">
        <div className="flex space-x-3 overflow-x-auto pb-1 scrollbar-hide">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setActiveFilter(option as any)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                activeFilter === option 
                  ? 'bg-black text-white border-black shadow-md scale-105' 
                  : 'bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200 hover:text-black'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 animate-ios pb-32">
        <div className="px-1 mb-2">
           <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">
             {isProfessional ? 'CUSTOMER ENQUIRIES' : 'YOUR ENQUIRIES'}
           </h4>
        </div>

        {filteredEnquiries.map((enq, idx) => (
          <Card 
            key={enq.id} 
            className="animate-ios border-none shadow-sm p-6 rounded-[40px] bg-white group active:scale-[0.98] transition-transform" 
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-black text-[#C8102E] uppercase tracking-[0.15em]">{enq.id}</span>
              <Badge variant={getBadgeVariant(enq.status) as any}>{enq.status}</Badge>
            </div>
            
            <h3 className="text-xl font-black text-black uppercase tracking-tight mb-2">
              {enq.part}
            </h3>
            
            <p className="text-sm text-zinc-700 font-medium italic mb-8 leading-relaxed">
              "{enq.message}"
            </p>
            
            <div className="flex justify-between items-center border-t border-zinc-50 pt-6">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.15em]">{enq.date}</span>
              <button 
                onClick={() => setSelectedEnquiryId(enq.id)}
                className="text-[10px] font-black text-black uppercase tracking-[0.15em] flex items-center space-x-1 transition-all group-hover:text-[#C8102E]"
              >
                <span>VIEW DETAILS</span>
                <Icon name="arrow-right" className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          </Card>
        ))}

        {filteredEnquiries.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center opacity-40 text-center space-y-4">
             <Icon name="cog" className="w-16 h-16 text-zinc-400" />
             <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">No enquiries found</p>
          </div>
        )}
      </div>

      {!isProfessional && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-zinc-100 p-6 z-40 max-w-md mx-auto rounded-t-[32px] shadow-2xl">
          <button 
            onClick={() => onNavigate('technical_enquiry')}
            className="w-full bg-[#C8102E] text-white py-5 rounded-[20px] text-[11px] font-black uppercase tracking-[0.2em] shadow-xl active:scale-[0.98] transition-all flex items-center justify-center space-x-3"
          >
            <Icon name="plus" className="w-5 h-5" />
            <span>SUBMIT NEW ENQUIRY</span>
          </button>
        </div>
      )}

      <Modal 
        isOpen={!!selectedEnquiryId} 
        onClose={() => {
          setSelectedEnquiryId(null);
          setReplyText('');
        }} 
        title={isProfessional ? `ENQUIRY FROM ${selectedEnquiry?.customerName}` : `ENQUIRY DETAILS: ${selectedEnquiry?.id}`}
      >
        <div className="flex flex-col h-full bg-zinc-50 animate-ios">
          <div className="p-6 space-y-6 flex-1 overflow-y-auto pb-32">
            {selectedEnquiry?.conversation.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-start' : 'items-end'}`}>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">
                    {msg.sender === 'user' ? 'Customer' : 'Technical Agent'}
                  </span>
                  <span className="text-[8px] text-zinc-400 font-bold">{msg.timestamp}</span>
                </div>
                <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-xs font-bold ${msg.sender === 'user' ? 'bg-white text-zinc-900 rounded-tl-none border border-zinc-100' : 'bg-black text-white rounded-tr-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 bg-white border-t border-zinc-100 safe-area-padding-bottom fixed bottom-0 left-0 right-0 max-w-md mx-auto z-[200]">
            <div className="flex items-center space-x-2 bg-zinc-50 rounded-2xl px-4 py-1 border border-zinc-100 focus-within:border-zinc-300 transition-colors">
               <input 
                type="text" 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isProfessional ? "REPLY TO CUSTOMER..." : "SEND A MESSAGE..." } 
                className="flex-1 bg-transparent border-none outline-none py-3 text-xs font-black uppercase tracking-widest placeholder-zinc-400 text-black" 
               />
               <button 
                onClick={handleSendMessage}
                disabled={!replyText.trim()}
                className="p-2 text-[#C8102E] active:scale-90 transition-transform disabled:opacity-30"
               >
                 <Icon name="arrow-right" className="w-6 h-6 -rotate-90" />
               </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyEnquiries;
