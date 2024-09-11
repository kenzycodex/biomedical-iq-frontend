import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const FormInput = ({ label, name, type, value, onChange, error, icon: Icon }) => {
  return (
    <div className='mb-4'>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
      </label>
      <div className='relative rounded-md shadow-sm'>
        {Icon && (
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Icon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </div>
        )}
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={`block w-full rounded-md ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border ${
            error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
          } shadow-sm focus:outline-none sm:text-sm`}
        />
        {error && (
          <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
            <FiAlertCircle className='h-5 w-5 text-red-500' aria-hidden='true' />
          </div>
        )}
      </div>
      {error && (
        <p className='mt-2 text-sm text-red-600' id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
