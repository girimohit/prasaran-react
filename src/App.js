import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AllRoutes from "./all_routes";

function App() {
  
  return (
    <Router>
      <div className="App h-screen bg-[#DEE2E6]">
        <header className="App-header">
          <AllRoutes />
          {/* <BottomNavBar /> */}
        </header>
      </div>
    </Router>
  );
}

export default App;
