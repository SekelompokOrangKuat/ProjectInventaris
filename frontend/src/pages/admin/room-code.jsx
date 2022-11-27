import React, { useState } from 'react';
import { Box, Button, Container, FormControl, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, IconButton, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper, styled } from '@mui/material';
import { Edit, Trash2, Plus } from 'react-feather';

import SearchBar from "../../components/search_bar.jsx";

const Form = (props) => {
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
							label="Bidang"
						/>
						<TextField
							fullWidth
							label="Kelompok"
						/>
						<TextField
							fullWidth
							label="Nama Ruangan"
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
						<Button variant="contained">Tambah</Button>
					</Box>
				</Box>
			</FormControl>
		</Box>
	)
}

const RoomCode = () => {

	const [showForm, setShowForm] = useState(false);

	return (
		<Container
			disableGutters
			maxWidth={false}
			sx={{
				width: '100%',
				height: '100%',
			}}
		>
			{showForm && <Form title="Tambah Ruangan" setShowForm={setShowForm} showForm={showForm} />}
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
						<SearchBar></SearchBar>
					</Box>
				</Box>
				<Box>
					<Tables/>
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

const Tables = () => {
	function createData(bidang, kelompok, nama_ruangan) {
		return { bidang, kelompok, nama_ruangan };
	}

	const rows = [
		createData('02', '01', "Kepala Bidang GTK"),
		createData('02', '01', "Kepala Bidang GTK"),
		createData('02', '01', "Kepala Bidang GTK"),
		createData('02', '01', "Kepala Bidang GTK"),
	];

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700, border: 'solid 1px', borderColor: 'themeGrey.darkest', }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell></StyledTableCell>
							<StyledTableCell align="center">Bidang</StyledTableCell>
							<StyledTableCell align="center">Kelompok</StyledTableCell>
							<StyledTableCell align="center">Nama Ruangan</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row, index) => (
							<StyledTableRow key={index}>
								<StyledTableCell align="center" width="132px">
									<IconButton onClick={() => alert(row.Nama)}><Edit size={20} color="#0F2C64" /></IconButton>
									<IconButton onClick={handleClickOpen}><Trash2 size={20} color="#D32F2F" /></IconButton>
								</StyledTableCell>
								<StyledTableCell>{row.bidang}</StyledTableCell>
								<StyledTableCell>{row.kelompok}</StyledTableCell>
								<StyledTableCell>{row.nama_ruangan}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
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
						Apakah Anda yakin ingin menghapus akun ini?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={handleClose}>Batal</Button>
					<Button variant="text" color="warning" onClick={handleClose} autoFocus>
						Hapus
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}

export default RoomCode;