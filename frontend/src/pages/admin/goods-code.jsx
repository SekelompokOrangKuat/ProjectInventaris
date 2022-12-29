import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Container, CircularProgress, FormControl, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, IconButton, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper, styled, tableSortLabelClasses } from '@mui/material';
import { Edit, Trash2, Plus } from 'react-feather';

import SearchBar from "../../components/search_bar.jsx";
import { deleteGoods, getAllGoods, searchGoods, createGoods } from '../../services/kode-barang.jsx';
import { useRef } from 'react';

const Form = (props) => {
	const [golongan, setGolongan] = useState('');
	const [bidang, setBidang] = useState('');
	const [kelompok, setKelompok] = useState('');
	const [subKelompok, setSubKelompok] = useState('');
	const [subSubKelompok, setSubSubKelompok] = useState('');
	const [nama, setNama] = useState('');
	const handleSubmit = async () => {
		try {
			createGoods(golongan, bidang, kelompok, subKelompok, subSubKelompok, nama).then(() => {
				props.setShowForm(!props.showForm);
				props.setStatus(!props.status);
			});
		}
		catch (err) {
			console.log(err)
		}
	}
	return (
		<Box
			id=""
			sx={{
				display: 'flex',
				flexDirection: 'column',
				p: 5,
				gap: 2
			}}
		>
			<Typography variant="h4">
				{props.title}
			</Typography>
			<FormControl>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
						}}
					>
						<TextField
							fullWidth
							label="Golongan"
							onChange={(e) => { setGolongan(e.target.value) }}
						/>
						<TextField
							fullWidth
							label="Bidang"
							onChange={(e) => { setBidang(e.target.value) }}
						/>
						<TextField
							fullWidth
							label="Kelompok"
							onChange={(e) => { setKelompok(e.target.value) }}
						/>
						<TextField
							fullWidth
							label="Sub Kelompok"
							onChange={(e) => { setSubKelompok(e.target.value) }}
						/>
						<TextField
							fullWidth
							label="Sub Sub Kelompok"
							onChange={(e) => { setSubSubKelompok(e.target.value) }}
						/>
						<TextField
							fullWidth
							label="Nama Barang"
							onChange={(e) => { setNama(e.target.value) }}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							gap: 2,
							justifyContent: 'end'
						}}
					>
						<Button variant="text" color="warning" onClick={() => props.setShowForm(!props.showForm)}>Batal</Button>
						<Button variant="contained" onClick={handleSubmit}>Tambah</Button>
					</Box>
				</Box>
			</FormControl>
		</Box>
	)
}

const GoodsCode = () => {
	const [tableDataUpdateStatus, setTableDataUpdateStatus] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [searchKeywords, setSearchKeywords] = useState("");
	const [goodsData, setGoodsData] = useState(null);

	useEffect(() => {
		getAllGoods().then((response) => {
			if (response.ok) {
				response.json().then((data) => {
					if (data.data !== undefined) {
						setGoodsData(data.data);
					}
				});
			}
		});
	}, [tableDataUpdateStatus]);

	const firstMount = useRef(true);
	useEffect(() => {
		if (!firstMount.current) {
			searchGoods(searchKeywords).then((response) => response.json()).then((data) => {
				if (data.data !== undefined) { setGoodsData(data.data) }
				else { setGoodsData([]) }
			});
		}
		else {
			firstMount.current = false;
		}
	}, [searchKeywords]);

	return (
		<Container
			disableGutters
			maxWidth={false}
			sx={{
				width: '100%',
				height: '100%',
			}}
		>
			{showForm && <Form title="Tambah Barang" setShowForm={setShowForm} showForm={showForm} status={tableDataUpdateStatus} setStatus={setTableDataUpdateStatus} />}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					p: 5,
					gap: 2
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'end'
					}}
				>
					<Typography variant="h4">
						Preview
					</Typography>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							gap: 3
						}}
					>
						{!showForm ? <Button variant="contained" startIcon={<Plus size={20} />} onClick={() => setShowForm(!showForm)}>Tambah Entri</Button> : <React.Fragment></React.Fragment>}
						<SearchBar func={setSearchKeywords}></SearchBar>
					</Box>
				</Box>
				<Box>
					<Tables goodsData={goodsData} setStatus={setTableDataUpdateStatus} status={tableDataUpdateStatus} />
				</Box>
			</Box>
		</Container>
	)
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.themeSecondary.darker,
		color: theme.palette.themeWhite.darkest,
		border: 'solid 1px',
		borderColor: theme.palette.themeGrey.darkest,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
		border: 'solid 1px',
		borderColor: theme.palette.themeGrey.darkest,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.themeTable.dark,
	},
	'&:nth-of-type(even)': {
		backgroundColor: theme.palette.themeTable.light,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
	},
}));

const Tables = ({ goodsData, setStatus, status }) => {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState();
	const handleClickOpen = (data) => {
		setSelected(data);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = (id) => {
		try {
			deleteGoods(id).then(() => {
				handleClose();
				setStatus(!status);
			});
		}
		catch (err) {
			console.log(err)
		}
	}

	return (
		<React.Fragment>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700, border: 'solid 1px', borderColor: 'themeGrey.darkest', }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell width="132px"></StyledTableCell>
							<StyledTableCell align="center">Golongan</StyledTableCell>
							<StyledTableCell align="center">Bidang</StyledTableCell>
							<StyledTableCell align="center">Kelompok</StyledTableCell>
							<StyledTableCell align="center">Sub Kelompok</StyledTableCell>
							<StyledTableCell align="center">Sub-Sub Kelompok</StyledTableCell>
							<StyledTableCell align="center">Nama Barang</StyledTableCell>
						</TableRow>
					</TableHead>
					{goodsData !== null ?
						goodsData.length > 0 ?
							<TableBody>
								{goodsData.map((row, index) => (
									<StyledTableRow key={index}>
										<StyledTableCell align="center" width="132px">
											<IconButton onClick={() => alert(row.Nama)}><Edit size={20} color="#0F2C64" /></IconButton>
											<IconButton onClick={() => handleClickOpen(row._id.$oid)}><Trash2 size={20} color="#D32F2F" /></IconButton>
										</StyledTableCell>
										<StyledTableCell>{row.golongan}</StyledTableCell>
										<StyledTableCell>{row.bidang}</StyledTableCell>
										<StyledTableCell>{row.kelompok}</StyledTableCell>
										<StyledTableCell>{row.sub_kelompok}</StyledTableCell>
										<StyledTableCell>{row.sub_sub_kelompok}</StyledTableCell>
										<StyledTableCell align="center">{row.nama_barang}</StyledTableCell>
									</StyledTableRow>
								))
								}
							</TableBody> :
							<TableBody>
								<StyledTableRow>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell>
										Tidak Ada Data
									</TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
								</StyledTableRow>
							</TableBody>
						:
						<TableBody>
							<StyledTableRow>
								<TableCell></TableCell>
								<TableCell></TableCell>
								<TableCell></TableCell>
								<TableCell></TableCell>
								<TableCell>
									<CircularProgress />
								</TableCell>
								<TableCell></TableCell>
								<TableCell></TableCell>
							</StyledTableRow>
						</TableBody>
					}
				</Table>
			</TableContainer>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Apakah Anda yakin ingin menghapus barang ini?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={handleClose}>Batal</Button>
					<Button variant="text" color="warning" onClick={() => handleDelete(selected)} autoFocus>
						Hapus
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}

export default GoodsCode;