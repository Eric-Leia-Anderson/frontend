import React, { useState, useEffect} from 'react';
import { Routes, Route, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { Budget as BudgetType, Category, Transaction } from '../types';
import CreateBudget from './CreateBudget';
const Budget = () => {
  
  const [budgets, setBudgets] = React.useState<BudgetType[]>([]);
  const navigate = useNavigate();
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const goToCreateBudget = () => {
    navigate('/CreateBudget');
  }
   useEffect(() => {
      fetchBudgets();
    },[]);

    const fetchBudgets = async () => {
      try {
          const response = await fetch('http://localhost:8080/api/transactions/monthlyBudget', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json; charset=utf-8'
            }
          });
          
          if (response.ok) {
            const data =  await response.json();
            setBudgets(data);
          } else {
            const error = await response.json();
            alert(error.message);
          }
        } catch (error) {
          console.error('Fetching budgets error:', error);
        }
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Budget Planning</h1>
          <p className="text-gray-600">Manage your monthly budgets</p>
        </div>
        <button onClick={goToCreateBudget} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Edit Budget
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {budgets.map((budget) => {
          const percentage = (Number(budget.spent) / Number(budget.amount)) * 100;
          const isOverBudget = percentage > 100;
          
          return (
            <div key={budget.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">{budget.category}</h3>
                <span className="text-sm text-gray-500 capitalize">{budget.period}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Spent: ${Number(budget.spent).toFixed(2)}</span>
                  <span>Budget: ${Number(budget.amount).toFixed(2)}</span>
                </div>
                
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        isOverBudget ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className={isOverBudget ? 'text-red-600 font-medium' : 'text-gray-600'}>
                    {percentage.toFixed(1)}% used
                  </span>
                  <span className="text-gray-600">
                    ${(Number(budget.amount) - Number(budget.spent)).toFixed(2)} remaining
                  </span>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end space-x-2">
                <button onClick={goToCreateBudget} className="text-sm text-blue-600 hover:text-blue-500">
                  Edit
                </button>
                <button onClick={goToCreateBudget} className="text-sm text-red-600 hover:text-red-500">
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Budget;