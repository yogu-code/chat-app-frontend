import React, { ReactNode } from 'react';
const Button= ({
  children,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  size = 'md',
  onClick,
  disabled = false,
  icon
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5",
    md: "text-sm px-4 py-2.5",
    lg: "text-base px-6 py-3",
  };
  
  const variantClasses = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm focus:ring-indigo-500 disabled:bg-indigo-300",
    secondary: "bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm focus:ring-cyan-500 disabled:bg-cyan-300",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-400",
    ghost: "text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500 disabled:text-gray-300"
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${widthClass}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;