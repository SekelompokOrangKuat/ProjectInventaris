import { Box, Grid, Typography, TextField, Button, TableContainer, TableCell, TableHead, Table, TableRow, styled, TableBody, Paper, tableCellClasses } from "@mui/material";
import { FileText, Edit, Trash2, PlusSquare } from "react-feather";
import { color } from "@mui/system";
import axios from "axios";
import React from "react";

const columns = [

	{ id: 'kode', label: 'Kode Barang', minWidth: 90, align: 'center' },
	{ id: 'register', label: 'Register', minWidth: 90, align: 'center' },

];

const columns2 = [
	{ id: 'hak', label: 'Hak', minWidth: 130, align: 'center' },
	{ id: 'sertifikat', label: 'Sertifikat', minWidth: 130, align: 'center' },
]

const columns3 = [

	{ id: 'tanggal', label: 'Tanggal', minWidth: 130, align: 'center' },
	{ id: 'nomor', label: 'Nomor', minWidth: 130, align: 'center' }
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
		backgroundColor: "#AAC3F3",
		borderColor: "black",
		align: "center"


	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
		align: "center"
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

function createData(no, jenis_barang, kode, register, luas, tahun_pengadaan, alamat, hak, tanggal, nomor, penggunaan, asal_usul, harga, keterangan) {
	return { no, jenis_barang, kode, register, luas, tahun_pengadaan, alamat, hak, tanggal, nomor, penggunaan, asal_usul, harga, keterangan };
}


const rows = [
	createData(1, 'Tanah Bangunan Kantor Pemerintah', '1.7.1.01.01.04.002', '0001', 27600, '1978', 'Jl. Dr. Radjiman No. 6 Kota Bandung', 'SHM', '5 /17 /1978', 2380, 'Perkantoran', 'APBD', 239000000, ''),
	createData(2, 'Tanah Bangunan Kantor Pemerintah', '2.4.1.01.01.04.003', '0001', 27600, '1978', 'Jl. Dr. Radjiman No. 6 Kota Bandung', 'SHM', '5 /17 /1978', 2380, 'Perkantoran', 'APBD', 239000000, ''),
	createData(3, 'Tanah Bangunan Kantor Pemerintah', '4.2.1.01.01.04.001', '0001', 27600, '1978', 'Jl. Dr. Radjiman No. 6 Kota Bandung', 'SHM', '5 /17 /1978', 2380, 'Perkantoran', 'APBD', 239000000, ''),
];

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
const Tanah = () => {



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
						<b>KIB A (Tanah)</b></Typography>
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
											<StyledTableCell></StyledTableCell>

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
							{rows.map((row) => (
								<StyledTableRow
									key={row.no}
									sx={{ '&:last-child td, &:last-child th': { border: 0, width: '100%' } }}
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
												<StyledTableCell key={column.id} align={column.align}>
													{column.format && typeof value === 'number'
														? column.format(value)
														: value}
												</StyledTableCell>
											);
										})}
									</TableRow>
									{/* <StyledTableCell>
										<StyledTableCell align="center" sx={{ border: 0 }}>{row.kode_barang}</StyledTableCell>

										<StyledTableCell align="center" sx={{ border: 0 }}>{row.register}</StyledTableCell>
									</StyledTableCell> */}
									<StyledTableCell align="center">{row.luas}</StyledTableCell>
									<StyledTableCell align="center">{row.tahun_pengadaan}</StyledTableCell>
									<StyledTableCell align="center">{row.alamat}</StyledTableCell>
									<TableRow hover role="checkbox" tabIndex={-1} key={row.kode}>
										<StyledTableCell align="center" sx={{ border: 0 }}>{row.hak}</StyledTableCell>
										{columns3.map((column) => {
											const value = row[column.id];
											return (
												<StyledTableCell key={column.id} align={column.align}>
													{column.format && typeof value === 'number'
														? column.format(value)
														: value}
												</StyledTableCell>
											);
										})}
									</TableRow>
									<StyledTableCell >{row.penggunaan}</StyledTableCell>
									<StyledTableCell >{row.asal_usul}</StyledTableCell>
									<StyledTableCell >{row.harga}</StyledTableCell>
									<StyledTableCell >{row.keterangan}</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box >
		</React.Fragment>
	)
}

export default Tanah;