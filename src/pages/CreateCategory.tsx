import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Category } from '../types';

function CreateCategory() {
    const [newCategory, setNewCategory] = useState('');
    const [categoryMax, setCategoryMax] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
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
            body: JSON.stringify({userId: id, category: newCategory,  maxSpendAmt: categoryMax})
          });
          
          if (response.ok) {
            const data =  await response.json();
          }
        } catch (error) {
          console.error('Adding category error');
        }
    };
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Create a New Category</h1>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
              <label htmlFor="newCategory" className="block text-sm font-medium text-gray-700">
                Add New Category
              </label>
              <div className="mt-1">
                <input
                  id="newCategory"
                  name="newCategory"
                  type="text"
                  required
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
              <label htmlFor="categoryMax" className="block text-sm font-medium text-gray-700">
                Category Max Amount
              </label>
              <input
                  id="categoryMax"
                  name="categoryMax"
                  type="text"
                  required
                  value={categoryMax}
                  onChange={(e) => setCategoryMax(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create
              </button>
              <div>
            </div>
            </div>
            </form>
            </div>
        </div>
    </div>
  );
}

export default CreateCategory;