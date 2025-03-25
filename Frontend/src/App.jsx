import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Form from "./Pages/Form";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />


      </Routes>

    </Router>
  );
}

export default App;
