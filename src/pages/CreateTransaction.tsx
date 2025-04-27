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
    const [type, setType] = useState('income'); // Changed default to income

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
            navigate(-1);
          } else {
            alert('Failed to create transaction. Please try again.');
          }
        } catch (error) {
          alert('Failed to create transaction. Please try again.');
        }
      };
      const goBack = () => {
        navigate(-1);
    }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Create New Transaction</h1>
          <p className="text-blue-600">Add a new transaction to your account</p>
        </div>
      <button
        type="submit"
        onClick={goBack}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Back
              </button>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full">
        <div className="bg-gradient-to-br from-white/95 to-blue-50/80 backdrop-blur-sm rounded-lg shadow-md border border-blue-100 py-8 px-6 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-blue-800">
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
                  className="appearance-none block w-full px-3 py-3 border border-blue-300 rounded-md shadow-sm placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-blue-800">
                Category
              </label>
              <div className="mt-1">
                <select 
                  id="category"
                  name="category" 
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)} 
                  className="appearance-none block w-full px-3 py-3 border border-blue-300 rounded-md shadow-sm placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors bg-white"
                  style={{backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%232563eb' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 0.5rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em", paddingRight: "2.5rem"}}>
                    <option value="" disabled>Select an option</option>
                    {categories.map((cat, index) =>
                      <option key={index} value={cat.category}>{cat.category}</option>
                    )}
                </select>
              </div>
              {categories && !categories.length ? (
                <div className="mt-6 p-5 bg-blue-50/90 rounded-md border-l-4 border-blue-400">
                  <h3 className="text-sm font-medium text-blue-800 mb-3">Add New Category</h3>
                  <form className="space-y-4" onSubmit={addCategory}>
                    <div>
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
                          className="appearance-none block w-full px-3 py-3 border border-blue-300 rounded-md shadow-sm placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="categoryMax" className="block text-sm font-medium text-blue-800">
                        Category Max Amount
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
                          className="appearance-none block w-full pl-7 px-3 py-3 border border-blue-300 rounded-md shadow-sm placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                      >
                        Create Category
                      </button>
                    </div>
                  </form>
                </div>
              ) : ""}
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-blue-800">
                Amount
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-blue-500 sm:text-sm">$</span>
                </div>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="appearance-none block w-full pl-7 px-3 py-3 border border-blue-300 rounded-md shadow-sm placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors"
                  style={{WebkitAppearance: "none", MozAppearance: "textfield"}}
                />
              </div>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-blue-800">
                Type
              </label>
              <div className="mt-1">
                <select
                  id="type"
                  name="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className={`appearance-none block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${
                    type === 'expense' 
                      ? 'text-red-700 bg-red-50 border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'text-emerald-700 bg-emerald-50 border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500'
                  }`}
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%232563eb' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                    backgroundPosition: "right 0.5rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.5em 1.5em",
                    paddingRight: "2.5rem"
                  }}
                >
                  <option value="income" className="text-emerald-700 bg-white">Income</option>
                  <option value="expense" className="text-red-700 bg-white">Expense</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-blue-800">
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
                  className="appearance-none block w-full px-3 py-3 border border-blue-300 rounded-md shadow-sm placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                Create Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTransaction;