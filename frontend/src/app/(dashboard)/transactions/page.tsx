'use client'
import Button from '@/components/layout/button';
import FormInput from '@/components/layout/form-input';
import { Account, Transaction } from '@/types/api-types';
import useAccountsAPI from '@/api/account-api';
import useTransactionAPI from '@/api/transaction-api';
import React, { useEffect, useState } from 'react';
const TransactionPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountNumber, setAccountNumber] = useState<number | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [type, setType] = useState<number>(0);
  const [targetAccountNumber, setTargetAccountNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { postTransaction } = useTransactionAPI();
  const { getAccounts } = useAccountsAPI();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getAccounts();
        setAccounts(data);
      } catch {
        setError('Failed to fetch accounts');
      }
    };

    fetchAccounts();
  }, []);

  const handlePostTransaction = async () => {
    setLoading(true);
    setError(null);

    const newTransaction: Transaction = {
      accountNumber: accountNumber ?? 0,
      amount,
      description,
      type,
      targetAccountNumber: type === 2 ? Number(targetAccountNumber) : undefined,
    };

    try {
      const res = await postTransaction(newTransaction);
      console.log('Transaction response:', res);
      alert('Transaction posted successfully');
      setAccountNumber(null);
      setAmount(0);
      setDescription('');
      setType(0);
      setTargetAccountNumber(null);
    } catch  {
      setError('Failed to post transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Post Transaction</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="mb-4">
      <FormInput label="Account Number"
           name="targetAccountNumber"
            value={accountNumber ?? ''} 
            onChange={(e) => setAccountNumber(Number(e.target.value))}
             type="select" 
             options={[{ value: '', label: 'Select an account' },
               ...accounts.map(account => ({
                 value: account.accountNumber, label: `${account.accountNumber} - ${account.customer.firstName} ${account.customer.lastName}` 
                }))]}
             />
      </div>
      <div className="mb-4">
        <FormInput label="Amount" name="amount" value={amount} onChange={(e) => setAmount(Number(e.target.value))} type="number" />
      </div>
      <div className="mb-4">
        <FormInput label="Description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Transaction Type</label>
        <select
          value={type}
          onChange={(e) => setType(Number(e.target.value))}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
        >
          <option value={0}>Deposit</option>
          <option value={1}>Withdraw</option>
          <option value={2}>Transfer</option>
        </select>
      </div>
      {type === 2 && (
        <div className="mb-4">
          <FormInput label="Target Account Number"
           name="targetAccountNumber"
            value={targetAccountNumber ?? ''} 
            onChange={(e) => setTargetAccountNumber(Number(e.target.value))}
             type="select" 
             options={[{ value: '', label: 'Select an account' },
               ...accounts.map(account => ({
                 value: account.accountNumber, label: `${account.accountNumber} - ${account.customer.firstName} ${account.customer.lastName}` 
                }))]}
             />
        </div>
      )}
          <Button onClick={handlePostTransaction} variant='primary' disabled={loading}>
      {loading ? 'Posting...' : 'Post Transaction'}
        </Button>
    </div>
  );
};

export default TransactionPage;