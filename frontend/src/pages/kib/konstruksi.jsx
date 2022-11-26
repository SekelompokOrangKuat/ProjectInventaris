import { Box, Grid, Typography, TextField, Button, TableContainer, TableCell, TableHead, Table, TableRow, styled, TableBody, Paper, tableCellClasses } from "@mui/material";
import { FileText, Edit, Trash2, PlusSquare } from "react-feather";
import { color } from "@mui/system";
import React from "react";

const columns = [
	{ id: 'tingkat', label: 'Bertingkat/Tidak', minWidth: 90, align: 'center' },
	{ id: 'beton', label: 'Beton/Tidak', minWidth: 90, align: 'center' },
];

const columns1 = [
	{ id: 'tanggal', label: 'Tanggal', minWidth: 90, align: 'center' },
	{ id: 'nomor', label: 'Nomor', minWidth: 90, align: 'center' },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "#0236A4",
		color: theme.palette.common.white

	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
		backgroundColor: "#AAC3F3"


	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
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

function createData(no, jenis_barang, bangunan, tingkat, beton, luas, letak, tanggal, nomor, waktu_mulai, status, kode_tanah, asal_usul, nilai_kontrak, keterangan) {
	return { no, jenis_barang, bangunan, tingkat, beton, luas, letak, tanggal, nomor, waktu_mulai, status, kode_tanah, asal_usul, nilai_kontrak, keterangan };
}

const rows = [
	createData(1, 'Gedung Kesenian', '', 'Tidak', 'Tidak', 1000, 'Jl. Dr. Radjiman No. 6 Kota Bandung', '17/05/1996', '234/pd-disdik/1996', '12/04/1996', 'SHM', 3342, 'APBD', '190.884.500', ''),
	createData(2, 'Gedung Kesenian', '', 'Tidak', 'Tidak', 1000, 'Jl. Dr. Radjiman No. 6 Kota Bandung', '17/05/1996', '234/pd-disdik/1996', '12/04/1996', 'SHM', 3342, 'APBD', '190.884.500', ''),
	createData(3, 'Gedung Kesenian', '', 'Tidak', 'Tidak', 1000, 'Jl. Dr. Radjiman No. 6 Kota Bandung', '17/05/1996', '234/pd-disdik/1996', '12/04/1996', 'SHM', 3342, 'APBD', '190.884.500', ''),
];

const fields = [];

const labels = [
	"Kode Lokasi",
	"Kode Barang",
	"Nomor Register",
	"Nama Barang",
	"Bangunan (P,SP,D)",
	"Waktu Mulai (DD/MM/YYYY)",
	"Alamat dan Ordinat",
	"Dokumen (Nomor)",
	"Dokumen (Tanggal)",
	"Status (SHM, AJB, HGB)",
	"Nomor Kode Tanah",
	"Asal Usul",
	"Konstruksi Bangunan (Bertingkat/Tidak)",
	"Luas (M2)",
	"Konstruksi Bangunan (Beton/Tidak)",
	"Nilai Kontrak",
	"Keterangan"
]

for (let i = 0; i < labels.length; i++) {
	fields.push(
		<Grid item xs={i == labels.length - 1 ? 8 : 4}>
			<TextField variant="outlined" label={labels[i]} fullWidth></TextField>
		</Grid>
	)
}
const Konstruksi = () => {



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
					<b>KIB F (Konstruksi dalam Pengerjaan)</b></Typography>
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

			</Paper>
			<TableContainer
				sx={{
					mt: 2, maxHeight: 440
				}}
			>
				<Table aria-label="simple table">
					<TableHead>
						<StyledTableRow
						>
							<StyledTableCell></StyledTableCell>
							<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>No</Typography></StyledTableCell>
							<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Jenis / Nama Barang</Typography></StyledTableCell>
							<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Bangunan (P,SP,D)</Typography></StyledTableCell>
							<TableRow>
								<TableRow>
									<StyledTableCell sx={{ border: 1 }} align="center" colSpan={2}><Typography sx={{ color: '#E5E5E5' }}>Konstruksi Bangunan</Typography></StyledTableCell>
								</TableRow>
								<TableRow>
									{columns.map((column) => (
										<StyledTableCell
											key={column.id}
											align={column.align}
											style={{ top: 100, minWidth: column.minWidth }}
										>
											{column.label}
										</StyledTableCell>
									))}
								</TableRow>
							</TableRow>
							<StyledTableCell sx={{ border: 1 }} align="center" ><Typography sx={{ color: '#E5E5E5' }}>Luas (M2)</Typography></StyledTableCell>
							<StyledTableCell sx={{ border: 1 }} align="center" ><Typography sx={{ color: '#E5E5E5' }}>Letak/Lokasi Alamat</Typography></StyledTableCell>
							<TableRow>
								<TableRow>
									<StyledTableCell sx={{ border: 1 }} align="center" colSpan={2}><Typography sx={{ color: '#E5E5E5' }}>Dokumen</Typography></StyledTableCell>
								</TableRow>
								<TableRow>
									{columns1.map((column) => (
										<StyledTableCell
											key={column.id}
											align={column.align}
											style={{ top: 100, minWidth: column.minWidth }}
										>
											{column.label}
										</StyledTableCell>
									))}
								</TableRow>
							</TableRow>
							<StyledTableCell sx={{ border: 1 }} align="center" ><Typography sx={{ color: '#E5E5E5' }}>Waktu Mulai (DD/MM/YYYY)</Typography></StyledTableCell>
							<StyledTableCell sx={{ border: 1 }} align="center" ><Typography sx={{ color: '#E5E5E5' }}>Status Tanah</Typography></StyledTableCell>
							<StyledTableCell sx={{ border: 1 }} align="center" ><Typography sx={{ color: '#E5E5E5' }}>Nomor Kode Tanah</Typography></StyledTableCell>
							<StyledTableCell sx={{ border: 1 }} align="center" ><Typography sx={{ color: '#E5E5E5' }}>Asal Usul Pembiayaan</Typography></StyledTableCell>
							<StyledTableCell sx={{ border: 1 }} align="center" ><Typography sx={{ color: '#E5E5E5' }}>Nilai Kontrak (Rp)</Typography></StyledTableCell>
							<StyledTableCell sx={{ border: 1 }} align="center" ><Typography sx={{ color: '#E5E5E5' }}>Keterangan</Typography></StyledTableCell>
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
										<Box sx={{ p: 1.5 }}>

											<Edit size={20} color="#0F2C64" />


										</Box>
										<Box sx={{ p: 1.5 }}>
											<Trash2 size={20} color="#D32F2F" />
										</Box>
									</Box>
								</StyledTableCell>
								<StyledTableCell align="center" component="th" scope="row">
									{row.no}
								</StyledTableCell>
								<StyledTableCell align="center">{row.jenis_barang}</StyledTableCell>
								<StyledTableCell align="center">{row.bangunan}</StyledTableCell>
								<StyledTableRow hover role="checkbox" tabIndex={-1} key={row.tingkat}>
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
								</StyledTableRow>
								<StyledTableCell align="center">{row.luas}</StyledTableCell>
								<StyledTableCell align="center">{row.letak}</StyledTableCell>
								<StyledTableRow hover role="checkbox" tabIndex={-1} key={row.tanggal}>
									{columns1.map((column) => {
										const value = row[column.id];
										return (
											<StyledTableCell key={column.id} align={column.align}>
												{column.format && typeof value === 'number'
													? column.format(value)
													: value}
											</StyledTableCell>
										);
									})}
								</StyledTableRow>
								<StyledTableCell align="center">{row.waktu_mulai}</StyledTableCell>
								<StyledTableCell align="center">{row.status}</StyledTableCell>
								<StyledTableCell align="center">{row.kode_tanah}</StyledTableCell>
								<StyledTableCell align="center">{row.asal_usul}</StyledTableCell>
								<StyledTableCell align="center">{row.nilai_kontrak}</StyledTableCell>
								<StyledTableCell align="center">{row.keterangan}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box >
	)
}
export default Konstruksi;