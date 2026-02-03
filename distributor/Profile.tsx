
import React from 'react';
import UserProfile from '../screens/UserProfile';
import { RoleFooter } from '../components/UI';

const DProfile: React.FC<any> = (props) => {
  return (
    <div className="distributor-theme flex flex-col h-full overflow-hidden">
      <style>{`.ios-header { background-color: #18181b !important; }`}</style>
      <div className="flex-1 overflow-hidden relative">
        <UserProfile {...props} role="Distributor" />
      </div>
      <RoleFooter activeTab="user_profile" onNavigate={props.onNavigate} role="Distributor" />
    </div>
  );
};
export default DProfile;
