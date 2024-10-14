import React from 'react';
import classNames from 'classnames';

export function Input({ type = 'text', className, ...props }) {
  const baseStyle = 'block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm';
  
  return (
    <input
      type={type}
      className={classNames(baseStyle, className)}
      {...props}
    />
  );
}
