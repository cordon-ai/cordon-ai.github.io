import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <img 
    src="/components/logo.png" 
    alt="Cordon Logo" 
    className={`${className} object-contain`}
  />
);

export default Logo;