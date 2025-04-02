import React from 'react';
import { Budget as BudgetType } from '../types';

const Budget = () => {
  const [budgets] = React.useState<BudgetType[]>([
    {
      id: '1',
      category: 'Food & Dining',
      amount: 500.00,
      spent: 320.00,
      period: 'monthly'
    },
    {
      id: '2',
      category: 'Transportation',
      amount: 200.00,
      spent: 150.00,
      period: 'monthly'
    },
    {
      id: '3',
      category: 'Entertainment',
      amount: 150.00,
      spent: 75.00,
      period: 'monthly'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Budget Planning</h1>
          <p className="text-gray-600">Manage your monthly budgets</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Add Budget
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.amount) * 100;
          const isOverBudget = percentage > 100;
          
          return (
            <div key={budget.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">{budget.category}</h3>
                <span className="text-sm text-gray-500 capitalize">{budget.period}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Spent: ${budget.spent.toFixed(2)}</span>
                  <span>Budget: ${budget.amount.toFixed(2)}</span>
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
                    ${(budget.amount - budget.spent).toFixed(2)} remaining
                  </span>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end space-x-2">
                <button className="text-sm text-blue-600 hover:text-blue-500">
                  Edit
                </button>
                <button className="text-sm text-red-600 hover:text-red-500">
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