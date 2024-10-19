// import logo from './logo.svg';
// import './App.css';

import Register from "./Register";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/register" element={<Register />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
