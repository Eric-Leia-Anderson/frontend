import React from 'react';
import { Doughnut } from 'react-chartjs-2';
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
  const balanceData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [3200, 1800],
        backgroundColor: ['#60A5FA', '#F87171'],
        borderColor: ['#60A5FA', '#F87171'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back, John!</h1>
          <p className="text-gray-600">Here's your financial overview</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Total Balance</h3>
          <p className="text-3xl font-bold text-blue-500 mt-2">$5,000.00</p>
          <p className="text-sm text-gray-500 mt-1">Updated just now</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Monthly Income</h3>
          <p className="text-3xl font-bold text-green-500 mt-2">$3,200.00</p>
          <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Monthly Expenses</h3>
          <p className="text-3xl font-bold text-red-500 mt-2">$1,800.00</p>
          <p className="text-sm text-gray-500 mt-1">-5% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Income vs Expenses</h3>
          <div className="h-64">
            <Doughnut data={balanceData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-lg">$</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Grocery Shopping</p>
                    <p className="text-xs text-gray-500">March 15, 2024</p>
                  </div>
                </div>
                <span className="text-red-500 font-medium">-$120.00</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;