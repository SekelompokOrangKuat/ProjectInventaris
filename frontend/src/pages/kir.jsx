import { Box, Grid, MenuItem, Select, Typography, Stack, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses, styled, Paper, Checkbox, Autocomplete } from "@mui/material";
import { Edit, FileText, PlusSquare, Trash2 } from "react-feather";
import React from "react";

const KIR = () => {
	const [isTableUsulan, setIsTableUsulan] = React.useState(true);
	const [visible, setVisible] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [dataRuangan, setDataRuangan] = React.useState([]);
	const [dataNamaBarang, setDataNamaBarang] = React.useState([]);
	const [dataRegisterBarang, setDataRegisterBarang] = React.useState([]);
	const [inputNamaBarang, setInputNamaBarang] = React.useState('');
	const [valueNamaBarang, setValueNamaBarang] = React.useState(null);
	const [inputRegisterBarang, setInputRegisterBarang] = React.useState('');
	const [inputNamaRuangan, setInputNamaRuangan] = React.useState('');
	const [valueNamaRuangan, setValueNamaRuangan] = React.useState(null);
	const [valueRegisterBarang, setValueRegisterBarang] = React.useState(null);
	const [isTambahBarang, setIsTambahBarang] = React.useState(true);
	const [isTambahRuangan, setIsTambahRuangan] = React.useState(true);
	const [getNamaBarang, setGetNamaBarang] = React.useState(true);
	const [currentEditNamaRuangan, setCurrentEditNamaRuangan] = React.useState('');
	const [selectedRuangan, setSelectedRuangan] = React.useState('');

	const [namaRuangan, setNamaRuangan] = React.useState('');
	const [kodeLokasi, setKodeLokasi] = React.useState('');
	const [kodeBarang, setKodeBarang] = React.useState('');
	const [merkBarang, setMerkBarang] = React.useState('');
	const [noSeriPabrik, setNoSeriPabrik] = React.useState('');
	const [ukuranBarang, setUkuranBarang] = React.useState('');
	const [bahanBarang, setBahanBarang] = React.useState('');
	const [keadaanBarang, setKeadaanBarang] = React.useState('');
	const [tahunPembelianBarang, setTahunPembelianBarang] = React.useState('');
	const [hargaPembelian, setHargaPembelian] = React.useState('');
	const [keterangan, setKeterangan] = React.useState('');
	const [ruanganListSelect, setRuanganListSelect] = React.useState([]);
	const [dataTable, setDataTable] = React.useState([]);
	const [selectedBarang, setSelectedBarang] = React.useState('');
	const [ruanganInput, setRuanganInput] = React.useState('');

	const handleNamaBarangChange = async (e) => {
		setValueNamaBarang(e);
		setInputNamaBarang(e);
		if (e !== '') {
			if (isTambahBarang) {
				await getNoRegister(e);
				setValueRegisterBarang(dataRegisterBarang[0].label);
				handleRegisterBarangChange(dataRegisterBarang[0].label);
			}
		} else {
			setValueRegisterBarang(null);
			handleRegisterBarangChange('');
		}
	}

	const handleRuanganBarangChange = (e) => {
		console.log(e);
		setRuanganInput(e);
	}

	const handleRegisterBarangChange = (e) => {
		setInputRegisterBarang(e);
		if (e !== '') {
			getBarangData(inputNamaBarang, e);
		}
	}

	// const handleNamaRuanganChange = (e) => {
	// 	setInputNamaRuangan(e);
	// 	if (e !== '') {
	// 		getNamaRuangan(inputNamaRuangan, e);
	// 	}
	// }

	const handleAutoFillField = (controller, e) => {
		controller(e.target.value);
	}

	const fields = [];

	const editBarang = async () => {
		console.log(selectedBarang);
		console.log(ruanganInput);
		await fetch(
			'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/kib/kibb/edit',
			{
				method: 'POST',
				body: JSON.stringify({
					id: selectedBarang,
					nama_ruangan: ruanganInput
				}),
				headers: {
					'Accept': 'application/json',
					'X-Requested-With': 'application/json',
					'Content-type': 'application/json; charset=UTF-8',
					'Access-Control-Allow-Origin': '*',
					'Authorization': localStorage.getItem('token')
				}
			}
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.response_code === 200) {
					console.log(data)
				} else {
					console.log('error' + data.response_code + ': ' + data.response_message);
				}
			})
			.catch((err) => { console.log('error: ' + err); });
	}

	const handleEditBarang = (item) => {
		setIsTambahBarang(false);
		setCurrentEditNamaRuangan(item.nama_ruangan);
	}

	const getBarangData = async (namaBarang, noRegister) => {
		await fetch(
			'https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/getBarang',
			{
				method: 'POST',
				body: JSON.stringify({
					nama_barang: namaBarang,
					nomor_register: noRegister
				}),
				headers: {
					'Accept': 'application/json',
					'X-Requested-With': 'application/json',
					'Content-type': 'application/json; charset=UTF-8',
					'Access-Control-Allow-Origin': '*',
					'Authorization': localStorage.getItem('token'),
				}
			}
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.response_code === 200) {
					setNamaRuangan(data.data.nama_ruangan);
					setKodeLokasi(data.data.kode_lokasi);
					setKodeBarang(data.data.kode_barang);
					setKeterangan(data.data.keterangan);
					setHargaPembelian(data.data.harga_barang);
					setMerkBarang(data.data.tipe_barang);
					setBahanBarang(data.data.bahan_barang);
					setUkuranBarang(data.data.ukuran_barang);
					setNoSeriPabrik(data.data.nomor_pabrik);
					setTahunPembelianBarang(data.data.tahun_pembelian);
					setSelectedBarang(data.data._id.$oid);
				} else {
					console.log('error');
				}
			})
			.catch((err) => { console.log('error: ' + err); });
	}

	const getNoRegister = async (namaBarang) => {
		await fetch(
			'https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/kib/kibb/search',
			{
				method: 'POST',
				body: JSON.stringify({
					keywords: namaBarang
				}),
				headers: {
					'Accept': 'application/json',
					'X-Requested-With': 'application/json',
					'Content-type': 'application/json; charset=UTF-8',
					'Access-Control-Allow-Origin': '*',
					'Authorization': localStorage.getItem('token'),
				}
			}
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.response_code === 200) {
					let barangRegister = [];
					for (let i = 0; i < data.data.length; i++) {
						barangRegister.push({ label: data.data[i].nomor_register, id: i });
					}
					setDataRegisterBarang(barangRegister);
				} else {
					console.log('error');
				}
			})
			.catch((err) => { console.log('error: ' + err); });
	}

	React.useEffect(() => {
		fetch(
			'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/ruangan/kir/findbyruangan',
			{
				method: 'POST',
				body: JSON.stringify({
					nama_ruangan: "KEPALA BIDANG GTK"
				}),
				headers: {
					'Accept': 'application/json',
					'X-Requested-With': 'application/json',
					'Content-type': 'application/json; charset=UTF-8',
					'Access-Control-Allow-Origin': '*',
					'Authorization': localStorage.getItem('token'),
				}
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data.response_code === 200) {
					setDataTable(data.data);
				} else {
					console.log(`error: ${data.response_code} ${data.response_message}`);
				}
			})
			.catch((err) => { console.log('error: ' + err); });

	}, []);
	React.useEffect(() => {
		fetch(
			'https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/kib/kibb/findAll',
			{
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'X-Requested-With': 'application/json',
					'Content-type': 'application/json; charset=UTF-8',
					'Access-Control-Allow-Origin': '*',
					'Authorization': localStorage.getItem('token'),
				}
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data.response_code === 200) {
					let barangName = [];
					let barangNameFix = [];
					for (let i = 0; i < data.data.length; i++) {
						barangName.push(data.data[i].nama_barang);
					}
					barangName = [...new Set(barangName)];
					for (let i = 0; i < barangName.length; i++) {
						barangNameFix.push({ label: barangName[i] });
					}
					setDataNamaBarang(barangNameFix);
				} else {
					console.log('error');
				}
			})
			.catch((err) => { console.log('error: ' + err); });
	}, []);

	const getSemuaRuangan = async () => {
		await fetch(
			'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/ruangan/ruangans/findAll',
			{
				method: 'GET',
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
				console.log(data);
				if (data.response_code === 200) {
					let namaRuangan = [];
					let namaRuanganFix = [];
					for (let i = 0; i < data.data.length; i++) {
						namaRuangan.push(data.data[i].nama_ruangan);
					}
					namaRuangan = [...new Set(namaRuangan)];
					for (let i = 0; i < namaRuangan.length; i++) {
						namaRuanganFix.push({ label: namaRuangan[i] });
					}

					const ruanganListSelectt = [];

					for (let i = 0; i < namaRuanganFix.length; i++) {
						ruanganListSelectt.push(
							<MenuItem value={namaRuanganFix[i].nama_ruangan}>{namaRuanganFix[i].nama_ruangan}</MenuItem>
						)
					}
					setSelectedRuangan(namaRuanganFix[0].nama_ruangan);
					setRuanganListSelect(ruanganListSelectt);
					setDataRuangan(namaRuanganFix);
					console.log(data)
				} else {
					console.log(`error: ${data.response_code} ${data.response_message}`);
				}
				console.log(data);

			})
			.catch((err) => {
				console.log('error: ' + err);
			});
	}

	React.useEffect(() => {
		getSemuaRuangan();
	}, []);

	const labels1 = [
		{ label: 'Kepala Bidang GTK' },
		{ label: 'Kepala Seksi Pengembangan' },
	]
	const labels = [
		{ name: "Nama Barang", controller: setDataNamaBarang, value: dataNamaBarang, isDisabled: !isTambahBarang, autocomplete: true },
		{ name: "Register", controller: setInputRegisterBarang, value: inputRegisterBarang, isDisabled: !isTambahBarang, autocomplete: true },
		{ name: "Nama Ruangan", controller: setRuanganInput, value: ruanganInput, isDisabled: false, autocomplete: false },
		{ name: "Kode Lokasi", controller: setKodeLokasi, value: kodeLokasi, isDisabled: true, autocomplete: false },
		{ name: "Kode Barang", controller: setKodeBarang, value: kodeBarang, isDisabled: true, autocomplete: false },
		{ name: "Merk/Model", controller: setMerkBarang, value: merkBarang, isDisabled: true, autocomplete: false },
		{ name: "No. Seri Pabrik", controller: setNoSeriPabrik, value: noSeriPabrik, isDisabled: true, autocomplete: false },
		{ name: "Ukuran", controller: setUkuranBarang, value: ukuranBarang, isDisabled: true, autocomplete: false },
		{ name: "Bahan", controller: setBahanBarang, value: bahanBarang, isDisabled: true, autocomplete: false },
		{ name: "Keadaan Barang", controller: setKeadaanBarang, value: keadaanBarang, isDisabled: true, autocomplete: false },
		{ name: "Tahun Pembuatan/ Pembelian", controller: setTahunPembelianBarang, value: tahunPembelianBarang, isDisabled: true, autocomplete: false },
		{ name: "Harga Beli/ Perolehan", controller: setHargaPembelian, value: hargaPembelian, isDisabled: true, autocomplete: false },
		{ name: "Keterangan", controller: setKeterangan, value: keterangan, isDisabled: true, autocomplete: false },
	];

	for (let i = 0; i < labels.length; i++) {
		if (!labels[i].autocomplete) {
			if (labels[i].isDisabled == false) {
				fields.push(
					<Grid item xs={i === labels.length - 1 ? 12 : 4}>
						<Autocomplete
							disablePortal
							id="combo-box-demo"
							options={labels1}
							// input={ruanganInput}
							onInputChange={(e, val) => handleRuanganBarangChange(val)}
							renderInput={(params) => <TextField {...params} label="Nama Ruangan" />}
						/>
					</Grid>
				);
			} else {
				fields.push(
					<Grid item xs={i === labels.length - 1 ? 12 : 4}>
						<TextField variant="outlined" label={labels[i].name} value={labels[i].value} onChange={(e) => handleAutoFillField(labels[i].controller, e)} fullWidth disabled={labels[i].isDisabled} />
					</Grid>
				);
			}
		}
		else {
			fields.push(
				<Grid item xs={4}>
					<Autocomplete
						disablePortal
						options={labels[i].name.localeCompare('Nama Barang') === 0 ? dataNamaBarang : dataRegisterBarang}
						renderInput={(params) => <TextField {...params} variant="outlined" label={labels[i].name} />}
						fullWidth
						value={labels[i].name.localeCompare('Register') === 0 ? valueRegisterBarang : valueNamaBarang}
						onChange={(event, newInput) => labels[i].name.localeCompare('Register') === 0 ? setValueRegisterBarang(newInput) : setValueNamaBarang(newInput)}
						input={labels[i].value}
						onInputChange={(event, newInput) => labels[i].name.localeCompare('Nama Barang') === 0 ? handleNamaBarangChange(newInput) : handleRegisterBarangChange(newInput)}
						disabled={labels[i].isDisabled}
					/>
				</Grid>
			)
		}
	}


	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: "#0236A4",
			color: theme.palette.common.white,
			borderColor: "black",
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
			borderColor: "black",
		},
	}));

	const StyledTableRow = styled(TableRow)(({ theme }) => ({
		'&:nth-of-type(odd)': {
			backgroundColor: "#AAC3F3",
		},
		'&:nth-of-type(even)': {
			backgroundColor: "#D9E6FF",
		},
	}));

	function createData(name, calories, fat, carbs, protein) {
		return { name, calories, fat, carbs, protein };
	}

	const rows = [
		createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
		createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
		createData('Eclair', 262, 16.0, 24, 6.0),
		createData('Cupcake', 305, 3.7, 67, 4.3),
		createData('Gingerbread', 356, 16.0, 49, 3.9),
	];

	return (
		<Box
			sx={{
				width: "100%",
				m: "0",
				boxSizing: "border-box"
			}}
		>
			<Box
				sx={{
					width: "100%",
					p: 3,
					boxSizing: "border-box"
				}}
			>
				<Grid
					container
					display="flex"
					flexDirection="row"
					justifyContent="flext-start"
					alignItems="center"
					gap={1}
				>
					<FileText size={20} />
					<Typography variant="h2">
						Kartu Inventaris Ruangan (KIR)
					</Typography>
				</Grid>
			</Box>
			<Stack
				spacing={1}
				sx={{
					backgroundColor: "#FAFAFA",
					mx: 3,
					mb: 3,
					maxWidth: "100%",
					width: "auto",
					borderRadius: "25px",
					boxSizing: "border-box",
					webkitBoxSizing: "border-box",
					mozBoxSizing: "border-box"
				}}
				pb={4}
			>
				<Grid
					container
					display="flex"
					flexDirection="row"
					justifyContent="flext-start"
					alignItems="center"
					gap={1}
					mt={4}
					ml={4}
					sx={{
						maxWidth: "100%",
						width: "auto",
						boxSizing: "border-box",
					}}
				>
					<PlusSquare size={24} color="#757575" />
					<Typography variant="h2" sx={{ color: "themeGrey.darker" }}>
						Edit Ruangan Barang
					</Typography>
				</Grid>
				<Grid
					container
					rowSpacing={{ xs: 1, sm: 2, md: 3 }}
					columnSpacing={{ xs: 1, sm: 2, md: 3 }}
					sx={{
						maxWidth: "100%",
						width: "auto",
						pr: 4,
						boxSizing: "border-box"
					}}
				>
					{fields}
				</Grid>
				<Box
					container
					display="flex"
					flexDirection="row"
					justifyContent="flex-end"
					alignItems="center"
					pt={4}
					pr={4}
					gap={1}
				>
					<Button variant="outlined" >
						<Typography variant="button">Batal</Typography>
					</Button>
					<Button variant="contained" disableElevation onClick={isLoading ? null : editBarang}>
						<Typography variant="button">Simpan</Typography>
					</Button>
				</Box>
			</Stack>
			<Grid
				container
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				maxWidth="100%"
				sx={{
					px: 3,
					boxSizing: "border-box"
				}}
			>
				<Grid item>
					<Select
						value={1}
					// onChange={(e) => setSelectedRuangan(e)}
					>
						<MenuItem value={0}>Kepala Seksi Pengembangan</MenuItem>
						<MenuItem value={1}>KEPALA BIDANG GTK</MenuItem>
						{ruanganListSelect}
					</Select>
				</Grid>
				{/* <Grid item>
					<TextField
						variant="outlined"
						label="Search"
						onChange={
							(e) => {
								if (e.target.value !== '') {
									getSearchDataTable(e.target.value);
								} else {
									getDataTable(isTableUsulan ? 0 : 1);
								}
							}
						}
					/>
				</Grid> */}
			</Grid>
			<TableContainer
				component={Paper}
				sx={{
					maxWidth: "100%",
					width: "auto",
					m: 3
				}}
			>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
							<StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
							<StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
							<StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
							<StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
							<StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
							<StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
							<StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
							<StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
							<StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
							<StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
							<StyledTableCell align="center" colSpan={3} sx={{ border: 1 }}>Keadaan Barang</StyledTableCell>
							<StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
						</TableRow>
						<TableRow>
							<StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}></StyledTableCell>
							<StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>No</StyledTableCell>
							<StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Jenis Barang/ Nama Barang</StyledTableCell>
							<StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Merk/ Model</StyledTableCell>
							<StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>No. Seri Pabrik</StyledTableCell>
							<StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Ukuran</StyledTableCell>
							<StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Bahan</StyledTableCell>
							<StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Tahun Pembuatan/ Pembelian</StyledTableCell>
							<StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>No. Kode Barang</StyledTableCell>
							<StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Jumlah Barang/ Register</StyledTableCell>
							<StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Harga Beli/ Perolehan</StyledTableCell>
							<StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Baik (B)</StyledTableCell>
							<StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Kurang Baik (KB)</StyledTableCell>
							<StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Rusak Berat (RB)</StyledTableCell>
							<StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Keterangan</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{dataTable.map((row, index) => (
							<StyledTableRow key={index}>
								<StyledTableCell align="center" sx={{ border: 1 }}>
									<Stack
										direction="row"
										justifyContent="center"
										alignItems="center"
										spacing={2}
									>
										<Checkbox sx={{ margin: "0", padding: "0" }} size="medium" />
										<Edit size={20} />
										<Trash2 size={20} />
									</Stack>
								</StyledTableCell>
								<StyledTableCell align="center" sx={{ border: 1 }}>{index}</StyledTableCell>
								<StyledTableCell align="center" sx={{ border: 1 }}>{row.calories}</StyledTableCell>
								<StyledTableCell align="center" sx={{ border: 1 }}>{row.fat}</StyledTableCell>
								<StyledTableCell align="center" sx={{ border: 1 }}>{row.carbs}</StyledTableCell>
								<StyledTableCell align="center" sx={{ border: 1 }}>{row.protein}</StyledTableCell>
								<StyledTableCell align="center" sx={{ border: 1 }}>{row.calories}</StyledTableCell>
								<StyledTableCell align="center" sx={{ border: 1 }}>{row.fat}</StyledTableCell>
								<StyledTableCell align="center" sx={{ border: 1 }}>{row.carbs}</StyledTableCell>
								<StyledTableCell align="center" sx={{ border: 1 }}>{row.protein}</StyledTableCell>
								<StyledTableCell align="center" sx={{ border: 1 }}>{row.calories}</StyledTableCell>
								<StyledTableCell align="center" sx={{ border: 1 }}>{row.fat}</StyledTableCell>
								<StyledTableCell align="center" sx={{ border: 1 }}>{row.carbs}</StyledTableCell>
								<StyledTableCell align="center" sx={{ border: 1 }}>{row.protein}</StyledTableCell>
								<StyledTableCell align="center" sx={{ border: 1 }}>-</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

export default KIR;