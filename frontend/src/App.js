import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';

import Layout from "./components/layout.jsx";
import PDFViewer from "./components/pdf_viewer.jsx";

import Dashboard from "./pages/dashboard.jsx";
import Account from "./pages/admin/account.jsx";
import RoomCode from "./pages/admin/room-code.jsx";
import GoodsCode from "./pages/admin/goods-code.jsx";
import Skpd from "./pages/admin/skpd.jsx";

import Login from "./pages/login.jsx";
import ForgotPassword from "./pages/forgotPassword.jsx";
import MutasiBarang from "./pages/mutasiBarang.jsx";
import Peminjaman from "./pages/peminjaman";
import KIR from "./pages/kir";
import Pemeliharaan from "./pages/pemeliharaan";
import Penghapusan from "./pages/penghapusan";
import Pengadaan from "./pages/pengadaan";
import Jadwal from "./pages/jadwal";

import SOPMutasi from "./assets/pdf/SOP Mutasi.pdf";
import SOPPengelolaan from "./assets/pdf/SOP Pengelolaan Barang Milik Daerah.pdf";
import './App.css';

function App() {
  return (
    <React.Fragment>
        <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/" element={<Layout isAdmin={false}/>}>
            <Route path="" element={<Dashboard />}></Route>
            <Route path="pendataan" element={<Dashboard />}></Route>
            <Route path="pencatatan" element={<Dashboard />}></Route>
            <Route path="pelaporan" element={<Dashboard />}></Route>
            <Route path="pendataan" element={<Dashboard />}></Route>
            <Route path="pendataan/pemeliharaan" element={<Pemeliharaan />}></Route>
            <Route path="pendataan/penghapusan" element={<Penghapusan />}></Route>
            <Route path="pendataan/pengadaan" element={<Pengadaan />}></Route>
            <Route path="pendataan/jadwal" element={<Jadwal />}></Route>
            <Route path="pencatatan" element={<Dashboard />}></Route>
            <Route path="pelaporan" element={<Dashboard />}></Route>
            <Route path="pencatatan/mutasi-barang" element={<MutasiBarang />}></Route>
            <Route path="pencatatan/peminjaman" element={<Peminjaman />}></Route>
            <Route path="pencatatan/kir" element={<KIR />}></Route>
          </Route>
          <Route path="admin" element={<Layout isAdmin={true}/>}>
            <Route path="skpd" element={<Skpd/>}></Route>
            <Route path="ruangan" element={<RoomCode/>}></Route>
            <Route path="barang" element={<GoodsCode/>}></Route>
            <Route path="akun" element={<Account/>}></Route>
          </Route>
          

          {/* Exclusive path. Do not change those path! */}
          <Route path="pdf/mutasi" element={<PDFViewer file={SOPMutasi} />}></Route>
          <Route path="pdf/pengelolaan" element={<PDFViewer file={SOPPengelolaan} />}></Route>
          {/* End of exclusive path */}

        </Routes>
    </React.Fragment>
  );
}

export default App;
