// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter as Router } from "react-router-dom";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AllRoutes from "./all_routes";

function App() {
  return (
    <>
      <Router>
        <div className="App h-screen bg-[#DEE2E6]">
          <header className="App-header">
            <AllRoutes />
          </header>
        </div>
      </Router>
    </>
  );
}

export default App;
