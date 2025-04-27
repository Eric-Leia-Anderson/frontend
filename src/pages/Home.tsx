import React from 'react';
import { 
  PieChart, 
  Wallet, 
  TrendingUp, 
  Shield, 
  ArrowRight,
  Bell,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Fit Budget</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/register" className="text-gray-600 hover:text-gray-900">Register</Link>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Take Control of Your</span>
              <span className="block text-indigo-600">Financial Future</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Track expenses, set budgets, and achieve your financial goals with our intuitive budgeting tools.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link to="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  Get Started Free
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a href="#features" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
              <PieChart className="h-12 w-12 text-indigo-600" />
              <h3 className="mt-4 text-xl font-medium text-gray-900">Smart Budgeting</h3>
              <p className="mt-2 text-center text-gray-500">
                Create custom budgets and track your spending in real-time.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
              <TrendingUp className="h-12 w-12 text-indigo-600" />
              <h3 className="mt-4 text-xl font-medium text-gray-900">Financial Insights</h3>
              <p className="mt-2 text-center text-gray-500">
                Get detailed analytics and insights about your spending habits.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
              <Shield className="h-12 w-12 text-indigo-600" />
              <h3 className="mt-4 text-xl font-medium text-gray-900">Secure & Private</h3>
              <p className="mt-2 text-center text-gray-500">
                Bank-level security to keep your financial data safe.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to start saving?
            </h2>
            <p className="mt-4 text-lg text-indigo-100">
              Join thousands of users who have transformed their financial lives.
            </p>
            <Link
              to="/register"
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;