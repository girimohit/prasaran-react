// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from "./Register";
import LoginPage from './loginPage';

function App() {
  
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
