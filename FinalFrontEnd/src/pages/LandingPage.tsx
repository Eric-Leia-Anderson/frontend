import { Link } from 'react-router-dom';
import { PiggyBank, LineChart, Target } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <PiggyBank className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Budget Website</span>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Take Control of Your{' '}
            <span className="text-blue-600">Financial Future</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Track your spending, set budgets, and achieve your financial goals with our easy-to-use budgeting tools.
          </p>
          <div className="flex justify-center space-x-6">
            <Link
              to="/register"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:translate-y-[-2px]"
            >
              <span className="relative z-10 text-lg font-medium">Get Started</span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-700 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 text-lg font-medium shadow-md hover:shadow-lg hover:translate-y-[-2px]"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <LineChart className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Expenses</h3>
            <p className="text-gray-600">
              Keep track of your spending habits and categorize your expenses effortlessly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <PiggyBank className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Set Budgets</h3>
            <p className="text-gray-600">
              Create custom budgets for different categories and stay within your limits.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Achieve Goals</h3>
            <p className="text-gray-600">
              Set financial goals and track your progress with detailed insights and reports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;