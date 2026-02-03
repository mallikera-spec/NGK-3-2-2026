
import React from 'react';
import { UserRole } from '../types';
import { Card, Icon } from '../components/UI';

interface RoleSelectionProps {
  onSelectRole: (role: UserRole) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  const roles: { id: UserRole; title: string; subtitle: string; icon: string }[] = [
    {
      id: 'End User',
      title: 'Vehicle Owner',
      subtitle: 'Find parts for your personal vehicle',
      icon: 'user'
    },
    {
      id: 'Reseller',
      title: 'Professional Reseller',
      subtitle: 'Inventory lookup & workshop supply',
      icon: 'store'
    },
    {
      id: 'Distributor',
      title: 'Authorized Distributor',
      subtitle: 'Bulk ordering & logistics management',
      icon: 'truck'
    }
  ];

  return (
    <div className="flex-1 bg-white p-6 pt-20 flex flex-col">
      <div className="mb-10 animate-ios">
        <h1 className="text-3xl font-extrabold text-[#0B0F1A] mb-2">Choose your Path</h1>
        <p className="text-gray-500">Select a profile to tailor your experience</p>
      </div>

      <div className="space-y-4">
        {roles.map((role, index) => (
          <Card 
            key={role.id} 
            onClick={() => onSelectRole(role.id)}
            className={`animate-ios`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-[#F2F2F7] rounded-2xl flex items-center justify-center text-[#C8102E]">
                <Icon name={role.icon} className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-[#0B0F1A]">{role.title}</h3>
                <p className="text-sm text-gray-500">{role.subtitle}</p>
              </div>
              <Icon name="arrow-right" className="w-5 h-5 text-gray-300" />
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-auto py-8 text-center text-xs text-gray-400 font-medium">
        NGK SPARK PLUG CO., LTD.
      </div>
    </div>
  );
};

export default RoleSelection;
