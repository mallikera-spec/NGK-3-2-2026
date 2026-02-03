
import React from 'react';
import MyEnquiries from '../screens/MyEnquiries';
import { RoleFooter } from '../components/UI';

const DEnquiries: React.FC<any> = (props) => {
  return (
    <div className="distributor-theme flex flex-col h-full overflow-hidden">
      <style>{`.ios-header { background-color: #18181b !important; }`}</style>
      <div className="flex-1 overflow-hidden relative">
        <MyEnquiries {...props} />
      </div>
      <RoleFooter activeTab="my_enquiries" onNavigate={props.onNavigate} role="Distributor" />
    </div>
  );
};
export default DEnquiries;
