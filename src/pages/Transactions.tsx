import React, { useState, useEffect} from 'react';
import { Routes, Route, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { Transaction } from '../types';
import CreateTransaction from './CreateTransaction';
import OlderTransaction from './OlderTransactions';

const Transactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [month, setMonth] = useState(new Date().toLocaleString("en-US", { month: "long" }));
  
  function moveToCreateTransaction() {
    navigate('/CreateTransaction');
  };
  
  function goToPrevious() {
    navigate('/OlderTransactions');
  }
  
  useEffect(() => {
    fetchTransactions();
  },[]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/transactions/fetchmonth', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
      
      if (response.ok) {
        const data =  await response.json();
        setTransactions(data);
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Fetching transactions error:', error);
    }
  };
  
  const removeTransaction = async (uuid: string) => {
    const realId = uuid;
    try {
      const response = await fetch('http://localhost:8080/api/transactions/delete?id='+realId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if (response.ok) {
        fetchTransactions();
      } else {
          console.error('Removing transaction error');
      }
    } catch (error) {
      console.error('Removing transaction error', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Recent Transactions</h1>
          <p className="text-blue-600">View and manage your transactions for {month}</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={goToPrevious} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
            View Previous Transactions
          </button>
          <button onClick={moveToCreateTransaction} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
            Add Transaction
          </button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-blue-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-100">
            <thead className="bg-blue-50/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-100">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">
                    {transaction.transactionDesc}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                    <span className={transaction.type === 'expense' ? 'text-red-600' : 'text-emerald-600'}>
                      {transaction.type === 'expense' ? '-' : '+'}${transaction.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.type === 'expense' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    <button onClick={() => removeTransaction(transaction.id)} className="text-red-600 hover:text-red-700 transition-colors">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;