
import React from 'react';
import DealerLocator from '../screens/DealerLocator';
import { RoleFooter } from '../components/UI';

const RDealers: React.FC<any> = (props) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-hidden relative">
        <DealerLocator {...props} />
      </div>
      <RoleFooter activeTab="dealer_locator" onNavigate={props.onNavigate} role="Reseller" />
    </div>
  );
};
export default RDealers;
