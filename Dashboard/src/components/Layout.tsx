import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Receipt, PiggyBank, User2, LogOut } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user] = React.useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com'
  });

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/transactions', icon: Receipt, label: 'Transactions' },
    { path: '/budget', icon: PiggyBank, label: 'Budget Planning' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600">Budget Website</h1>
        </div>
        
        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                isActive(item.path) ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 border-t border-gray-200">
          <Link
            to="/profile"
            className="flex items-center px-6 py-3 hover:bg-blue-50"
          >
            <div className="flex items-center flex-1">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                {user.firstName[0]}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </Link>
          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Exit
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;