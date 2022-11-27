import React, { useState } from 'react';
import { Box, Button, Container, FormControl, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, IconButton, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper, styled } from '@mui/material';
import { Edit, Trash2, Plus } from 'react-feather';

import SearchBar from "../../components/search_bar.jsx";
import { useGetAllRoom } from '../../services/room.jsx';

const Form = (props) => {
	const [bidang, setBidang] = useState('');
	const [kelompok, setKelompok] = useState('');
	const [namaRuangan, setNamaRuangan] = useState('');
	const handleSubmit = async (e) => {
		try {
			let response = await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/ruangan/ruangans/create",
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
						nama_ruangan: namaRuangan,
						bidang_ruangan: bidang,
						kelompok_ruangan: kelompok
					})
				});

			let resJson = await response.json();
			props.setShowForm(!props.showForm);
			window.location.reload();
		}
		catch (err) {
			console.log(err)
		}

	}

	return (
		<form onSubmit={handleSubmit}>
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
								onChange={(e) => { setBidang(e.target.value) }}
							/>
							<TextField
								fullWidth
								label="Kelompok"
								onChange={(e) => { setKelompok(e.target.value) }}
							/>
							<TextField
								fullWidth
								label="Nama Ruangan"
								onChange={(e) => { setNamaRuangan(e.target.value) }}
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
		</form>
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
					<Tables />
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
	var roomData = useGetAllRoom();
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState();
	const handleClickOpen = (data) => {
		setSelected(data);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = async (id) =>{
		try {
			let response = await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/ruangan/ruangans/delete",
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
						_id: id
					})
				});

			let resJson = await response.json();
			handleClose();
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
							<StyledTableCell></StyledTableCell>
							<StyledTableCell align="center">Bidang</StyledTableCell>
							<StyledTableCell align="center">Kelompok</StyledTableCell>
							<StyledTableCell align="center">Nama Ruangan</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{roomData.map((data) => 
						{
						return (
							<StyledTableRow key={data._id.$oid}>
								<StyledTableCell align="center" width="132px">
									<IconButton onClick={() => alert()}><Edit size={20} color="#0F2C64" /></IconButton>
									<IconButton onClick={() => handleClickOpen(data)}><Trash2 size={20} color="#D32F2F" /></IconButton>
								</StyledTableCell>
								<StyledTableCell>{data.bidang_ruangan}</StyledTableCell>
								<StyledTableCell>{data.kelompok_ruangan}</StyledTableCell>
								<StyledTableCell>{data.nama_ruangan}</StyledTableCell>
							</StyledTableRow>
						)})}
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
						Apakah Anda yakin ingin menghapus ruangan ini?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={handleClose}>Batal</Button>
					<Button variant="text" color="warning" onClick={()=>handleDelete(selected._id.$oid)} autoFocus>
						Hapus
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}

export default RoomCode;