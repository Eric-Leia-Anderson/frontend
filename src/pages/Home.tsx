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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Wallet className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-blue-900">Fit Budget</span>
            </div>
            <div className="flex-1 flex justify-end items-center space-x-4">
              <Link to="/login" className="text-blue-600 hover:text-blue-700 transition-colors">
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1">
        {/* Hero Section */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-blue-900 sm:text-5xl md:text-6xl">
                <span className="block">Take Control of Your</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                  Financial Future
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-blue-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Track expenses, set budgets, and achieve your financial goals with our intuitive budgeting tools.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link
                    to="/register"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-all duration-200"
                  >
                    Get Started Free
                  </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <a
                    href="#features"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-all duration-200"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <PieChart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-900">Track Expenses</h3>
                <p className="text-blue-600">
                  Keep track of your spending habits and categorize your expenses effortlessly.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-900">Financial Insights</h3>
                <p className="text-blue-600">
                  Get detailed analytics and insights about your spending habits.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-900">Secure & Private</h3>
                <p className="text-blue-600">
                  Bank-level security to keep your financial data safe and protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-auto bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to start saving?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Join thousands of users who have transformed their financial lives.
            </p>
            <Link
              to="/register"
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-all duration-200"
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