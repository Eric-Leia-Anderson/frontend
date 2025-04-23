import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { Wallet, Bell, User, RefreshCcw, PieChart, DollarSign, Blocks, BarChart3, Plus, Settings as SettingsIcon } from 'lucide-react';
import Budget from './Budget';
import Transactions from './Transactions';
import CreateTransaction from './CreateTransaction';
import CreateCategory from './CreateCategory';
import Analytics from './Analytics';
import Profile from './Profile';
import Settings from './Register';
import { Transaction } from '../types';

function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Budget Website</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <NavLink
                to="profile"
                className={({ isActive }) =>
                  `p-2 rounded-full hover:bg-gray-100 ${isActive ? 'bg-gray-100' : ''}`
                }
              >
                <User className="h-5 w-5 text-gray-600" />
              </NavLink>
              <NavLink
                to="settings"
                className={({ isActive }) =>
                  `p-2 rounded-full hover:bg-gray-100 ${isActive ? 'bg-gray-100' : ''}`
                }
              >
                <SettingsIcon className="h-5 w-5 text-gray-600" />
              </NavLink>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <User className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar and Content */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm">
          <nav className="mt-5 px-2">
          <NavLink
              to="analytics"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
             <PieChart className="mr-3 h-5 w-5" />
              Analytics
            </NavLink>
            <NavLink
              to="budget"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            > 
              <DollarSign className="mr-3 h-5 w-5" />
              Budget
            </NavLink>
            <NavLink
              to="transactions"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <BarChart3 className="mr-3 h-5 w-5" />
              Transactions
            </NavLink>
            <NavLink
              to="createtransaction"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Plus className="mr-3 h-5 w-5" />Create Transaction</NavLink>
              <NavLink
              to="createcategory"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Blocks className="mr-3 h-5 w-5" />Create Category</NavLink>
          </nav>
        </div>
              {/**<Blocks /> */}
        {/* Main Content */}
        <div className="flex-1 overflow-auto p-8">
          <Routes>
            <Route path="/" element={<Navigate to="recurring" replace />} />
            <Route path="budget" element={<Budget />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="createtransaction" element={<CreateTransaction />} />
            <Route path="createcategory" element={<CreateCategory />} />
            <Route path="analytics" element={<Analytics />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;