import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Category } from '../types';

function CreateTransaction() {
    const [categories, setCategories] = React.useState<Category[]>([]);
    useEffect(() => {
        fetchCategories();
      },[]);

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
              setCategory(categories.at(1)!.category);
              console.log(categories);
            } else {
              const error = await response.json();
              alert(error.message);
            }
          } catch (error) {
            console.error('Fetching categories error:', error);
          }
    }

    const navigate = useNavigate();
    const [newCategory, setNewCategory] = useState('');
    const [categoryMax, setCategoryMax] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('expense');

    async function addCategory() {
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
            fetchCategories();
          } else {
            console.error('Adding category error');
          }
        } catch (error) {
          console.error('Adding category error');
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("type: ", type);
        try {
          const response = await fetch('http://localhost:8080/api/transactions/sdata', {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({userId: localStorage.getItem('id'), transactionDesc: description, amount: amount , category: category, date: date, type: type}),
          });
          
          if (response.ok) {
            navigate('/transactions');
          } else {
            alert('Failed to create transaction. Please try again.');
          }
        } catch (error) {
          alert('Failed to create transaction. Please try again.');
        }
      };
      const goToTransactions = () => {
        navigate('/Transactions');
    }
  return (
    <div className="space-y-6 ">
      <div className="flex justify-between items-center">
      <div>
          <h1 className="text-2xl font-bold text-gray-800">Create New Transaction</h1>
        </div>
      <button
        type="submit"
        onClick={goToTransactions}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Back to Transactions
              </button>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Transaction Description
              </label>
              <div className="mt-1">
                <input
                  id="description"
                  name="description"
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
               Category
              </label>
              <div className="mt-1">
                <select id="category"
                  name="category" required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="" disabled>Select an option</option>
                    {categories.map((cat,index) =>
                    <option key={index} value={cat.category}>{cat.category}</option>)};
                    </select>
              </div>
              {categories && !categories.length? (
                <form className="space-y-6" onSubmit={addCategory}>
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
              <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create
              </button>
                </div>
                </form>
                ):""}
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <div className="mt-1">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <div className="mt-1">
              <select id="type" name="type" value={type} required onChange={(e) => setType(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              </div>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <div className="mt-1">
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create
              </button>
            </div>
          </form>
    </div>
    </div>
    </div>
  );
}

export default CreateTransaction;