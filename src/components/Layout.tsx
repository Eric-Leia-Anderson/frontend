import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Receipt, PiggyBank, User2, LogOut, PieChart, Blocks, Wallet } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onLogout}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const email = localStorage.getItem('email');

  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/transactions', icon: Receipt, label: 'Transactions' },
    { path: '/budget', icon: PiggyBank, label: 'Budget Planning' },
    { path: '/analytics', icon: PieChart, label: 'Analytics' },
    { path: '/CreateCategory', icon: Blocks, label: 'Create Category' },
  ];
  
  const handleLogout = () => {
    onLogout();
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Sidebar with blue-600 based gradient */}
      <div className="w-64 bg-gradient-to-r from-blue-600 to-blue-700 border-r border-blue-400/20 shadow-xl">
        <div className="p-4">
          <div className="flex items-center">
            <Wallet className="h-8 w-8 text-white" />
            <h1 className="ml-2 text-2xl font-bold text-white">Fit Budget</h1>
          </div>
        </div>
        
        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 hover:bg-blue-600/60 transition-colors ${
                isActive(item.path) ? 'bg-blue-700/40 text-white font-medium' : 'text-white'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 border-t border-blue-400/30">
          <Link
            to="/profile"
            className="flex items-center px-6 py-3 hover:bg-blue-600/60 transition-colors"
          >
            <div className="flex items-center flex-1">
              <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center text-blue-700 font-medium">
                {firstName?.[0]}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{firstName} {lastName}</p>
                <p className="text-xs text-blue-100">{email}</p>
              </div>
            </div> 
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-6 py-3 text-white hover:bg-red-500/30 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Exit
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;