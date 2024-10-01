import { fetchApi } from './base-api';
import { useAuth } from '../context/auth-context';
import { ReqRegisterCustomer } from '@/types/requests';

interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    accounts: unknown[];
  }

const useCustomerAPI = () => {
  const { token } = useAuth();

  const getCustomers = async (): Promise<Customer[]> => {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    const { data } = await fetchApi<Customer[]>('/Customer/all', options);
    return data;
  };

  const getCustomerById = async (id: string): Promise<Customer> => {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    const { data } = await fetchApi<Customer>(`/Customer/${id}`, options);
    return data;
  };

  const createCustomer = async (customer: ReqRegisterCustomer): Promise<Customer> => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(customer),
    };

    const { data } = await fetchApi<Customer>('/Customer', options);
    return data;
  };

  return {
    getCustomers,
    getCustomerById,
    createCustomer,
  };
};

export default useCustomerAPI;