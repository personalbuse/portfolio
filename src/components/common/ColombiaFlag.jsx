import React from 'react';

const ColombiaFlag = ({ className = "w-4 h-3" }) => (
  <svg 
    viewBox="0 0 3 2" 
    className={`${className} inline-block rounded-sm shadow-sm align-baseline`}
    aria-hidden="true"
  >
    <rect width="3" height="1" fill="#FCD116"/>
    <rect width="3" height="1" y="1" fill="#003893"/>
    <rect width="3" height="0.5" y="1.5" fill="#CE1126"/>
  </svg>
);

export default ColombiaFlag;
