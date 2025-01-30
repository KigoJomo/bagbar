
import React from 'react';

interface FavsViewProps {
  className?: string
}

const FavsView: React.FC<FavsViewProps> = ({className}) => {
  return (
    <div className={`${className}`}>
      <h3>My Favorites</h3>
    </div>
  );
};

export default FavsView;
