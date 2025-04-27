import React from 'react';
import { Doughnut, Pie, Bar} from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { Category, Transaction } from '../types';
import { Chart, Colors } from 'chart.js';
Chart.register(Colors);

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title
);

function Analytics() {
  const [transactionsMonth, setTransactionsMonth] = React.useState<Transaction[]>([]);
  const [transactionsYear, setTransactionsYear] = React.useState<Transaction[]>([]);
  const [yearIncome, setYearIncome] = React.useState<number[]>([]);
  const [yearExpense, setYearExpense] = React.useState<number[]>([]);
  const [yearLabels, setYearLabels] = React.useState<String[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categories, setCategories] = React.useState<Number[]>([]);
  const [categoryLabels, setCategoryLabels] = React.useState<String[]>([]);

  useEffect(() => {
    fetchInfo();
  }, []);

  const barOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      scales: {
        y: {
          beginAtZero: true
        },
        x: {
          beginAtZero: true,
          ticks: {
            autoSkip: false
          }
        }
      }
    },
  };

  const barData = {
    labels: yearLabels,
    datasets: [
      {
        label: 'Income',
        data: yearIncome,
        backgroundColor: '#3B82F6', // Blue color for income
      },
      {
        label: 'Expenses',
        data: yearExpense,
        backgroundColor: '#F87171', // Red color for expenses
      },
    ],
  };

  const balanceDoughnutData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [totalIncome, totalExpenses],
        backgroundColor: ['#10B981', '#F87171'], // Green for income, red for expenses
        borderColor: ['#10B981', '#F87171'],
        borderWidth: 1,
      },
    ],
  };

  // Diverse color palette for categories
  const categoryDoughnutData = {
    labels: categoryLabels,
    datasets: [
      {
        data: categories,
        backgroundColor: [
          '#3B82F6', // Blue
          '#EF4444', // Red
          '#10B981', // Green
          '#F59E0B', // Amber
          '#8B5CF6', // Purple
          '#EC4899', // Pink
          '#14B8A6', // Teal
          '#F97316', // Orange
          '#6366F1', // Indigo
          '#84CC16', // Lime
          '#A855F7', // Violet
          '#D946EF', // Fuchsia
          '#06B6D4', // Cyan
          '#0EA5E9', // Sky
          '#64748B', // Slate
        ],
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    ],
  };

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/transactions/analytics', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTransactionsMonth(data.allTransactionsMonth);
        setTransactionsYear(data.allTransactionsYear);
        setTotalIncome(data.totalMonthIncome);
        setTotalExpenses(data.totalMonthExpenses);
        setYearExpense(data.yearExpenses);
        setYearIncome(data.yearIncome);
        setCategories(data.allCategories);
        setCategoryLabels(data.allCategoryNames);
        setYearLabels(data.year);
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Fetching analytics info error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Analytics</h1>
          <p className="text-blue-600">View your financial insights</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-blue-100 p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">Income vs Expenses This Month</h3>
          <div className="h-64">
            <Doughnut 
              data={balanceDoughnutData} 
              options={{ 
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      font: {
                        size: 12
                      }
                    }
                  }
                }
              }}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-sm text-blue-600">Income</p>
              <p className="text-lg font-medium text-emerald-600">${totalIncome.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-blue-600">Expenses</p>
              <p className="text-lg font-medium text-red-600">${totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-blue-100 p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">Category Spending Breakdown</h3>
          <div className="h-64">
            <Doughnut 
              data={categoryDoughnutData} 
              options={{ 
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      font: {
                        size: 12
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-blue-100 p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-4">Income vs Expenses Yearly</h3>
        <div className="h-64">
          <Bar 
            data={barData} 
            options={{
              ...barOptions,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    font: {
                      size: 12
                    }
                  }
                },
                title: {
                  display: true,
                  text: 'Monthly Comparison',
                  font: {
                    size: 16
                  },
                  color: '#1E3A8A'
                }
              }
            }}
          />
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-blue-100 p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-4">Monthly Cashflow</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-100">
            <thead className="bg-blue-50/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Income</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Expenses</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Net Cashflow</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-100">
              {yearLabels.map((month, index) => {
                const income = yearIncome[index] || 0;
                const expense = yearExpense[index] || 0;
                const netCashflow = income - expense;
                
                return (
                  <tr key={index} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{month}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600">${income.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">${expense.toFixed(2)}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${netCashflow >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      ${netCashflow.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Analytics;