import React from 'react'

const Button = ({children, onClick, type, className}) => {
    return (
      <button 
      type={type} 
      onClick={onClick} 
      className={`border text-xl w-1/2 mx-auto font-semibold rounded-lg text-white p-2 ${className}`} 
      >
        {children}
      </button>
    );
  };
  
  export default Button;