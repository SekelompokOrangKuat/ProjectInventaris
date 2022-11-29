import { Box, Grid, Typography, TextField, Button, TableContainer, TableCell, TableHead, Table, TableRow, styled, TableBody, Paper, Select, InputLabel, MenuItem, tableCellClasses, FormControl } from "@mui/material";
import { FileText, Edit, Trash2, PlusSquare } from "react-feather";
import { color } from "@mui/system";
import React, { useState } from "react";
import { useGetAllKibB } from "../../services/peralatanmesin";
import { useGetAllGoods } from "../../services/goods";
import { useEffect } from "react";


const columns = [

	{ id: 'pabrik', label: 'Pabrik', minWidth: 45, align: 'center' },
	{ id: 'rangka', label: 'Rangka', minWidth: 130, align: 'center' },
	{ id: 'mesin', label: 'Mesin', minWidth: 145, align: 'center' },
	{ id: 'polisi', label: 'Polisi', minWidth: 45, align: 'center' },
	{ id: 'bpkb', label: 'BPKB', minWidth: 65, align: 'center' },

];



const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "#0236A4",
		color: theme.palette.common.white,
		borderColor: "black"

	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
		borderColor: "black",
		align: "center",


	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: "#AAC3F3",
		align: "center",

	},
	'&:nth-of-type(even)': {
		backgroundColor: "#D9E6FF",
		align: "center",

	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));



const kodeBarang = [
	{
		value: '123123',
		label: 'Kode Barang',
	},
	{
		value: '12124124',
		label: 'Kode Barang'
	}
];


const fields = [];

const labels = [
	"Kode Lokasi",
	"Kode Barang",
	"Nomor Register",
	"Nama Barang",
	"Nomor Polisi",
	"Nomor Mesin",
	"Bahan",
	"Merk/Type",
	"Nomor Seri Pabrik",
	"Nomor Rangka",
	"Tahun Pembelian",
	"Asal Usul Perolehan",
	"Harga",
	"Keterangan"
]

for (let i = 0; i < labels.length; i++) {
	fields.push(
		<Grid item xs={i == labels.length - 1 ? 8 : 4}>
			<TextField variant="outlined" label={labels[i]} fullWidth ></TextField>
		</Grid>
	)
}
const PeralatanMesin = () => {
	var rows = useGetAllKibB();
	var dataBarang = useGetAllGoods();
	const [dataTable, setDataTable] = useState(rows);
	const [listNamaBarang, setListNamaBarang] = useState([]);
	const [listKodeBarang, setListKodeBarang] = useState([]);
	useEffect(() => {
		dataBarang.map((data) => {
			var kode_barang = data.golongan != "-" || data.golongan != "" || data.golongan != " " ? data.golongan : "";
			kode_barang += data.bidang != "-" || data.bidang != "" || data.bidang != " " ? "." + data.bidang : "";
			kode_barang += data.kelompok != "-" || data.kelompok != "" || data.kelompok != " " ? "." + data.kelompok : "";
			kode_barang += data.sub_kelompok != "-" || data.sub_kelompok != "" || data.sub_kelompok != " " ? "." + data.sub_kelompok : "";
			kode_barang += data.sub_sub_kelompok != "-" || data.sub_sub_kelompok != "" || data.sub_sub_kelompok != " " ? "." + data.sub_sub_kelompok : "";
			console.log(kode_barang);
			if (!listKodeBarang.includes(kode_barang)) {
				setListKodeBarang((prevData) => [...prevData, kode_barang]);
			}
			if (!listNamaBarang.includes(data.nama_barang)) {
				setListNamaBarang((prevData) => [...prevData, data.nama_barang]);
			}
		});
	}, [dataBarang]);
	useEffect(()=>{
		setDataTable(rows);
	}, [rows])
	const [kodeBarang, setKodeBarang] = useState('');
	const [kodeLokasi, setKodeLokasi] = useState('');
	const [namaBarang, setNamabarang] = useState('');
	const [nomorRegister, setNomorRegister] = useState('');
	const [tipeBarang, setTipeBarang] = useState('');
	const [ukuranBarang, setUkuranBarang] = useState('');
	const [bahanBarang, setBahanBarang] = useState('');
	const [tahunPembelian, setTahunPembelian] = useState('');
	const [nomorPabrik, setNomorPabrik] = useState('');
	const [nomorRangka, setNomorRangka] = useState('');
	const [nomorMesin, setNomorMesin] = useState('');
	const [nomorPolisi, setNomorPolisi] = useState('');
	const [nomorBpkb, setNomorBpkb] = useState('');
	const [asalUsul, setAsalUsul] = useState('');
	const [hargaBarang, setHargaBarang] = useState('');
	const [keterangan, setKeterangan] = useState('');

	const handleSubmit = async (e) => {
		try {
			let response = await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/kib/kibb/create",
				{
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'X-Requested-With': 'application/json',
						'Content-type': 'application/json; charset=UTF-8',
						'Access-Control-Allow-Origin': '*',
						"Authorization": localStorage.getItem('token'),
					},
					body: JSON.stringify({
						kode_barang: kodeBarang,
						kode_lokasi: kodeLokasi,
						nama_barang: namaBarang,
						nomor_register: nomorRegister,
						tipe_barang: tipeBarang,
						ukuran_barang: ukuranBarang,
						bahan_barang: bahanBarang,
						tahun_pembelian: tahunPembelian,
						nomor_pabrik: nomorPabrik,
						nomor_rangka: nomorRangka,
						nomor_mesin: nomorMesin,
						nomor_polisi: nomorPolisi,
						nomor_bpkb: nomorBpkb,
						asal_usul: asalUsul,
						harga_barang: hargaBarang,
						keterangan: keterangan
					})
				});

			let resJson = await response.json();
			console.log(resJson);
			window.location.reload()
		}
		catch (err) {
			console.log(err)
		}

	}

	const [isLoading, setIsLoading] = useState(false);
	const getSearchDataTable = async (keywords) => {
		setIsLoading(true);
		await fetch(
				'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/kib/kibb/search',
				
			{
				method: 'POST',
				body: JSON.stringify({
					keywords: keywords
				}),
				headers: {
					'Accept': 'application/json',
					'X-Requested-With': 'application/json',
					'Content-type': 'application/json; charset=UTF-8',
					'Access-Control-Allow-Origin': '*',
					'Authorization': localStorage.getItem('token'),
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.response_code === 200) {
					let selectedArray = [];
					for (let i = 0; i < data.data.length; i++) {
						if (data.data[i]) {
							selectedArray.push(data.data[i])
						}
					}
					setDataTable(selectedArray);
				} else if (data.response_code === 422) {
					console.log('keywords not found');
					setDataTable([]);
				} else {
					console.log('error' + data.response_code + data.response_message);
				}
			})
			.catch((err) => {
				console.log('error: ' + err.message);
			});
		setIsLoading(false);
	}

	return (
		<React.Fragment>
			<Box sx={{
				m: 4
			}}>
				<Box sx={{ display: 'flex' }}>
					<Box sx={{ mr: 1 }}>
						<FileText size={24} />
					</Box>
					<Typography
						variant="h5"
					>
						<b>KIB B (Peralatan dan Mesin)</b></Typography>
				</Box>

				<Box sx={{
					mt: 2,
					p: 4,
					backgroundColor: '#FAFAFA'
				}}
				>
					<Box display="flex">
						<Box sx={{ mr: 1 }} >
							<PlusSquare size={24} color="#616161"></PlusSquare>
						</Box>
						<Typography
							color={"#616161"}
							variant='h6'
						>Tambah Barang</Typography>
					</Box>

					<Box
						sx={{
							mt: 3
						}}
					>
						<Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
							<Grid item xs={4}>
								<TextField label="Kode Lokasi" variant="outlined" fullWidth onChange={(e) => setKodeLokasi(e.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<FormControl fullWidth>
									<InputLabel id="kode-barang">Kode Barang</InputLabel>
									<Select
										defaultValue=""
										label="Kode Barang"
										id="select-kode-barang"
										labelId="kode-barang"
										onChange={(e) => setKodeBarang(e.target.value)}
										fullWidth
									>
										{listKodeBarang.map((data) => { return (<MenuItem value={data}>{data}</MenuItem>) })}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={4}>
								<TextField label="Nomor Register" variant="outlined" fullWidth onChange={(e) => setNomorRegister(e.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<FormControl fullWidth>
									<InputLabel id="nama-barang">Nama Barang</InputLabel>
									<Select
										label="Nama Barang"
										id="select-nama-barang"
										labelId="nama-barang"
										onChange={(e) => setNamabarang(e.target.value)}
									>
										{listNamaBarang.map((data) => { return (<MenuItem value={data}>{data}</MenuItem>) })}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={4}>
								<TextField label="Nomor Polisi" variant="outlined" fullWidth onChange={(e) => setNomorPolisi(e.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<TextField label="Nomor BPKB" variant="outlined" fullWidth onChange={(e) => setNomorBpkb(e.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<TextField label="Nomor Mesin" variant="outlined" fullWidth onChange={(e) => setNomorMesin(e.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<TextField label="Bahan" variant="outlined" fullWidth onChange={(e) => setBahanBarang(e.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<TextField label="Merk/Type" variant="outlined" fullWidth onChange={(e) => setTipeBarang(e.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<TextField label="Nomor Seri Pabrik" variant="outlined" fullWidth onChange={(e) => setNomorPabrik(e.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<TextField label="Nomor Rangka" variant="outlined" fullWidth onChange={(e) => setNomorRangka(e.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<TextField label="Tahun Pembelian" variant="outlined" fullWidth onChange={(e) => setTahunPembelian(e.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<TextField label="Asal Usul Perolehan" variant="outlined" fullWidth onChange={(e) => setAsalUsul(e.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<TextField label="Harga" variant="outlined" fullWidth onChange={(e) => setHargaBarang(e.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<TextField label="Ukuran" variant="outlined" fullWidth onChange={(e) => setUkuranBarang(e.target.value)} />
							</Grid>
							<Grid item xs={12}>
								<TextField label="Keterangan" variant="outlined" fullWidth onChange={(e) => setKeterangan(e.target.value)} />
							</Grid>
						</Grid>
					</Box>
					<Box
						sx={{
							mt: 3
						}}
						display='flex'
						flexDirection='row'
						justifyContent='flex-end'
					>
						<Button variant="outlined" sx={{ width: 136 }}>
							Batal
						</Button>
						<Button variant="contained" sx={{ mr: 1, ml: 2, width: 136 }} onClick={handleSubmit}>
							Simpan
						</Button>
					</Box>
				</Box>
				<Box
					sx={{
						mt: 4
					}}
					display='flex'
					flexDirection='row'
					justifyContent='space-between'
				>
					<Typography>Preview</Typography>
					<TextField placeholder="Cari" onChange={(e) => { if (e.target.value !== "") { getSearchDataTable(e.target.value) } else {setDataTable(rows)} }}></TextField>
				</Box>
				<TableContainer
					sx={{
						mt: 2
					}}
					component={Paper}
				>
					<Table aria-label="simple table">
						<TableHead>
							<StyledTableRow
							>
								<StyledTableCell></StyledTableCell>
								<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>No</Typography></StyledTableCell>
								<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Jenis / Nama Barang</Typography></StyledTableCell>
								<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Register</Typography></StyledTableCell>
								<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Merk/Type</Typography></StyledTableCell>
								<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Ukuran/CC</Typography></StyledTableCell>
								<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Bahan</Typography></StyledTableCell>
								<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Tahun Pembelian</Typography></StyledTableCell>
								<StyledTableCell sx={{ display: 'flex', flexDirection: 'column' }}>
									<TableRow sx={{ alignSelf: 'center' }}>
										<StyledTableCell sx={{ border: 1, display: 'flex', }} align="center" colSpan={5}><Typography sx={{ color: '#E5E5E5' }}>Nomor</Typography></StyledTableCell>
									</TableRow>
									<TableRow sx={{ width: '100%' }}>
										{columns.map((column) => (
											<StyledTableCell
												key={column.id}
												align={column.align}
												style={{ top: 57, width: '300px' }}
											>
												{column.label}
											</StyledTableCell>
										))}
									</TableRow>
								</StyledTableCell>
								<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Asal Usul Cara Perolehan</Typography></StyledTableCell>
								<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Harga</Typography></StyledTableCell>
								<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Keterangan</Typography></StyledTableCell>
							</StyledTableRow>
						</TableHead>
						<TableBody>
							{dataTable.map((row, index) => (
								<StyledTableRow
									key={index}
									sx={{ '&:last-child td, &:last-child th, &:nth-of-type(odd)': { border: 0 } }}
								>
									<StyledTableCell>
										<Box sx={{ display: 'flex' }}>
											<Box sx={{ px: 1.5 }}>
												<Edit size={20} color="#0F2C64" />
											</Box>
											<Box sx={{ px: 1.5 }}>
												<Trash2 size={20} color="#D32F2F" />
											</Box>
										</Box>
									</StyledTableCell>
									<StyledTableCell align="center" component="th" scope="row">
										{index + 1}
									</StyledTableCell>
									<StyledTableCell align="center">{row.nama_barang}</StyledTableCell>
									<StyledTableCell align="center">{row.nomor_register}</StyledTableCell>
									<StyledTableCell align="center">{row.tipe_barang}</StyledTableCell>
									<StyledTableCell align="center">{row.ukuran_barang}</StyledTableCell>
									<StyledTableCell align="center">{row.bahan_barang}</StyledTableCell>
									<StyledTableCell align="center">{row.tahun_pembelian}</StyledTableCell>
									<StyledTableCell sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
										<TableRow sx={{ display: 'flex', width: '100%' }}>
											<StyledTableCell sx={{ width: '20%', border: "0 solid transparent" }}>
												{row.nomor_pabrik}
											</StyledTableCell>
											<StyledTableCell sx={{ width: '20%', border: "0 solid transparent" }}>
												{row.nomor_rangka}
											</StyledTableCell>
											<StyledTableCell sx={{ width: '20%', border: "0 solid transparent" }}>
												{row.nomor_mesin}
											</StyledTableCell>
											<StyledTableCell sx={{ width: '20%', border: "0 solid transparent" }}>
												{row.nomor_polisi}
											</StyledTableCell>
											<StyledTableCell sx={{ width: '20%', border: "0 solid transparent" }}>
												{row.nomor_bpkb}
											</StyledTableCell>
										</TableRow>
									</StyledTableCell>
									<StyledTableCell align="center">{row.asal_usul}</StyledTableCell>
									<StyledTableCell align="center">{row.harga_barang}</StyledTableCell>
									<StyledTableCell align="center">{row.keterangan}</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box >
		</React.Fragment>
	)
}

export default PeralatanMesin;