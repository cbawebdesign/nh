import React from 'react';

type GridListProps = {
  children: React.ReactNode; // This type is for anything that React can render
};

const GridList: React.FC<GridListProps> = ({ children }) => {
  return (
    <div className="mb-16 grid grid-cols-1 gap-y-8 md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-12 lg:gap-x-12">
      {children}
    </div>
  );
};

export default GridList;
