import React, { useState } from 'react';
import { Box, Button, Container, CircularProgress, FormControl, InputLabel, TextField, Typography, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, IconButton, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper, styled, Select } from '@mui/material';
import { Edit, Trash2, Plus, RefreshCcw } from 'react-feather';

import { createAccount, deleteAccount, getAllAccounts } from '../../services/account.jsx';
import SearchBar from "../../components/search_bar.jsx";

const Form = (props) => {
	const [nama, setNama] = useState("");
	const [email, setEmail] = useState("");
	const [nip, setNip] = useState("");
	const [telepon, setTelepon] = useState("");
	const [role, setRole] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		try {
			createAccount(email, password, password, role, nama, nip, telepon).then(() => {
				props.setStatus(!props.status);
				props.setShowForm(!props.showForm);
			})
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
								label="Nama"
								onChange={(e) => { setNama(e.target.value) }}
							/>
							<TextField
								fullWidth
								label="NIP"
								onChange={(e) => { setNip(e.target.value) }}
							/>
							<TextField
								fullWidth
								label="Email"
								onChange={(e) => { setEmail(e.target.value) }}
							/>
							<TextField
								fullWidth
								label="Nomor Telepon"
								onChange={(e) => { setTelepon(e.target.value) }}
							/>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Role</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									label="Role"
									onChange={(e) => { setRole(e.target.value) }}
								>
									<MenuItem value="Admin">Admin</MenuItem>
									<MenuItem value="Pengelola">Pengelola</MenuItem>
									<MenuItem value="Pengguna">Pengguna</MenuItem>
								</Select>
							</FormControl>
							<TextField
								fullWidth
								type="password"
								label="Password"
								onChange={(e) => { setPassword(e.target.value) }}
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

const Account = () => {
	const [tableDataUpdateStatus, setTableDataUpdateStatus] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [accountData, setAccountData] = useState(null);

	useState(() => {
		getAllAccounts().then((response) => {
			if (response.ok) {
				response.json().then((data) => {
					if (data.data !== undefined) {
						setAccountData(data.data);
					}
				});
			}
		});
	}, [tableDataUpdateStatus]);
	return (
		<Container
			disableGutters
			maxWidth={false}
			sx={{
				width: '100%',
				height: '100%',
			}}
		>
			{showForm && <Form title="Tambah Akun" setShowForm={setShowForm} showForm={showForm} setStatus={setTableDataUpdateStatus} status={tableDataUpdateStatus} />}
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
					<Tables accountData={accountData} setStatus={setTableDataUpdateStatus} status={tableDataUpdateStatus} />
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

const Tables = ({ accountData, setStatus, status }) => {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState();
	const handleClickOpen = (data) => {
		setSelected(data);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = async (email) => {
		try {
			deleteAccount(email).then(() => {
				setStatus(!status);
				handleClose();
			})
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
							<StyledTableCell align="center">Nama</StyledTableCell>
							<StyledTableCell align="center">NIP</StyledTableCell>
							<StyledTableCell align="center">Email</StyledTableCell>
							<StyledTableCell align="center">Nomor Telepopn</StyledTableCell>
						</TableRow>
					</TableHead>
					{accountData !== null ?
						accountData.length > 0 ?
							<TableBody>
								{accountData.map((data, index) => (
									<StyledTableRow key={index}>
										<StyledTableCell align="center" width="132px">
											<IconButton onClick={() => alert(data.nama)}><Edit size={20} color="#0F2C64" /></IconButton>
											<IconButton onClick={() => handleClickOpen(data.email)}><Trash2 size={20} color="#D32F2F" /></IconButton>
											<IconButton onClick={() => alert(data.nama)}><RefreshCcw size={20} color="#317011" /></IconButton>
										</StyledTableCell>
										<StyledTableCell>{data.nama}</StyledTableCell>
										<StyledTableCell>{data.nip}</StyledTableCell>
										<StyledTableCell>{data.email}</StyledTableCell>
										<StyledTableCell>{data.telepon}</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody> :
							<TableBody>
								<StyledTableRow>
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
								<TableCell align="right">
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
						Apakah Anda yakin ingin menghapus akun ini?
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

export default Account;