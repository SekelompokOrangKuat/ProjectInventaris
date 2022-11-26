import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout.jsx";
import Dashboard from "./pages/dashboard.jsx";
import './App.css';
import React from "react";
import Tanah from "./pages/kib/tanah.jsx";
import PeralatanMesin from "./pages/kib/peralatanmesin.jsx";
import GedungBangunan from "./pages/kib/gedungbangunan.jsx";
import JalanIrigasiJaringan from "./pages/kib/jalanirigasi.jsx";
import AsetTetap from "./pages/kib/asettetap.jsx";
import Konstruksi from "./pages/kib/konstruksi.jsx";

function App() {
	return (
		<React.Fragment>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Dashboard />}></Route>
					<Route path="/pendataan" element={<Dashboard />}></Route>
					<Route path="/pencatatan" element={<Dashboard />}></Route>
					<Route path="/pelaporan" element={<Dashboard />}></Route>
					<Route path="/tanah" element={<Tanah />} />
					<Route path="/peralatanmesin" element={<PeralatanMesin />} />
					<Route path="/gedungbangunan" element={<GedungBangunan />} />
					<Route path="/jalanirigasijaringan" element={<JalanIrigasiJaringan />} />
					<Route path="/asettetap" element={<AsetTetap />} />
					<Route path="/konstruksi" element={<Konstruksi />} />
				</Route>
			</Routes>
		</React.Fragment>
	);
}

export default App;
