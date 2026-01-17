
import React from 'react';

export const PalancaLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    {/* Stylized Palanca Negra Silhouette */}
    <path 
      d="M12 2C12 2 13 4 15 5C17 6 19 6 21 5C20 8 18 10 15 11C13 12 11 11 11 11L10 14C10 14 14 15 16 18C18 21 16 22 14 22C12 22 10 20 8 18C6 16 4 15 2 15C4 13 6 12 8 12L9 8C9 8 7 7 5 7C3 7 1 8 1 8C2 5 4 3 7 2C9 1 11 2 12 2Z" 
      fill="currentColor"
    />
    <path 
      d="M13 3C14.5 4.5 16 4.5 18 4" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
  </svg>
);
