import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ChooseUser from "./pages/ChooseUser";
import LoginPage from "./pages/LoginPage";
import AdminRegisterPage from "./pages/admin/AdminRegisterPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import FrontDeskDashboard from "./pages/frontdesk/FrontDeskDashboard";
// import Logout from "./pages/Logout";
// import AdminProfile from "./pages/admin/AdminProfile3";

const App = () => {
  const { currentRole } = useSelector((state) => state.user);

  // const currentRole = "FrontDesk";

  return (
    <Router>
      {currentRole === null && (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/choose" element={<ChooseUser />} />
          <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
          <Route
            path="/Frontdesklogin"
            element={<LoginPage role="Frontdesk" />}
          />
          <Route path="/Financelogin" element={<LoginPage role="Finance" />} />

          <Route path="/Adminregister" element={<AdminRegisterPage />} />

          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/FrontDeskDashboard" element={<FrontDeskDashboard />} />
        </Routes>
       )} 

      {currentRole === "Admin" && (
        <>
          <AdminDashboard />
        </>
      )}

{currentRole === "FrontDesk" && (
        <>
          <FrontDeskDashboard />
        </>
      )}

{currentRole === "Finance" && (
        <>
          <FrontDeskDashboard />
        </>
      )}

    </Router>
  );
};


export default App;
