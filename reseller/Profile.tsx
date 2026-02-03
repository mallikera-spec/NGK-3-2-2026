
import React from 'react';
import UserProfile from '../screens/UserProfile';
import { RoleFooter } from '../components/UI';

const RProfile: React.FC<any> = (props) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-hidden relative">
        <UserProfile {...props} role="Reseller" />
      </div>
      <RoleFooter activeTab="user_profile" onNavigate={props.onNavigate} role="Reseller" />
    </div>
  );
};
export default RProfile;
