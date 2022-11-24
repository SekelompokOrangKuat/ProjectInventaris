import { Routes, Route } from "react-router-dom";
import './App.css';
import React from "react";
import Layout from "./components/layout.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Login from "./pages/login.jsx";
import ForgotPassword from "./pages/forgotPassword.jsx";
import MutasiBarang from "./pages/mutasiBarang.jsx";
import Peminjaman from "./pages/peminjaman";
import KIR from "./pages/kir";
import Pemeliharaan from "./pages/pemeliharaan";
import Penghapusan from "./pages/penghapusan";
import Pengadaan from "./pages/pengadaan";
import Jadwal from "./pages/jadwal";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/pendataan" element={<Dashboard />}></Route>
          <Route path="/pendataan/pemeliharaan" element={<Pemeliharaan />}></Route>
          <Route path="/pendataan/penghapusan" element={<Penghapusan />}></Route>
          <Route path="/pendataan/pengadaan" element={<Pengadaan />}></Route>
          <Route path="/pendataan/jadwal" element={<Jadwal />}></Route>
          <Route path="/pencatatan" element={<Dashboard />}></Route>
          <Route path="/pelaporan" element={<Dashboard />}></Route>
          <Route path="/pencatatan/mutasi-barang" element={<MutasiBarang />}></Route>
          <Route path="/pencatatan/peminjaman" element={<Peminjaman />}></Route>
          <Route path="/pencatatan/kir" element={<KIR />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
