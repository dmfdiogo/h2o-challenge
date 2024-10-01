/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface FormInputProps {
  label: string;
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: 'text' | 'number' | 'date' | 'select' | 'password';
  options?: { value: any; label: string }[];
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, name, value, onChange, type = 'text', options = [], className = '' }) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-textColor">{label}</label>
      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : (
        <input
          type={type === 'number' ? 'text' : type}
          pattern={type === 'number' ? '[0-9]*' : undefined}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
      )}
    </div>
  );
};

export default FormInput;