import { Routes, Route } from "react-router-dom";
import './App.css';
import React from "react";
import Layout from "./components/layout.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Login from "./pages/login.jsx";
import ForgotPassword from "./pages/forgotPassword.jsx";
import MutasiBarang from "./pages/mutasiBarang.jsx";
import Peminjaman from "./pages/peminjaman";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/pendataan" element={<Dashboard />}></Route>
          <Route path="/pencatatan" element={<Dashboard />}></Route>
          <Route path="/pelaporan" element={<Dashboard />}></Route>
          <Route path="/pencatatan/mutasi-barang" element={<MutasiBarang />}></Route>
          <Route path="/pencatatan/peminjaman" element={<Peminjaman />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
