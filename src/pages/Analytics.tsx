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
 //month of categories, doughnut, table below, //monthly cash flow is basic sideways bar graph of income and expenses
//chart for spending of all budgets pie chart, maybe put table below it of all categories and expenses so far also
//spending of categories breakdown, bar, 1 month

//yearly cash flow? income - expenses = cash flow table : month&year income expenses cash flow
//year of cashflow by month, bar and line? table below, //year of expenses/income by month, bar
//year of expenses broken down by categories on bar chart (jan has bar of multiple colors and each color is category)
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
        },[]);
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
        backgroundColor: '#4CAF50',
      },
      {
        label: 'Expenses',
        data: yearExpense,
        backgroundColor: '#F87171',
      },
    ],};
  var balanceDoughnutData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [totalIncome, totalExpenses],
        backgroundColor: ['#4CAF50', '#F87171'],
        borderColor: ['#4CAF50', '#F87171'],
        borderWidth: 1,
      },
    ],
  };
  var categoryDoughnutData = {
    labels: categoryLabels,
    datasets: [
      {
        data: categories,
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: 'bar',
    //data: data,
    options: {
      indexAxis: 'y',
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        }
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },

      }
    },
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
        const data =  await response.json();
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
      <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
      <div className="mt-4">
        <p className="text-gray-600">Manage your recurring analytics here.</p>
      </div>
      </div>
      {/**options={{ maintainAspectRatio: false }} */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Income vs Expenses This Month</h3>
                <div className="h-64">
                  <Doughnut data={balanceDoughnutData}  options={{ maintainAspectRatio: false }}/>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">All Categories Budget</h3>
                <div className="h-64">
                  <Doughnut data={categoryDoughnutData} options={{ maintainAspectRatio: false,  plugins: {
                                                                                  colors: {
                                                                                    forceOverride: true,
                                                                                  },
                                                                                }, }} />
                </div>
              </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Income vs Expenses Yearly</h3>
                <div className="h-64">
                  <Bar data={barData}  options={barOptions}/>
                </div>
              </div>
             {/**  <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">All Categories Budget</h3>
                <div className="h-64">
                  <Doughnut data={categoryDoughnutData} options={{ maintainAspectRatio: false,  plugins: {
                                                                                  colors: {
                                                                                    forceOverride: true,
                                                                                  },
                                                                                }, }} />
                </div>
              </div>*/}
      </div>
    </div>

    
  );
}

export default Analytics;