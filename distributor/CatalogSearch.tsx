
import React from 'react';
import { ScreenId } from '../types';
import CatalogSearch from '../screens/CatalogSearch';

const DCatalog: React.FC<any> = (props) => {
  return (
    <div className="distributor-theme flex flex-col h-full overflow-hidden">
      <style>{`.ios-header { background-color: #18181b !important; }`}</style>
      <div className="flex-1 overflow-hidden relative">
        <CatalogSearch {...props} />
      </div>
    </div>
  );
};
export default DCatalog;
