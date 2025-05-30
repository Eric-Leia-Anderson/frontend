import React, { useState, useEffect} from 'react';
import { Routes, Route, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { Category } from '../types';
import Budget from './Budget';
import Dashboard from './Dashboard';

function CreateBudget() {
    const navigate = useNavigate();
    useEffect(() => {
      fetchCategories();
      },[]);
    const [income, setIncome] = useState('');
    const [commonCategory, setCommonCategory] = useState('Groceries');
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [newCategories, setNewCategories] = React.useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState('');
    const [categoryMax, setCategoryMax] = useState('');
    const [categoryMaxCommon, setCategoryMaxCommon] = useState('');
    const [] = useState('');
    const [defaultCategories] = React.useState<String[]>([
        "Groceries", "Restaurants", "Rent/Mortgage", "Enertainment", "Miscellaneous", "Bills", "Subscriptions", "Child Care"]);
    const goToBudget = () => {
        navigate('/Budget');
    }
    const addCommonCategory = async (e: React.FormEvent) => {
      e.preventDefault();
      addCategory({uuid: '', category: commonCategory, maxSpendAmt: categoryMaxCommon});
      setCategoryMaxCommon('');
      setCommonCategory('');
    }
    const addNewCategory = async (e: React.FormEvent) => {
      e.preventDefault();
      addCategory({uuid: '', category: newCategory, maxSpendAmt: categoryMax});
      setCategoryMax('');
      setNewCategory('');
    }
    const addIncome = async (e: React.FormEvent) => {
      e.preventDefault();
      addCategory({uuid: '', category: "Income", maxSpendAmt: income});
      setIncome('');
      setCategoryMax('');
    }
    const fetchCategories = async () => {
        const id = localStorage.getItem('id');
        try {
            const response = await fetch('http://localhost:8080/api/transactions/category/fetchall?userId='+id, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json; charset=utf-8'
              }
            });
            
            if (response.ok) {
              const data =  await response.json();
              setCategories(data);
            } else {
              const error = await response.json();
              alert(error.message);
            }
          } catch (error) {
            console.error('Fetching categories error:', error);
          }
    };

    const addCategory = async (cat: { uuid: string; category: string; maxSpendAmt: string; }) => {
      try {
        const response = await fetch('http://localhost:8080/api/transactions/category/sdata', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify({userId: localStorage.getItem('id'), category: cat.category,  maxSpendAmt: cat.maxSpendAmt})
        });
        
        if (response.ok) {
          fetchCategories();
        } else {
            console.error('Adding category error');
        }
      } catch (error) {
        console.error('Adding category error');
      }
    };

  const removeCat = async (uuid: string) => {
    const realId = uuid;
    try {
      const response = await fetch('http://localhost:8080/api/transactions/category/delete?id='+realId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if (response.ok) {
        fetchCategories();
      } else {
          console.error('Removing category error');
      }
    } catch (error) {
      console.error('Removing category error', error);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Create Budget</h1>
          <p className="text-blue-600">Set up your monthly budget categories</p>
        </div>
        <button
          type="button"
          onClick={goToBudget}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
          Back to Budget
        </button>
      </div>

      <div className="mt-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-blue-100 p-6 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Current Categories</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-100">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                    Max Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-50">
                {categories.map((cat) => (
                  <tr key={cat.uuid} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                      {cat.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800">
                      ${cat.maxSpendAmt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => removeCat(cat.uuid)}
                        className="text-sm text-red-600 hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Income Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-blue-100 p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Monthly Income</h2>
            <form className="space-y-4" onSubmit={addIncome}>
              <div>
                <label htmlFor="income" className="block text-sm font-medium text-blue-700">
                  Set Your Monthly Income
                </label>
                <div className="mt-1">
                  <input
                    id="income"
                    name="income"
                    type="text"
                    required
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter amount"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                Save Income
              </button>
            </form>
          </div>

          {/* Common Categories Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-blue-100 p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Default Categories</h2>
            <p className="text-blue-600 text-sm mb-4">Choose common categories and set budget limits</p>
            
            <form className="space-y-4" onSubmit={addCommonCategory}>
              <div>
                <label htmlFor="common" className="block text-sm font-medium text-blue-700">
                  Select Category
                </label>
                <select 
                  id="common"
                  name="common" 
                  required
                  value={commonCategory}
                  onChange={(e) => setCommonCategory(e.target.value)} 
                  className="appearance-none block w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {defaultCategories.map((cat, index) =>
                    <option key={index}>{cat}</option>
                  )}
                </select>
              </div>
              
              <div>
                <label htmlFor="categoryMaxCommon" className="block text-sm font-medium text-blue-700">
                  Maximum Monthly Amount
                </label>
                <input
                  id="categoryMaxCommon"
                  name="categoryMaxCommon"
                  type="text"
                  required
                  value={categoryMaxCommon}
                  onChange={(e) => setCategoryMaxCommon(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                Add Category
              </button>
            </form>
          </div>

          {/* Custom Categories Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-blue-100 p-6 md:col-span-2">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Custom Categories</h2>
            
            <form className="space-y-4" onSubmit={addNewCategory}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="newCategory" className="block text-sm font-medium text-blue-700">
                    Category Name
                  </label>
                  <input
                    id="newCategory"
                    name="newCategory"
                    type="text"
                    required
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter category name"
                  />
                </div>
                
                <div>
                  <label htmlFor="categoryMax" className="block text-sm font-medium text-blue-700">
                    Maximum Monthly Amount
                  </label>
                  <input
                    id="categoryMax"
                    name="categoryMax"
                    type="text"
                    required
                    value={categoryMax}
                    onChange={(e) => setCategoryMax(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter amount"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                Create Custom Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBudget;