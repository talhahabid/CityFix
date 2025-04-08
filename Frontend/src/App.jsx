import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import CitizenHome from "./Pages/CitizenHome";
import CouncilHome from "./Pages/CouncilHome";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar /> {/* Move Navbar outside of Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/citizen" element={<CitizenHome />} />
        <Route path="/council" element={<CouncilHome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
