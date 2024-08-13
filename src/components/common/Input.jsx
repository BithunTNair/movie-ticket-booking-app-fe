import React from 'react'
const Input = React.forwardRef(({ type, name, label, value, placeholder, onChange, onBlur, ...props }, ref) => {
    return (
      <div>
        <div className="flex flex-col space-y-2">
          <label htmlFor={name} className="text-sm font-medium text-gray-700">
            {label}
          </label>
          <input
            ref={ref}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...props}
          />
        </div>
      </div>
    );
  });

export default Input