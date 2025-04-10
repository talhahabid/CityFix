import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import CitizenHome from "./Pages/CitizenHome";
import CouncilHome from "./Pages/CouncilHome";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import CouncilSignin from "./Pages/CouncilSignin";
import Profile from "./Pages/Profile";
import SubmitReport from "./Pages/SubmitReport";
import ViewReports from "./Pages/ViewReports";
import SubmitSucess from "./Pages/SubmitSucess";

function App() {
  const { user } = useAuthContext();

  return (
    <Router>
        <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route exact path="/citizen" element={user?.user?.userType === "citizen" ? <CitizenHome /> : user?.user?.userType === "council" ? <CouncilHome /> : <Signin />} />
        <Route exact path="/signup" element={user ? <CitizenHome /> : <Signup />} />
        <Route exact path="/signin" element={user ? <CitizenHome /> : <Signin />} />
        <Route exact path="/council-signin" element={user ? <CitizenHome /> : <CouncilSignin />} />
        <Route exact path="/council" element={user && user.user.userType == "council" ? <CouncilHome /> : <CitizenHome />} />
        <Route exact path="/profile" element={user ? <Profile /> : <Signin />} />
        <Route exact path="/submit-report" element={user?.user?.userType === "citizen" ? <SubmitReport /> : user?.user?.userType === "council" ? <CouncilHome /> : <Signin />} />
        <Route exact path="/view-report" element={user?.user?.userType === "citizen" ? <ViewReports /> : user?.user?.userType === "council" ? <CouncilHome /> : <Signin />} />

        <Route path="/council" element={<CouncilHome />} />
        <Route path="/submission-successful" element={<SubmitSucess />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/signin" element={<Signin />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
