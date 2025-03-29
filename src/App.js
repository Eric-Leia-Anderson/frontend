
import TopNavbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AnalyticsPage from './pages/AnalyticsPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
          <BrowserRouter>
            <TopNavbar/>
            <div className='pages'>
              <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/analytics" element={<AnalyticsPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path ="/signup" element={<SignupPage/>}/>
              </Routes>
            </div>
          </BrowserRouter>
          
    </div>
  );
}

export default App;
