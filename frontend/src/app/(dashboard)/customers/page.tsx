'use client'
import Button from '@/components/layout/button';
import ErrorMessage from '@/components/layout/ErrorMessage';
import FormInput from '@/components/layout/form-input';
import useCustomerAPI from '@/api/customer-api';
import React, { useState } from 'react';

const CustomerPage: React.FC = () => {
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { createCustomer } = useCustomerAPI();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCreateCustomer = async () => {
    setLoading(true);
    setError(null);

    const newCustomer = {
      ...customerDetails,
      accounts: [],
    };

    try {
      await createCustomer(newCustomer);
      alert('Customer created successfully');
      setCustomerDetails({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
      });
    } catch {
      setError('Failed to create customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Customer</h1>
      <ErrorMessage error={error} />
      <div className="space-y-4 pb-6">
        <FormInput
          label="First Name"
          name="firstName"
          type="text"
          value={customerDetails.firstName}
          onChange={handleInputChange}
        />
        <FormInput
          label="Last Name"
          name="lastName"
          type="text"
          value={customerDetails.lastName}
          onChange={handleInputChange}
        />
        <FormInput
          label="Username"
          name="username"
          type="text"
          value={customerDetails.username}
          onChange={handleInputChange}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={customerDetails.password}
          onChange={handleInputChange}
        />
      </div>
      <Button onClick={handleCreateCustomer} variant='primary' disabled={loading}>
        {loading ? 'Creating...' : 'Create Customer'}
      </Button>
    </div>
  );
};

export default CustomerPage;