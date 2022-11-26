import { Box, Grid, Typography, TextField, Button, TableContainer, TableCell, TableHead, Table, TableRow, styled, TableBody, Paper, tableCellClasses } from "@mui/material";
import { FileText, Edit, Trash2, PlusSquare } from "react-feather";
import { color } from "@mui/system";
import React from "react";

const columns = [
	{ id: 'kode', label: 'Kode Barang', minWidth: 90, align: 'center' },
	{ id: 'register', label: 'Register', minWidth: 90, align: 'center' },
	{ id: 'judul_buku', label: 'Judul/Pencipta', minWidth: 90, align: 'center' },
	{ id: 'spesifikasi', label: 'Spesifikasi', minWidth: 90, align: 'center' },
	{ id: 'judul_barang', label: 'Judul/Pencipta', minWidth: 90, align: 'center' },
	{ id: 'pencipta', label: 'Pencipta', minWidth: 90, align: 'center' },
	{ id: 'bahan', label: 'Bahan', minWidth: 90, align: 'center' },
	{ id: 'jenis', label: 'Jenis', minWidth: 90, align: 'center' },
	{ id: 'ukuran', label: 'Ukuran', minWidth: 90, align: 'center' },
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

function createData(no, jenis_barang, kode, register, judul_buku, spesifikasi, judul_barang, pencipta, bahan, jenis, ukuran, jumlah, tahun, asal_usul, harga, keterangan) {
	return { no, jenis_barang, kode, register, judul_buku, spesifikasi, judul_barang, pencipta, bahan, jenis, ukuran, jumlah, tahun, asal_usul, harga, keterangan };
}

const rows = [
	createData(1, 'Agama Islam', '5.2.05.01.01.001', '001', 'Ahmad dahlan', 'Kertas HVS 70 gr', '-', '-', '-', '-', '-', 1, 2021, 'APBD', 23900, ''),
	createData(2, 'Agama Islam', '5.2.05.01.01.001', '001', 'Ahmad dahlan', 'Kertas HVS 70 gr', '-', '-', '-', '-', '-', 1, 2021, 'APBD', 23900, ''),
	createData(3, 'Agama Islam', '5.2.05.01.01.001', '001', 'Ahmad dahlan', 'Kertas HVS 70 gr', '-', '-', '-', '-', '-', 1, 2021, 'APBD', 23900, ''),
];

const fields = [];

const labels = [
	"Kode Lokasi",
	"Kode Barang",
	"Nomor Register",
	"Nama Barang",
	"Buku/Perpustakaan (Spesifikasi)",
	"Buku/Perpustakaan (Judul/Pencipta)",
	"Tahun Cetak/Pembelian",
	"Harga",
	"Jumlah",
	"Barang Bercorak Kesenian (Pencipta)",
	"Barang Bercorak Kesenian (Bahan)",
	"Barang Bercorak Kesenian (Asal Daerah)",
	"Hewan/Ternak/Tumbuhan (Jenis)",
	"Asal Usul Cara Perolehan",
	"Hewan/Ternak/Tumbuhan (Ukuran)",
	"Keterangan"
]

for (let i = 0; i < labels.length; i++) {
	fields.push(
		<Grid item xs={i == labels.length - 1 ? 12 : 4}>
			<TextField variant="outlined" label={labels[i]} fullWidth></TextField>
		</Grid>
	)
}
const AsetTetap = () => {



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
					<b>KIB E (Aset Tetap Lainnya)</b></Typography>
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
							<TableRow>
								<TableRow>
									<StyledTableCell sx={{ border: 1 }} align="center" colSpan={2}><Typography sx={{ color: '#E5E5E5' }}>Nomor</Typography></StyledTableCell>
									<StyledTableCell sx={{ border: 1 }} align="center" colSpan={2}><Typography sx={{ color: '#E5E5E5' }}>Buku/Perpustakaan</Typography></StyledTableCell>
									<StyledTableCell sx={{ border: 1 }} align="center" colSpan={3}><Typography sx={{ color: '#E5E5E5' }}>Barang Bercorak Kesenian/Kebudayaan</Typography></StyledTableCell>
									<StyledTableCell sx={{ border: 1 }} align="center" colSpan={2}><Typography sx={{ color: '#E5E5E5' }}>Hewan/Ternak dan Tumbuhan</Typography></StyledTableCell>
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
							<StyledTableCell sx={{ border: 1 }} align="center" ><Typography sx={{ color: '#E5E5E5' }}>Jumlah</Typography></StyledTableCell>
							<StyledTableCell sx={{ border: 1 }} align="center" ><Typography sx={{ color: '#E5E5E5' }}>Tahun Cetak/Pembelian</Typography></StyledTableCell>
							<StyledTableCell sx={{ border: 1 }} align="center" ><Typography sx={{ color: '#E5E5E5' }}>Asal Usul Cara Perolehan</Typography></StyledTableCell>
							<StyledTableCell sx={{ border: 1 }} align="center" ><Typography sx={{ color: '#E5E5E5' }}>Harga</Typography></StyledTableCell>
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
								<StyledTableRow hover role="checkbox" tabIndex={-1} key={row.register}>
									{columns.map((column) => {
										const value = row[column.id];
										return (
											<StyledTableCell key={column.id} align={column.align} sx={{ px: 6 }}>
												{column.format && typeof value === 'number'
													? column.format(value)
													: value}
											</StyledTableCell>
										);
									})}
								</StyledTableRow>
								<StyledTableCell align="center">{row.jumlah}</StyledTableCell>
								<StyledTableCell align="center">{row.tahun}</StyledTableCell>
								<StyledTableCell align="center">{row.asal_usul}</StyledTableCell>
								<StyledTableCell align="center">{row.harga}</StyledTableCell>
								<StyledTableCell align="center">{row.keterangan}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box >
	)
}
export default AsetTetap;