import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { Transaction } from '../types';
import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const Home = () => {
  useEffect(() => {
    fetchInfo();
  }, []);
  
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [firstName, setFirstname] = useState(localStorage.getItem('firstName'));
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  
  const balanceData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [totalIncome, totalExpenses],
        backgroundColor: ['#0EA5E9', '#F87171'],
        borderColor: ['#0EA5E9', '#F87171'],
        borderWidth: 1,
      },
    ],
  };

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/transactions/info', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTransactions(data.mostRecentTransactions);
        setTotalIncome(data.totalIncome);
        setTotalExpenses(data.totalExpenses);
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Fetching transactions error:', error);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Welcome Back, {firstName}!</h1>
          <p className="text-blue-600">Here's your financial overview</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900">Cash Flow</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">${(totalIncome - totalExpenses).toFixed(2)}</p>
          <p className="text-sm text-blue-500 mt-1">Updated just now</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-lg shadow-md border border-emerald-200">
          <h3 className="text-lg font-semibold text-emerald-900">Monthly Income</h3>
          <p className="text-3xl font-bold text-emerald-600 mt-2">${totalIncome.toFixed(2)}</p>
        </div>

        <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-6 rounded-lg shadow-md border border-rose-200">
          <h3 className="text-lg font-semibold text-rose-900">Monthly Expenses</h3>
          <p className="text-3xl font-bold text-rose-600 mt-2">${totalExpenses.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Income vs Expenses</h3>
          <div className="h-64">
            <Doughnut data={balanceData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors duration-200">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'expense' 
                        ? 'bg-rose-600/10'
                        : 'bg-blue-600/10'
                    }`}>
                      <span className={transaction.type === 'expense' ? 'text-rose-600 text-lg' : 'text-blue-600 text-lg'}>$</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{transaction.transactionDesc}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.date).toLocaleDateString('en-US', {timeZone: 'UTC'})} • {transaction.category}
                      </p>
                    </div>
                  </div>
                  <span className={transaction.type === 'expense' ? 'text-rose-600 font-medium' : 'text-emerald-600 font-medium'}>
                    {transaction.type === 'expense' ? '-' : '+'}${transaction.amount}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No recent transactions</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;