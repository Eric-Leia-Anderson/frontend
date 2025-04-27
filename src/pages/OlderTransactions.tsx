import React, { useState, useEffect} from 'react';
import { Routes, Route, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { Transaction } from '../types';
import CreateTransaction from './CreateTransaction';

const OlderTransactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [exist, setExist] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  
  function moveToCreateTransaction() {
    navigate('/CreateTransaction');
  };
  
  const goBack = () => {
    navigate(-1);
  }
  
  const fetchTransactions = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/transactions/fetch?startDate='+startDate+'&endDate='+endDate+'&category='+category+'&transactionDesc='+description, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json; charset=utf-8'
          }
        });
        
        if (response.ok) {
          const data =  await response.json();
          setTransactions(data);
          setExist(true);
        } else {
          const error = await response.json();
          alert(error.message);
        }
      } catch (error) {
        console.error('Fetching transactions error:', error);
      }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/transactions/fetch?startDate='+startDate+'&endDate='+endDate+'&category='+category+'&transactionDesc='+description, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
      
      if (response.ok) {
        const data =  await response.json();
        setTransactions(data);
        setExist(true);
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
        console.log("Removed transaction");
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
          <h1 className="text-2xl font-bold text-blue-900">Previous Transactions</h1>
          <p className="text-blue-600">View and manage your older transactions</p>
        </div>
        <button
          type="button"
          onClick={goBack}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
          Back to Transactions
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-blue-100">
        <div className="overflow-x-auto">
          <form className="space-y-6 p-6" onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-blue-800">Enter a date range of transactions</h2>
              {/*
              <button 
                type="button"
                onClick={moveToCreateTransaction} 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                Add Transaction
              </button>
              */}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-blue-700">
                  Start Date
                </label>
                <div className="mt-1">
                  <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-blue-700">
                  End Date
                </label>
                <div className="mt-1">
                  <input
                    id="endDate"
                    name="endDate"
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-blue-700">
                  Transaction Description
                </label>
                <div className="mt-1">
                  <input
                    id="description"
                    name="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-blue-700">
                  Category Name
                </label>
                <div className="mt-1">
                  <input
                    id="category"
                    name="category"
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                Submit
              </button>
            </div>
          </form>
          
          {exist && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default OlderTransactions;