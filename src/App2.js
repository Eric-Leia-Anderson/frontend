
import React from 'react';
import TopNavbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AnalyticsPage from './pages/AnalyticsPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
          <BrowserRouter>
            <TopNavbar/>
            <div className='pages'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
                {/**<Route path="/" element={<HomePage/>}/>
                <Route path="/analytics" element={<AnalyticsPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path ="/signup" element={<SignupPage/>}/>**/}
              </Routes>
            </div>
          </BrowserRouter>
          
    </div>
  );
}

export default App;
