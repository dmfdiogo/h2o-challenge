'use client'
import React, { useEffect, useState } from 'react';
import { Customer } from '@/types/requests';
import useCustomerAPI from '@/api/customer-api';
import useAccountsAPI from '@/api/account-api';
import { Account, ReqCreateAccount } from '@/types/api-types';

const AccountsPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { getCustomers } = useCustomerAPI();
  const { getAccounts, createAccount } = useAccountsAPI();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch {
        setError('Failed to fetch customers');
      } finally {
        setLoading(false);
      }
    };

    const fetchAccounts = async () => {
        try {
          const data = await getAccounts();
          setAccounts(data);
        } catch {
          setError('Failed to fetch accounts');
        } finally {
          setLoading(false);
        }
    }

    fetchAccounts();
    fetchCustomers();
  }, []);

  const handleAddAccount = async () => {
    if (selectedCustomerId === null) {
      setError('Please select a customer');
      return;
    }

    try {
        const request: ReqCreateAccount = {customerId: selectedCustomerId}
        await createAccount(request);
        const accountsData = await getAccounts();
        setAccounts(accountsData);
    } catch {
        setError('Failed to add account');
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Account to Customer</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Customer</label>
        <select
          value={selectedCustomerId ?? ''}
          onChange={(e) => setSelectedCustomerId(Number(e.target.value))}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md "
        >
          <option value="" disabled>Select a customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.firstName} {customer.lastName}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleAddAccount}
        className="px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Add Account
      </button>

      <h2 className="text-xl font-bold mt-8 mb-4">All Accounts</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Account Number</th>
            <th className="py-2 px-4 border-b">Balance</th>
            <th className="py-2 px-4 border-b">Customer</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td className="py-2 px-4 border-b">{account.id}</td>
              <td className="py-2 px-4 border-b">{account.accountNumber}</td>
              <td className="py-2 px-4 border-b">{account.balance}</td>
              <td className="py-2 px-4 border-b">
                {account.customer.firstName} {account.customer.lastName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsPage;