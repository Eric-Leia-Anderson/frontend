import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { Category } from '../types';
import Budget from './Budget';

function CreateCategory() {
  const navigate = useNavigate();
  const [newCategory, setNewCategory] = useState('');
  const [categoryMax, setCategoryMax] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = localStorage.getItem('id');
    try {
      const response = await fetch('http://localhost:8080/api/transactions/category/sdata', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({ 
          userId: id, 
          category: newCategory, 
          maxSpendAmt: categoryMax
        })
      });
      
      if (response.ok) {
        navigate('/budget');
      }
    } catch (error) {
      console.error('Adding category error');
    }
  };

  // Calculate progress for preview (always 0 for new categories)
  const progress = 0;
  const getEmoji = () => {
    if (!categoryMax) return '💰';
    if (parseFloat(categoryMax) <= 50) return '☕'; 
    if (parseFloat(categoryMax) <= 200) return '🍽️';
    if (parseFloat(categoryMax) <= 500) return '🛒';
    return '💎';
  };

  return (
    <div className="space-y-6">
      {/* Updated title format similar to Transactions component */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Create Category </h1>
          <p className="text-blue-600">Add a new spending category to track your budget smarter</p>
        </div>
      </div>

      <div className="mt-6 mx-auto w-full max-w-md">
        <div className="bg-gradient-to-b from-white to-blue-50 backdrop-blur-sm rounded-lg shadow-lg border border-blue-100 p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="transform transition-all hover:scale-102">
              <label htmlFor="newCategory" className="block text-sm font-medium text-blue-800">
                Category Name
              </label>
              <div className="mt-1">
                <input
                  id="newCategory"
                  name="newCategory"
                  type="text"
                  required
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="e.g., Groceries, Entertainment, Utilities"
                  className="appearance-none block w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm placeholder-blue-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              {newCategory && (
                <p className="mt-1 text-sm text-indigo-600">
                  Great choice! <span className="font-medium">{newCategory}</span> is an excellent category to track.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="categoryMax" className="block text-sm font-medium text-blue-800">
                Monthly Budget Limit {getEmoji()}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-blue-500 sm:text-sm">$</span>
                </div>
                <input
                  id="categoryMax"
                  name="categoryMax"
                  type="text"
                  required
                  value={categoryMax}
                  onChange={(e) => setCategoryMax(e.target.value)}
                  placeholder="0.00"
                  className="appearance-none block w-full pl-7 px-3 py-2 border border-blue-200 rounded-md shadow-sm placeholder-blue-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <p className="mt-1 text-sm text-blue-500">Set the maximum amount you want to spend each month.</p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-blue-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-sm text-blue-700 font-medium">Budget Preview</span>
              </div>
            </div>

            <div 
              className="p-5 border border-blue-100 rounded-lg bg-blue-50 shadow-inner transform transition-all hover:shadow-md"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-md font-medium text-blue-900 flex items-center">
                  {newCategory || 'New Category'} 
                  <span className="ml-2 text-lg">{getEmoji()}</span>
                </h3>
                <span className="text-sm bg-blue-600 text-white px-2 py-1 rounded-full capitalize">Monthly</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-blue-800">Spent: $0.00</span>
                  <span className="text-blue-800">Budget: ${parseFloat(categoryMax || '0').toFixed(2)}</span>
                </div>
                
                <div className="relative pt-1">
                  <div className="overflow-hidden h-3 text-xs flex rounded-full bg-blue-100 shadow-inner">
                    <div
                      style={{ 
                        width: '0%', 
                        backgroundColor: isHovered ? '#4F46E5' : '#3B82F6',
                        transition: 'background-color 0.3s' 
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm bg-white bg-opacity-50 p-2 rounded-md">
                  <span className="text-green-600 font-medium">0% used</span>
                  <span className="text-blue-700 font-medium">${parseFloat(categoryMax || '0').toFixed(2)} remaining</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => navigate('/budget')}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors hover:underline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
              >
                Create Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCategory;