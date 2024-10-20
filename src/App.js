import { BrowserRouter as Router } from "react-router-dom";
import BottomNavBar from "./components/bottom_nav";
import AllRoutes from "./all_routes";

function App() {
  return (
    <Router>
      <div className="App h-screen bg-[#DEE2E6]">
        <header className="App-header">
          <AllRoutes />
          <BottomNavBar />
        </header>
      </div>
    </Router>
  );
}

export default App;
