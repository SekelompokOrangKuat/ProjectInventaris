import { Box, Grid, Typography, TextField, Button, TableContainer, TableCell, TableHead, Table, TableRow, styled, TableBody, Paper, tableCellClasses } from "@mui/material";
import { FileText, Edit, Trash2, PlusSquare } from "react-feather";
import { color } from "@mui/system";
import React from "react";

const columns = [
	{ id: 'kode', label: 'Kode Barang', minWidth: 160, align: 'center' },
	{ id: 'register', label: 'Register', minWidth: 140, align: 'center' },
];

const columns1 = [
	{ id: 'tingkat', label: 'Bertingkat/Tidak', minWidth: 100, align: 'center' },
	{ id: 'beton', label: 'Beton/Tidak', minWidth: 100, align: 'center' },
];

const columns2 = [
	{ id: 'tanggal', label: 'Tanggal', minWidth: 120, align: 'center' },
	{ id: 'nomor', label: 'Nomor', minWidth: 150, align: 'center' },
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
		size: "medium"
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

function createData(no, jenis_barang, kode, register, kondisi, tingkat, beton, luas_lantai, letak, tanggal, nomor, luas, status, kode_tanah, asal_usul, harga, keterangan) {
	return { no, jenis_barang, kode, register, kondisi, tingkat, beton, luas_lantai, letak, tanggal, nomor, luas, status, kode_tanah, asal_usul, harga, keterangan };
}

const rows = [
	createData(1, 'Bangunan Olah Raga Terbuka Permanen', '1.3.3.01.01.11.001', '0001', 'Baik', 'Tidak', 'Tidak', '400', 'Jl. Dr. Radjiman No. 6  Kota Bandung', '5/17/1996', '234/pd-disdik/1996', '300', 'SHM', 2380, 'APBD', '539064736', '-'),
	createData(2, 'Bangunan Olah Raga Terbuka Permanen', '1.3.3.01.01.11.001', '0001', 'Baik', 'Tidak', 'Beton', '400', 'Jl. Dr. Radjiman No. 6  Kota Bandung', '5/17/1996', '234/pd-disdik/1996', '300', 'SHM', 2380, 'APBD', '539064736', '-'),
	createData(3, 'Bangunan Olah Raga Terbuka Permanen', '1.3.3.01.01.11.001', '0001', 'Baik', 'Tidak', 'Tidak', '400', 'Jl. Dr. Radjiman No. 6  Kota Bandung', '5/17/1996', '234/pd-disdik/1996', '300', 'SHM', 2380, 'APBD', '539064736', '-'),
];

const fields = [];

const labels = [
	"Kode Lokasi",
	"Kode Barang",
	"Nomor Register",
	"Nama Barang",
	"Kondisi Bangunan (B,KB,RB)",
	"Status (SHM, AJB, HGB)",
	"Alamat dan Ordinat",
	"Luas Lantai",
	"Luas",
	"Harga",
	"Nomor Kode Tanah",
	"Asal Usul",
	"Konstruksi Bangunan (Beton/Tidak)",
	"Konstruksi Bangunan (Bertingkat/Tidak)",
	"Dokumen Gedung (Nomor & Tanggal)",
	"Keterangan"
]

for (let i = 0; i < labels.length; i++) {
	fields.push(
		<Grid item xs={i == labels.length - 1 ? 12 : 4}>
			<TextField variant="outlined" label={labels[i]} fullWidth></TextField>
		</Grid>
	)
}
const GedungBangunan = () => {



	// const [page, setPage] = React.useState(0);
	// const [rowsPerPage, setRowsPerPage] = React.useState(5);

	// const handleChangePage = (event, newPage) => {
	// 	setPage(newPage);
	// };

	// const handleChangeRowsPerPage = (event) => {
	// 	setRowsPerPage(parseInt(event.target.value, 10));
	// 	setPage(0);
	// };
	// const emptyRows =
	// 	page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
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
						<b>KIB C (Gedung dan Bangunan)</b></Typography>
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
							{fields}
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
						<Button variant="contained" sx={{ mr: 1, ml: 2, width: 136 }}>
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
					<TextField placeholder="Cari"></TextField>
				</Box>
				<Paper sx={{ width: '100%' }}>
					<TableContainer
						sx={{
							mt: 2
						}}
					>
						<Table aria-label="simple table">
							<TableHead>
								<StyledTableRow
								>
									<StyledTableCell></StyledTableCell>
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
											>
												{column.label}

											</StyledTableCell>

										))}
									</TableRow>
									<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Kondisi Bangunan (R,KB,RB)</Typography></StyledTableCell>
									<TableRow>
										<StyledTableCell sx={{ border: 1 }} align="center" colSpan={2}><Typography sx={{ color: '#E5E5E5' }}>Konstruksi Bangunan</Typography></StyledTableCell>
									</TableRow>
									<TableRow>
										{columns1.map((column) => (
											<StyledTableCell
												key={column.id}
												align={column.align}
												style={{ top: 57, minWidth: column.minWidth }}
											>
												{column.label}

											</StyledTableCell>

										))}
									</TableRow>
									<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Luas Lantai (M2)</Typography></StyledTableCell>
									<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Letal/Lokasi Alamat</Typography></StyledTableCell>
									<TableRow>
										<StyledTableCell sx={{ border: 1 }} align="center" colSpan={2}><Typography sx={{ color: '#E5E5E5' }}>Dokumen Gedung</Typography></StyledTableCell>
									</TableRow>
									<TableRow>
										{columns2.map((column) => (
											<StyledTableCell
												key={column.id}
												align={column.align}
												style={{ top: 57, minWidth: column.minWidth }}
											>
												{column.label}

											</StyledTableCell>

										))}
									</TableRow>
									<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Luas Lantai (M2)</Typography></StyledTableCell>
									<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Status Tanah</Typography></StyledTableCell>
									<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Nomor Kode Tanah</Typography></StyledTableCell>
									<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Asal Usul</Typography></StyledTableCell>
									<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Harga</Typography></StyledTableCell>
									<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Keterangan</Typography></StyledTableCell>
								</StyledTableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<StyledTableRow
										key={row.no}
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
											{row.no}
										</StyledTableCell>
										<StyledTableCell align="center">{row.jenis_barang}</StyledTableCell>
										<TableRow hover role="checkbox" tabIndex={-1} key={row.kode}>
											{columns.map((column) => {
												const value = row[column.id];
												return (
													<StyledTableCell key={column.id} align={column.align} sx={{ py: 6, px: 6 }}>
														{column.format && typeof value === 'number'
															? column.format(value)
															: value}
													</StyledTableCell>
												);
											})}
										</TableRow>
										<StyledTableCell align="center">{row.kondisi}</StyledTableCell>
										<TableRow hover role="checkbox" tabIndex={-1} key={row.tingkat}>
											{columns1.map((column) => {
												const value = row[column.id];
												return (
													<StyledTableCell key={column.id} align={column.align} sx={{ py: 6, px: 6 }}>
														{column.format && typeof value === 'number'
															? column.format(value)
															: value}
													</StyledTableCell>
												);
											})}
										</TableRow>
										<StyledTableCell align="center">{row.luas}</StyledTableCell>
										<StyledTableCell align="center">{row.letak}</StyledTableCell>
										<TableRow hover role="checkbox" tabIndex={-1} key={row.tanggal}>
											{columns2.map((column) => {
												const value = row[column.id];
												return (
													<StyledTableCell key={column.id} align={column.align} sx={{ py: 6, px: 6 }}>
														{column.format && typeof value === 'number'
															? column.format(value)
															: value}
													</StyledTableCell>
												);
											})}
										</TableRow>
										<StyledTableCell align="center">{row.luas_lantai}</StyledTableCell>
										<StyledTableCell align="center">{row.status}</StyledTableCell>
										<StyledTableCell align="center">{row.kode_tanah}</StyledTableCell>
										<StyledTableCell align="center">{row.asal_usul}</StyledTableCell>
										<StyledTableCell align="center">{row.harga}</StyledTableCell>
										<StyledTableCell align="center">{row.keterangan}</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>

			</Box >
		</React.Fragment >
	)
}

export default GedungBangunan;