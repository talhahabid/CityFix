import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import CitizenHome from "./Pages/CitizenHome";

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/citizen" element={<CitizenHome />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />


      </Routes>

    </Router>
  );
}

export default App;
