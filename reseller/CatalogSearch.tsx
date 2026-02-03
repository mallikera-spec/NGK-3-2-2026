
import React from 'react';
import CatalogSearch from '../screens/CatalogSearch';

const RCatalog: React.FC<any> = (props) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-hidden relative">
        <CatalogSearch {...props} />
      </div>
    </div>
  );
};
export default RCatalog;
