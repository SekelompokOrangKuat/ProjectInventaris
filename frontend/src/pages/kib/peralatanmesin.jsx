import { Box, Grid, Typography, TextField, Button, TableContainer, TableCell, TableHead, Table, TableRow, styled, TableBody, Paper, tableCellClasses } from "@mui/material";
import { FileText, Edit, Trash2, PlusSquare } from "react-feather";
import { color } from "@mui/system";
import React from "react";


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
		backgroundColor: "#AAC3F3",
		borderColor: "black",
		align: "center",


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

// function createData(no, jenis_barang, register, merk, ukuran, bahan, tahun_pembelian, no_pabrik, no_rangka, no_mesin, no_polisi, no_bpkb, asal_usul, harga, keterangan) {
// 	return { no, jenis_barang, register, merk, ukuran, bahan, tahun_pembelian, no_pabrik, no_rangka, no_mesin, no_polisi, no_bpkb, asal_usul, harga, keterangan };
// }

function createData(no, jenis_barang, register, merk, ukuran, bahan, tahun_pembelian, pabrik, rangka, mesin, polisi, bpkb, asal_usul, harga, keterangan) {
	return {
		no, jenis_barang, register, merk, ukuran, bahan, tahun_pembelian, pabrik, rangka, mesin, polisi, bpkb, asal_usul, harga, keterangan
	}
}
const rows = [
	createData(1, 'Sedan', '0001', 'Toyota Altis', 1800, 'Besi', 2008, 'Toyota', 'BGHF123JJHNH6354', 'MH1GHKHTEEYU234', 'D 1763 E', 'L-050345455', 'APBD', 239000000, ''),
	createData(2, 'Sedan', '0001', 'Toyota Altis', 1800, 'Besi', 2008, 'Toyota', 'BGHF123JJHNH6354', 'MH1GHKHTEEYU234', 'D 1763 E', 'L-050345455', 'APBD', 239000000, ''),
	createData(3, 'Sedan', '0001', 'Toyota Altis', 1800, 'Besi', 2008, 'Toyota', 'BGHF123JJHNH6354', 'MH1GHKHTEEYU234', 'D 1763 E', 'L-050345455', 'APBD', 239000000, ''),
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
			<TextField variant="outlined" label={labels[i]} fullWidth></TextField>
		</Grid>
	)
}
const PeralatanMesin = () => {



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
								<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Register</Typography></StyledTableCell>
								<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Merk/Type</Typography></StyledTableCell>
								<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Ukuran/CC</Typography></StyledTableCell>
								<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Bahan</Typography></StyledTableCell>
								<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Tahun Pembelian</Typography></StyledTableCell>
								<TableRow>
									<StyledTableCell sx={{ border: 1 }} align="center" colSpan={5}><Typography sx={{ color: '#E5E5E5' }}>Nomor</Typography></StyledTableCell>
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

								<StyledTableCell sx={{ border: 1 }} align="center"><Typography sx={{ color: '#E5E5E5' }}>Asal Usul Cara Perolehan</Typography></StyledTableCell>
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
									<StyledTableCell align="center">{row.register}</StyledTableCell>
									<StyledTableCell align="center">{row.merk}</StyledTableCell>
									<StyledTableCell align="center">{row.ukuran}</StyledTableCell>
									<StyledTableCell align="center">{row.bahan}</StyledTableCell>
									<StyledTableCell align="center">{row.tahun_pembelian}</StyledTableCell>
									<TableRow hover role="checkbox" tabIndex={-1} key={row.pabrik}>
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
									<StyledTableCell align="center">{row.asal_usul}</StyledTableCell>
									<StyledTableCell align="center">{row.harga}</StyledTableCell>
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