import React from 'react'
import { ButtonProps } from '@/interfaces';

const Button: React.FC<ButtonProps> = ({children, onClick, type, className}) => {
    return (
      <button 
      type={type} 
      onClick={onClick} 
      className={`border text-xl w-3/5 mx-auto font-semibold rounded-lg text-white p-2 ${className}`} 
      >
        {children}
      </button>
    );
  };
  
  export default Button;