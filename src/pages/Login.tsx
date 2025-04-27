import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wallet } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [exists, setExists] = useState(false);
  const [secret, setSecret] = useState('');
  const [remember, setRemember] = useState(false);
  const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setRemember(event.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({email: email, password: password, rememberMe: remember}),
      });
      
      if (response.status == 200) {
        const data = await response.json();
          localStorage.setItem('token', data.jwt);
          localStorage.setItem('id', data.id);
          localStorage.setItem('firstName', data.firstName);
          localStorage.setItem('lastName', data.lastName);
          localStorage.setItem('email', data.email);
          onLogin();
          navigate('/dashboard');
        
      } else if(response.status == 202) {
          setExists(true);
      }
      else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({email: email, password: password, oneTimeCode: secret}),
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.jwt);
        localStorage.setItem('id', data.id);
        localStorage.setItem('firstName', data.firstName);
        localStorage.setItem('lastName', data.lastName);
        localStorage.setItem('email', data.email);
        onLogin();
        navigate('/dashboard');
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center items-center">
          <Wallet className="h-12 w-12 text-blue-600" />
          <span className="ml-2 text-2xl font-bold text-blue-900">Budget Website</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-blue-600">
          Or{' '}
          <Link to="/register" className="font-medium text-blue-700 hover:text-blue-800">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 backdrop-blur-sm py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-blue-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-900">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue-900">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  checked={remember}
                  onChange={handleCheckboxChange}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>
          
          {exists && (
            <form className="space-y-6 mt-6" onSubmit={handleVerify}> 
              <div>
                <label htmlFor="secret" className="block text-sm font-medium text-blue-900">
                  Please Enter The One Time Password Sent To Your Email
                </label>
                <div className="mt-1">
                  <input
                    id="secret"
                    name="secret"
                    type="text"
                    autoComplete="one-time-code"
                    required
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm placeholder-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Verify
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;