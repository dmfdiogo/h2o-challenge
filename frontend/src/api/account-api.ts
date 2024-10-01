import { fetchApi } from './base-api';
import { useAuth } from '../context/auth-context';
import { Account, ReqCreateAccount } from '@/types/api-types';

const useAccountsAPI = () => {
  const { token } = useAuth();

  const getAccounts = async (): Promise<Account[]> => {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    const { data } = await fetchApi<Account[]>('/Account/all', options);
    return data;
  };

  const getAccountById = async (id: number): Promise<Account> => {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    const { data } = await fetchApi<Account>(`/Account/${id}`, options);
    return data;
  };

    const createAccount = async (req: ReqCreateAccount): Promise<void> => {
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(req),
        };

        await fetchApi<void>(`/Account/`, options);
    };

  return {
    getAccounts,
    getAccountById,
    createAccount,
  };
};

export default useAccountsAPI;