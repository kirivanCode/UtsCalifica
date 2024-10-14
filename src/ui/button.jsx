import React from 'react';

export const Button = ({ children, onClick, className }) => {
  return (
    <button 
      onClick={onClick} 
      className={`px-4 py-2 text-black bg-green-500 rounded hover:bg-green-600 ${className}`}
    >
      {children}
    </button>
  );
};
