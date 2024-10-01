export interface AccountCustomer {
    id: number;
    firstName: string;
    lastName: string;
  }
  
  export interface Account {
    id: number;
    accountNumber: number;
    balance: number;
    customer: AccountCustomer;
  }

  export interface ReqCreateAccount {
    customerId: number;
  }

  export interface Transaction {
    accountNumber: number;
    amount: number;
    description: string;
    type: number;
    targetAccountNumber?: number;
  }

  export interface FullTransaction {
    transactionId: number;
    accountNumber: number;
    amount: number;
    transactionDate: string;
    description: string;
    type: number;
    targetAccountNumber?: number;
  }