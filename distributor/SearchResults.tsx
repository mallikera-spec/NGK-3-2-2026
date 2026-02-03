
import React from 'react';
import SearchResults from '../screens/SearchResults';

const DResults: React.FC<any> = (props) => {
  return (
    <div className="distributor-theme flex flex-col h-full overflow-hidden">
      <style>{`.ios-header { background-color: #18181b !important; }`}</style>
      <div className="flex-1 overflow-hidden relative">
        <SearchResults {...props} />
      </div>
    </div>
  );
};
export default DResults;
