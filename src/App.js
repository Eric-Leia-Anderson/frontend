
import './App.css';
import TopNavbar from './components/Navbar';
import NewBudget from './components/newBudget';
import HomePage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
          <TopNavbar/>
          <HomePage/>
          <NewBudget/>
    </div>
  );
}

export default App;
