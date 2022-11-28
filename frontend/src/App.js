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
import Tanah from "./pages/kib/tanah.jsx";
import PeralatanMesin from "./pages/kib/peralatanmesin.jsx";
import GedungBangunan from "./pages/kib/gedungbangunan.jsx";
import JalanIrigasiJaringan from "./pages/kib/jalanirigasi.jsx";
import AsetTetap from "./pages/kib/asettetap.jsx";
import Konstruksi from "./pages/kib/konstruksi.jsx";

import SOPMutasi from "./assets/pdf/SOP Mutasi.pdf";
import SOPPengelolaan from "./assets/pdf/SOP Pengelolaan Barang Milik Daerah.pdf";
import BeritaAcaraMutasi from "./assets/pdf/BERITA ACARA Mutasi.pdf";
import BeritaAcaraPeminjaman from "./assets/pdf/BERITA ACARA Peminjaman.pdf";
import RekapMutasi from "./assets/pdf/Rekap Mutasi.pdf";
import RekapPeminjaman from "./assets/pdf/Rekap Peminjaman.pdf";
import RBIPDF from "./assets/pdf/RBI.pdf";
import KIRPDF from "./assets/pdf/KIR Bid. GTK.pdf";
import QRCodeLabelBarang from "./assets/pdf/QR Code Label Barang.pdf";
import KIBA from "./assets/pdf/KIB A.pdf"
import KIBB from "./assets/pdf/KIB B.pdf"
import KIBC from "./assets/pdf/KIB C.pdf"
import KIBD from "./assets/pdf/KIB D.pdf"
import KIBE from "./assets/pdf/KIB E.pdf"
import KIBF from "./assets/pdf/KIB F.pdf"

import './App.css';
import Laporan from "./pages/laporan";
import Pencatatan from "./pages/pencatatan";
import Pendataan from "./pages/pendataan";

function App() {
  var user = {
    name: '',
    role: '',
  };
  if(localStorage.getItem('token')){
    user.name = localStorage.getItem('nama');
    user.role = localStorage.getItem('role');
  }
  return (
    <React.Fragment>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/" element={<Layout isAdmin={false} user={user}/>}>
          <Route path="" element={<Dashboard />}></Route>
					<Route path="pendataan" element={<Pendataan />}></Route>
					<Route path="pencatatan" element={<Pencatatan />}></Route>
          <Route path="pelaporan" element={<Laporan />}></Route>
          <Route path="pendataan/pemeliharaan" element={<Pemeliharaan />}></Route>
          <Route path="pendataan/penghapusan" element={<Penghapusan />}></Route>
          <Route path="pendataan/pengadaan" element={<Pengadaan />}></Route>
          <Route path="pendataan/jadwal" element={<Jadwal />}></Route>
          <Route path="pencatatan" element={<Dashboard />}></Route>
          <Route path="pencatatan/mutasi-barang" element={<MutasiBarang />}></Route>
          <Route path="pencatatan/peminjaman" element={<Peminjaman />}></Route>
          <Route path="pencatatan/kir" element={<KIR />}></Route>
          <Route path="kib/a" element={<Tanah />} />
          <Route path="kib/b" element={<PeralatanMesin />} />
          <Route path="kib/c" element={<GedungBangunan />} />
          <Route path="kib/d" element={<JalanIrigasiJaringan />} />
          <Route path="kib/e" element={<AsetTetap />} />
          <Route path="kib/f" element={<Konstruksi />} />
        </Route>
        <Route path="admin" element={<Layout isAdmin={true} user={user} />}>
          <Route path="skpd" element={<Skpd />}></Route>
          <Route path="ruangan" element={<RoomCode />}></Route>
          <Route path="barang" element={<GoodsCode />}></Route>
          <Route path="akun" element={<Account />}></Route>
        </Route>


        {/* Exclusive path. Do not change those path! */}
        <Route path="pdf/mutasi" element={<PDFViewer file={SOPMutasi} />}></Route>
        <Route path="pdf/pengelolaan" element={<PDFViewer file={SOPPengelolaan} />}></Route>
        <Route path="pdf/berita-acara-mutasi" element={<PDFViewer file={BeritaAcaraMutasi} />}></Route>
        <Route path="pdf/berita-acara-peminjaman" element={<PDFViewer file={BeritaAcaraPeminjaman} />}></Route>
        <Route path="pdf/rekap-mutasi" element={<PDFViewer file={RekapMutasi} />}></Route>
        <Route path="pdf/rekap-peminjaman" element={<PDFViewer file={RekapPeminjaman} />}></Route>
        <Route path="pdf/rbi" element={<PDFViewer file={RBIPDF} />}></Route>
        <Route path="pdf/kir-pdf" element={<PDFViewer file={KIRPDF} />}></Route>
        <Route path="pdf/kir-qrcode" element={<PDFViewer file={QRCodeLabelBarang} />}></Route>
        <Route path="pdf/kib-a" element={<PDFViewer file={KIBA} />}></Route>
        <Route path="pdf/kib-b" element={<PDFViewer file={KIBB} />}></Route>
        <Route path="pdf/kib-c" element={<PDFViewer file={KIBC} />}></Route>
        <Route path="pdf/kib-d" element={<PDFViewer file={KIBD} />}></Route>
        <Route path="pdf/kib-e" element={<PDFViewer file={KIBE} />}></Route>
        <Route path="pdf/kib-f" element={<PDFViewer file={KIBF} />}></Route>
        {/* End of exclusive path */}

			</Routes>
		</React.Fragment>
	);
}

export default App;
