import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout.jsx";
import PDFViewer from "./components/pdf_viewer.jsx";

import Dashboard from "./pages/dashboard.jsx";
import Account from "./pages/admin/account.jsx";
import RoomCode from "./pages/admin/room-code.jsx";

import SOPMutasi from "./assets/pdf/SOP Mutasi.pdf";
import SOPPengelolaan from "./assets/pdf/SOP Pengelolaan Barang Milik Daerah.pdf";
import './App.css';

function App() {
  return (
    <React.Fragment>
        <Routes>
          <Route path="/" element={<Layout isAdmin={false}/>}>
            <Route path="" element={<Dashboard />}></Route>
            <Route path="pendataan" element={<Dashboard />}></Route>
            <Route path="pencatatan" element={<Dashboard />}></Route>
            <Route path="pelaporan" element={<Dashboard />}></Route>
          </Route>
          <Route path="admin" element={<Layout isAdmin={true}/>}>
            <Route path="ruangan" element={<RoomCode/>}></Route>
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
