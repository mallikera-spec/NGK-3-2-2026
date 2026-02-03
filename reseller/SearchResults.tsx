
import React from 'react';
import SearchResults from '../screens/SearchResults';

const RResults: React.FC<any> = (props) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-hidden relative">
        <SearchResults {...props} />
      </div>
    </div>
  );
};
export default RResults;
