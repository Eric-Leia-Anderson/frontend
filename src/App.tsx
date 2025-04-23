import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateTransaction from './pages/CreateTransaction';
import Transactions from './pages/Transactions';
import CreateBudget from './pages/CreateBudget';
import Budget from './pages/Budget';
import Layout from './components/Layout';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import CreateCategory from './pages/CreateCategory';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogin = () => {
    console.log("Authenticated, login");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    console.log("Not Authenticated, logout");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/" element={isAuthenticated ? (<Layout onLogout={handleLogout}> <Dashboard /> </Layout>) : (<Navigate to="/login" replace />)} />
        <Route path="/CreateTransaction/" element={isAuthenticated ? (<Layout onLogout={handleLogout}><CreateTransaction /></Layout>) : (<Navigate to="/login" replace />)} />
        <Route path="/transactions/" element={isAuthenticated ? (<Layout onLogout={handleLogout}> <Transactions /> </Layout>) : (<Navigate to="/login" replace />)} />
        <Route path="/CreateBudget/" element={isAuthenticated ? (<Layout onLogout={handleLogout}> <CreateBudget /> </Layout>) : (<Navigate to="/login" replace />)} />
        <Route path="/Budget/" element={isAuthenticated ? (<Layout onLogout={handleLogout}> <Budget /> </Layout>) : (<Navigate to="/login" replace />)} />
        <Route path="/Analytics/" element={isAuthenticated ? (<Layout onLogout={handleLogout}> <Analytics /> </Layout>) : (<Navigate to="/login" replace />)} />
        <Route path="/Profile/" element={isAuthenticated ? (<Layout onLogout={handleLogout}> <Profile /> </Layout>) : (<Navigate to="/login" replace />)} />
        <Route path="/CreateCategory/" element={isAuthenticated ? (<Layout onLogout={handleLogout}> <CreateCategory /> </Layout>) : (<Navigate to="/login" replace />)} />
      </Routes>
    </Router>
  );
}

export default App;