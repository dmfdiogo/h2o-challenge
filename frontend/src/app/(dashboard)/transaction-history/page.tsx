/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Button from '@/components/layout/button';
import FormInput from '@/components/layout/form-input';
import Table from '@/components/layout/table';
import { Account, FullTransaction } from '@/types/api-types';
import useAccountsAPI from '@/api/account-api';
import useTransactionAPI from '@/api/transaction-api';
import React, { useEffect, useState } from 'react';

const TransactionHistoryPage: React.FC = () => {
  const [transactions, setTransactions] = useState<FullTransaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [queryState, setQueryState] = useState({
    accountNumber: null as number | null,
    targetAccountNumber: null as number | null,
    minAmount: null as number | null,
    maxAmount: null as number | null,
    startDate: null as string | null,
    endDate: null as string | null,
    type: null as number | null,
    page: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchSuccessful, setLastFetchSuccessful] = useState<boolean>(true);
  const { getTransactions } = useTransactionAPI();
  const { getAccounts } = useAccountsAPI();

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);

    const queryParams: Record<string, any> = { ...queryState };

    // Remove null or undefined values from queryParams
    Object.keys(queryParams).forEach(key => {
      if (queryParams[key] === null || queryParams[key] === undefined) {
        delete queryParams[key];
      }
    });

    try {
      const data = await getTransactions(queryParams);
      setTransactions(data);
      setLastFetchSuccessful(true);
    } catch {
      setError('Failed to fetch transactions');
      setLastFetchSuccessful(false);
    } finally {
      setLoading(false);
    }
  };

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
    fetchTransactions();
  }, [queryState]);

  const resetFilters = () => {
    setQueryState({
      accountNumber: null,
      targetAccountNumber: null,
      minAmount: null,
      maxAmount: null,
      startDate: null,
      endDate: null,
      type: null,
      page: 1,
      pageSize: 10,
    });
    fetchTransactions();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQueryState((prevState) => ({
      ...prevState,
      [name]: value === '' ? null : value,
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <FormInput
          label="Account Number"
          name="accountNumber"
          value={queryState.accountNumber ?? ''}
          onChange={handleInputChange}
          type="select"
          options={[{ value: '', label: 'All' }, ...accounts.map(account => ({ value: account.accountNumber, label: `${account.accountNumber} - ${account.customer.firstName} ${account.customer.lastName}` }))]}
        />
        <FormInput
          label="Target Account Number"
          name="targetAccountNumber"
          value={queryState.targetAccountNumber ?? ''}
          onChange={handleInputChange}
          type="select"
          options={[{ value: '', label: 'All' }, ...accounts.map(account => ({ value: account.accountNumber, label: `${account.accountNumber} - ${account.customer.firstName} ${account.customer.lastName}` }))]}
        />
        <FormInput
          label="Min Amount"
          name="minAmount"
          value={queryState.minAmount ?? ''}
          onChange={handleInputChange}
          type="number"
        />
        <FormInput
          label="Max Amount"
          name="maxAmount"
          value={queryState.maxAmount ?? ''}
          onChange={handleInputChange}
          type="number"
        />
        <FormInput
          label="Start Date"
          name="startDate"
          value={queryState.startDate ?? ''}
          onChange={handleInputChange}
          type="date"
        />
        <FormInput
          label="End Date"
          name="endDate"
          value={queryState.endDate ?? ''}
          onChange={handleInputChange}
          type="date"
        />
        <FormInput
          label="Transaction Type"
          name="type"
          value={queryState.type ?? ''}
          onChange={handleInputChange}
          type="select"
          options={[
            { value: '', label: 'All' },
            { value: 0, label: 'Deposit' },
            { value: 1, label: 'Withdraw' },
            { value: 2, label: 'Transfer' },
          ]}
        />
        <FormInput
          label="Page Size"
          name="pageSize"
          value={queryState.pageSize}
          onChange={handleInputChange}
          type="select"
          options={[
            { value: 5, label: '5' },
            { value: 10, label: '10' },
            { value: 20, label: '20' },
            { value: 50, label: '50' },
          ]}
        />
      </div>
      <div className="flex space-x-4 w-fit">
        {/* <Button onClick={fetchTransactions} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </Button> */}
        <Button onClick={resetFilters} variant='primary' disabled={loading}>
          Reset Filters
        </Button>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Transactions</h2>
      <Table headers={['Transaction ID', 'Account Number', 'Amount', 'Date', 'Description', 'Type', 'Target Account Number']}>
        {transactions.map((transaction) => (
          <tr key={transaction.transactionId}>
            <td className="py-2 px-4 border-b">{transaction.transactionId}</td>
            <td className="py-2 px-4 border-b">{transaction.accountNumber}</td>
            <td className="py-2 px-4 border-b">{transaction.amount}</td>
            <td className="py-2 px-4 border-b">{new Date(transaction.transactionDate).toLocaleString()}</td>
            <td className="py-2 px-4 border-b">{transaction.description}</td>
            <td className="py-2 px-4 border-b">
              {transaction.type === 0 ? 'Deposit' : transaction.type === 1 ? 'Withdraw' : 'Transfer'}
            </td>
            <td className="py-2 px-4 border-b">
              {transaction.targetAccountNumber && transaction.targetAccountNumber !== 0
                ? transaction.targetAccountNumber
                : '-'}
            </td>
          </tr>
        ))}
      </Table>

      <div className="mt-4 flex justify-between items-center">
        <Button onClick={() => setQueryState((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }))} disabled={queryState.page === 1}>
          Previous
        </Button>
        <span>Page {queryState.page}</span>
        <Button onClick={() => setQueryState((prev) => ({ ...prev, page: prev.page + 1 }))} disabled={!lastFetchSuccessful}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;