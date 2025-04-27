import React, { useState, useEffect} from 'react';
import { Routes, Route, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { Budget as BudgetType, Category, Transaction } from '../types';
import CreateBudget from './CreateBudget';

const Budget = () => {
  const [budgets, setBudgets] = React.useState<BudgetType[]>([]);
  const navigate = useNavigate();
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [hoveredBudgetId, setHoveredBudgetId] = useState<string | null>(null);
  
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
        const data = await response.json();
        setBudgets(data);
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Fetching budgets error:', error);
    }
  }

  const deleteBudget = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/transactions/category/delete?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      
      if (response.ok) {
        fetchBudgets();
      } else {
        console.error('Deleting budget error');
      }
    } catch (error) {
      console.error('Deleting budget error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Budget Planning</h1>
          <p className="text-blue-600">Manage your monthly budgets</p>
        </div>
        <button 
          onClick={goToCreateBudget} 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          Edit Budget
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {budgets.map((budget) => {
          const percentage = (Number(budget.spent) / Number(budget.amount)) * 100;
          const isOverBudget = percentage > 100;
          const isHovered = hoveredBudgetId === budget.id;
          
          return (
            <div 
              key={budget.id} 
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-blue-100 p-6 transform transition-all hover:shadow-lg"
              onMouseEnter={() => setHoveredBudgetId(budget.id)}
              onMouseLeave={() => setHoveredBudgetId(null)}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-blue-900 flex items-center">
                  {budget.category}
                  <span className="ml-2 text-lg">{}</span>  {/* Might add emojis later */}
                </h3>
                <span className="text-sm bg-blue-600 text-white px-2 py-1 rounded-full capitalize">{budget.period}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-blue-800">Spent: ${Number(budget.spent).toFixed(2)}</span>
                  <span className="text-blue-800">Budget: ${Number(budget.amount).toFixed(2)}</span>
                </div>
                
                <div className="relative pt-1">
                  <div className="overflow-hidden h-3 text-xs flex rounded-full bg-blue-100 shadow-inner">
                    <div
                      style={{ 
                        width: `${Math.min(percentage, 100)}%`,
                        transition: 'background-color 0.3s' 
                      }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full ${
                        isOverBudget ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : isHovered ? 'bg-indigo-500' : 'bg-emerald-500'
                      }`}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm bg-white bg-opacity-50 p-2 rounded-md">
                  <span className={isOverBudget ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                    {percentage.toFixed(1)}% used
                  </span>
                  <span className="text-blue-700 font-medium">
                    ${(Number(budget.amount) - Number(budget.spent)).toFixed(2)} remaining
                  </span>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end space-x-2">
                <button 
                  onClick={goToCreateBudget} 
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors hover:underline"
                >
                  Edit
                </button>
                <button 
                  onClick={goToCreateBudget} 
                  className="text-sm text-red-600 hover:text-red-700 transition-colors hover:underline"
                >
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