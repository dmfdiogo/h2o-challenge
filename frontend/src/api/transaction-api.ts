/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchApi } from './base-api';
import { useAuth } from '../context/auth-context';
import { Transaction, FullTransaction } from '@/types/api-types';



const useTransactionAPI = () => {
  const { token } = useAuth();

  const postTransaction = async (transaction: Transaction): Promise<any> => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(transaction),
    };

    return await fetchApi<any>('/Transaction', options);
  };

  const getTransactions = async (queryParams: Record<string, any>): Promise<FullTransaction[]> => {
    const queryString = new URLSearchParams(queryParams).toString();
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    const { data } = await fetchApi<FullTransaction[]>(`/Transaction?${queryString}`, options);
    return data;
  };

  return {
    postTransaction, getTransactions
  };
};

export default useTransactionAPI;