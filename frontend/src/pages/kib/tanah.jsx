import { Box, Grid, MenuItem, Select, Typography, Stack, TextField, Button, TableContainer, TableCell, TableHead, Table, TableRow, styled, TableBody, Paper, tableCellClasses } from "@mui/material";
import { FileText, Edit, Trash2, PlusSquare } from "react-feather";
import { color } from "@mui/system";
import React from "react";

const Tanah = () => {
	const [dataTable, setDataTable] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [isTableUsulan, setIsTableUsulan] = React.useState(true);

	const concatData = (data1, data2, status) => {
		let concatedData = [];
		for (let i = 0; i < data2.length; i++) {
			const joinedObject = { ...data1[i], ...data2[i] };
			if (status === 0) {
				if (joinedObject.status_kib === 0) {
					concatedData.push(joinedObject);
				}
			} else {
				if (joinedObject.status_kib !== 0) {
					concatedData.push(joinedObject);
				}
			}
		}
		setDataTable(concatedData);
	}

	const getStatusCode = (status) => {
		switch (status) {
			case 1:
				return "Accepted";
				break;
			case 2:
				return "Rejected";
				break;
			case 3:
				return "New";
				break;
			default:
				return "Deleted";
				break;
		}
	}

	/*GET ALL DATA TABLE*/
	const getDataTable = async (status) => {
		setIsLoading(true);
		await fetch(
			'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/kib/kiba/findAll',
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
				if (data.response_code === 200) {
					let selectedArray = [];
					for (let i = 0; i < data.data.length; i++) {
						if (data.data[i].status_kib === status) {
							selectedArray.push(data.data[i])
						}
					}
					setDataTable(selectedArray);
					console.log(selectedArray);
				} else {
					console.log(data.response_message);
				}
			})
			.catch((err) => {
				console.log('error: ' + err.message);
			});
		setIsLoading(false);
	}

	/*GET DATA TABLE BY KEYWORDS FROM API (SEARCH)*/
	const getSearchDataTable = async (keywords) => {
		setIsLoading(true);
		await fetch(
			isTableUsulan
				? 'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/kib/kiba/search'
				: 'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/kib/kiba/search_riwayat',
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

	const fields = [];

	const labels = [
		"Kode Lokasi",
		"Kode Barang",
		"Nomor Register",
		"Nama Barang",
		"Luas (M2)",
		"Tahun Pengadaan",
		"No. Sertifikat",
		"Tanggal Sertifikat",
		"Letak/Alamat",
		"Status",
		"Penggunaan",
		"Harga",
		"Asal Usul",
		"Keterangan"
	]

	for (let i = 0; i < labels.length; i++) {
		fields.push(
			<Grid item xs={i == labels.length - 1 ? 8 : 4}>
				<TextField variant="outlined" label={labels[i]} fullWidth></TextField>
			</Grid>
		)
	}
	const columns = [

		{ id: 'kode', label: 'Kode Barang', minWidth: 140, align: 'center' },
		{ id: 'register', label: 'Register', minWidth: 80, align: 'center' },

	];

	const columns3 = [

		{ id: 'tanggal', label: 'Tanggal', minWidth: 130, align: 'center' },
		{ id: 'nomor', label: 'Nomor', minWidth: 90, align: 'center' }
	]

	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: "#0236A4",
			color: theme.palette.common.white,
			borderColor: "black",
			minWidth: 50

		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
			borderColor: "black",
			align: "center"
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

	/* Initial State */
	React.useEffect(() => {
		getDataTable(0);
	}, []);

	return (
		<Box sx={{
			width: "100%",
			m: "0",
			boxSizing: "border-box"
		}}>
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
						KIB A (Tanah)
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
						Tambah Barang
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
					<Button variant="contained" disableElevation>
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
						value={isTableUsulan}
						onChange={() => {
							getDataTable(!isTableUsulan ? 0 : 1);
							setIsTableUsulan(!isTableUsulan);
						}}
					>
						<MenuItem value={true}>Usulan</MenuItem>
						<MenuItem value={false}>Riwayat</MenuItem>
					</Select>
				</Grid>
				<Grid item>
					<TextField placeholder="Cari" variant="outlined"
						onChange={
							(e) => {
								if (e.target.value !== '') {
									getSearchDataTable(e.target.value);
								} else {
									getDataTable(isTableUsulan ? 0 : 1);
								}
							}
						}
					>
					</TextField>
				</Grid>
			</Grid>
			<TableContainer
				sx={{
					m: 4,
					width: "auto",
					maxWidth: "100%"
				}}
				component={Paper}
			>
				<Table aria-label="simple table">
					<TableHead>
						<StyledTableRow
						>
							<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>No</Typography></StyledTableCell>
							<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Jenis / Nama Barang</Typography></StyledTableCell>
							<TableRow>
								<StyledTableCell sx={{ border: 1 }} align="center" colSpan={2}><Typography sx={{ color: '#E5E5E5' }}>Nomor</Typography></StyledTableCell>
							</TableRow>
							<TableRow>
								{columns.map((column) => (
									<StyledTableCell
										key={column.id}
										align={column.align}
										style={{ top: 57, minWidth: column.minWidth }}
										sx={{ py: 5.5 }}
									>
										{column.label}
									</StyledTableCell>
								))}
							</TableRow>
							<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Luas (M2)</Typography></StyledTableCell>
							<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Tahun Pengadaan</Typography></StyledTableCell>
							<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Letak / Alamat</Typography></StyledTableCell>
							<TableRow>
								<TableRow>
									<StyledTableCell sx={{ border: 1 }} align="center" colSpan={2}><Typography sx={{ color: '#E5E5E5' }}>Status Tanah</Typography></StyledTableCell>
								</TableRow>
								<TableRow>
									<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Hak</Typography></StyledTableCell>
									<TableRow>
										<StyledTableCell sx={{ border: 1 }} align="center" colSpan={2}><Typography sx={{ color: '#E5E5E5' }}>Sertifikat</Typography></StyledTableCell>
									</TableRow>
									<TableRow>
										{columns3.map((column) => (
											<StyledTableCell
												key={column.id}
												align={column.align}
												style={{ top: 57, minWidth: column.minWidth }}
											>
												{column.label}
											</StyledTableCell>
										))}

									</TableRow>
								</TableRow>
							</TableRow>
							<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Penggunaan</Typography></StyledTableCell>
							<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Asal Usul</Typography></StyledTableCell>
							<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Harga</Typography></StyledTableCell>
							<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Keterangan</Typography></StyledTableCell>
						</StyledTableRow>
					</TableHead>
					<TableBody>
						{dataTable.map((item, index) => (
							<StyledTableRow
								key={index}
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
								<StyledTableCell align="center">
									{index}
								</StyledTableCell>
								<StyledTableCell align="center">{item.nama_barang}</StyledTableCell>
								<TableRow hover role="checkbox" tabIndex={-1} key={item.kode_barang}>
									{columns.map((column) => {
										const value = index[column.id];
										return (
											<StyledTableCell key={column.id} align={column.align} sx={{ px: 4, py: 8 }}>
												{item.kode_barang}
											</StyledTableCell>
										);
									})}
								</TableRow>
								<StyledTableCell align="center">{item.luas}</StyledTableCell>
								<StyledTableCell align="center">{item.tahun_pengadaan}</StyledTableCell>
								<StyledTableCell align="center">{item.alamat}</StyledTableCell>
								<StyledTableCell align="center">{item.status_tanah}</StyledTableCell>
								<StyledTableCell align="center">{item.tanggal_sertifikat}</StyledTableCell>
								{/* <TableRow hover role="checkbox" tabIndex={-1} key={index[7]}>
									<StyledTableCell align="center" sx={{ border: 0, px: 4 }}>-</StyledTableCell>
									{columns3.map((column) => {
										const value = index[column.id];
										return (
											<StyledTableCell key={column.id} align={column.align} sx={{ px: 5, border: 0 }}>
												-
											</StyledTableCell>
										);
									})}
								</TableRow> */}
								<StyledTableCell align="center">{item.nomor_sertifikat}</StyledTableCell>
								<StyledTableCell align="center">{item.penggunaan}</StyledTableCell>
								<StyledTableCell align="center">{item.asal_usul}</StyledTableCell>
								<StyledTableCell align="center">{item.harga}</StyledTableCell>
								<StyledTableCell align="center">{item.keterangan}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box >
	)
}

export default Tanah;