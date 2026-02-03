
import React from 'react';
import Favorites from '../screens/Favorites';
import { RoleFooter } from '../components/UI';

const DFavorites: React.FC<any> = (props) => {
  return (
    <div className="distributor-theme flex flex-col h-full overflow-hidden">
      <style>{`.ios-header { background-color: #18181b !important; }`}</style>
      <div className="flex-1 overflow-hidden relative">
        <Favorites {...props} />
      </div>
      <RoleFooter activeTab="favorites" onNavigate={props.onNavigate} role="Distributor" />
    </div>
  );
};
export default DFavorites;
