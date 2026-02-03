
import React from 'react';
import MyEnquiries from '../screens/MyEnquiries';
import { RoleFooter } from '../components/UI';

const REnquiries: React.FC<any> = (props) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-hidden relative">
        <MyEnquiries {...props} />
      </div>
      <RoleFooter activeTab="my_enquiries" onNavigate={props.onNavigate} role="Reseller" />
    </div>
  );
};
export default REnquiries;
