export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  }
  
  export interface Transaction {
    id: string;
    userId: string;
    transactionDesc: string;
    amount: string;
    category: string;
    date: string;
    type: 'income' | 'expense';
  }

  export interface Category {
    uuid: string;
    category: string;
    maxSpendAmt: string;
  }
  
  export interface Budget {
    id: string;
    category: string;
    amount: string;
    spent: string;
    period: 'monthly' | 'yearly';
  }

  export interface BalanceData {
    labels: 'Income' | 'Expenses';
    datasets: 
      {
        data: [number, number],
        backgroundColor: ['#60A5FA', '#F87171'],
        borderColor: ['#60A5FA', '#F87171'],
        borderWidth: 1,
      }
  }