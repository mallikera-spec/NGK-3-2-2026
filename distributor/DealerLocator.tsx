
import React from 'react';
import DealerLocator from '../screens/DealerLocator';
import { RoleFooter } from '../components/UI';

const DDealers: React.FC<any> = (props) => {
  return (
    <div className="distributor-theme flex flex-col h-full overflow-hidden">
      <style>{`.ios-header { background-color: #18181b !important; }`}</style>
      <div className="flex-1 overflow-hidden relative">
        <DealerLocator {...props} />
      </div>
      <RoleFooter activeTab="dealer_locator" onNavigate={props.onNavigate} role="Distributor" />
    </div>
  );
};
export default DDealers;
