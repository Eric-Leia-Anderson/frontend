import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import LandingPage from './pages/LandingPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={
            <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/register" 
          element={
            <Register onRegister={handleLogin} />
          } 
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <Home />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/transactions"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <Transactions />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/budget"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <Budget />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <Profile />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;