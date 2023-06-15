import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Races from "./pages/Races";
import Drivers from "./pages/Drivers";
import Teams from "./pages/Teams";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="races" element={<Races />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="teams" element={<Teams />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
