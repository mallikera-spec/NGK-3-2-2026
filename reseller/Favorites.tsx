
import React from 'react';
import Favorites from '../screens/Favorites';
import { RoleFooter } from '../components/UI';

const RFavorites: React.FC<any> = (props) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-hidden relative">
        <Favorites {...props} />
      </div>
      <RoleFooter activeTab="favorites" onNavigate={props.onNavigate} role="Reseller" />
    </div>
  );
};
export default RFavorites;
