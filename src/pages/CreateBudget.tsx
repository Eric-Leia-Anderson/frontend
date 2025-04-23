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
    }
    const addNewCategory = async (e: React.FormEvent) => {
      e.preventDefault();
      addCategory({uuid: '', category: newCategory, maxSpendAmt: categoryMax});
      setCategoryMax('');
    }
    const addIncome = async (e: React.FormEvent) => {
      e.preventDefault();
      addCategory({uuid: '', category: "Income", maxSpendAmt: income});
      setIncome('');
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
    <div>
      <button
        type="submit"
        onClick={goToBudget}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Back to Budget
              </button>
      <h1 className="text-2xl font-semibold text-gray-900">Create New Budget</h1>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div>
                <h2 className="text-1xl font-semibold text-gray-900">Current Categories</h2>
            </div>
            <div>
            <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Max Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider">
              Remove
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories.map((cat) => (
            <tr key={cat.uuid} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {cat.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {cat.maxSpendAmt}
              </td>
              <td className="text-sm text-red-600 hover:text-red-500">
                <button onClick={() => removeCat(cat.uuid)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
            </div>
          <form className="space-y-6" onSubmit={addIncome}>
            <div>
                <label htmlFor="income" className="block text-sm font-medium text-gray-700">
                    Monthly Income
                </label>
                <div className="mt-1">
                    <input
                        id="income"
                        name="income"
                        type="text"
                        required
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    </input>
                </div>
                <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create
              </button>
            </div>
            </form>
      <form className="space-y-6" onSubmit={addCommonCategory}>
            <div>
                <h2 className="text-1xl font-semibold text-gray-900">Default Categories</h2>
                <p>Choose any common categories and fill out the info. </p>
            </div>
            <div>
              <label htmlFor="common" className="block text-sm font-medium text-gray-700">
                Common Category Options
              </label>
              <select id="common"
                  name="common" required
                  value={commonCategory}
                  onChange={(e) => setCommonCategory(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    {defaultCategories.map((cat,index) =>
                    <option key={index}>{cat}</option>)};
                    </select>
                    <div className="mt-1">
              </div>
              <div>
              <label htmlFor="categoryMaxCommon" className="block text-sm font-medium text-gray-700">
                Category Max Amount
              </label>
              <input
                  id="categoryMaxCommon"
                  name="categoryMaxCommon"
                  type="text"
                  required
                  value={categoryMaxCommon}
                  onChange={(e) => setCategoryMaxCommon(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create
              </button>
            </div>
        </form>
        <form className="space-y-6" onSubmit={addNewCategory}>
            <div>
                <h2 className="text-1xl font-semibold text-gray-900">Custom Categories</h2>
            </div>
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
          </form>
        </div>
        </div>
    </div>
  );
}

export default CreateBudget;