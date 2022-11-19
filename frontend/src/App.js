import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Login from "./pages/login.jsx";
import ForgotPassword from "./pages/forgotPassword.jsx";
import './App.css';
import React from "react";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/pendataan" element={<Dashboard />}></Route>
          <Route path="/pencatatan" element={<Dashboard />}></Route>
          <Route path="/pelaporan" element={<Dashboard />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
