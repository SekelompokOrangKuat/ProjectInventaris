import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout.jsx";
import Dashboard from "./pages/dashboard.jsx";
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
        </Routes>
    </React.Fragment>
  );
}

export default App;
