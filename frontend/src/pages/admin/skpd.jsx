import React, { useState } from 'react';
import { Avatar, Box, Button, Container, FormControl, Select, MenuItem, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper, styled, Menu, InputLabel, TextField } from '@mui/material';
import { Edit, Trash2, Plus } from 'react-feather';

import LogoDisdik from "../../assets/images/logo-dinas-pendidikan-jabar.png";
import SearchBar from "../../components/search_bar.jsx";
import { useEffect } from 'react';

const Form = (props) => {
	const [unit, setUnit] = useState('');
	const [provinsi, setProvinsi] = useState('');
	const [satuanKerja, setSatuanKerja] = useState('');
	const [employees, setEmployee] = useState([]);
	useEffect(() => {
		async function fetchData() {
			try {
				let response = await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/admin/skpd/findBy",
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
							provinsi: provinsi,
							unit: unit,
							satuan_kerja: satuanKerja
						})
					});

				let resJson = await response.json();
				setEmployee(resJson);
			}
			catch (err) {
				console.log(err)
			}
		}
		fetchData();
	}, [unit, provinsi, satuanKerja]);
	
	return (
		<Box
			id=""
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				width: '100%'
			}}
		>
			<Typography variant="h4">
				{props.title}
			</Typography>
			<form>
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
							gap: 1,
						}}
					>
						<FormControl>
							<InputLabel id="label-provinsi">Provinsi</InputLabel>
							<Select
								defaultValue="Jawa Barat"
								label="Provinsi"
								labelId="label-provinsi"
								id="select-provinsi"
								onChange={(e) => setProvinsi(e.target.value)}
							>
								<MenuItem value="">-</MenuItem>
								<MenuItem value="Jawa Barat">Jawa Barat</MenuItem>
							</Select>
						</FormControl>
						<FormControl>
							<InputLabel id="label-unit">Unit</InputLabel>
							<Select
								defaultValue="Dinas Pendidikan"
								label="Unit"
								labelId="label-unit"
								id="select-unit"
								onChange={(e) => setUnit(e.target.value)}
							>
								<MenuItem value="">-</MenuItem>
								<MenuItem value="Dinas Pendidikan">Dinas Pendidikan</MenuItem>
							</Select>
						</FormControl>
						<FormControl>
							<InputLabel id="label-satuan-kerja">Satuan Kerja</InputLabel>
							<Select
								defaultValue="Sekretariat"
								label="Satuan Kerja"
								labelId="label-satuan-kerja"
								id="select-satuan-kerja"
								onChange={(e) => setSatuanKerja(e.target.value)}
							>
								<MenuItem value="">-</MenuItem>
								<MenuItem value="Sekretariat">Sekretariat</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</Box>
			</form>
		</Box>
	)
}


const UserCard = (props) => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<React.Fragment>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					gap: 5,
				}}
			>
				<Avatar sx={{ width: 80, height: 80 }}></Avatar>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 1
					}}
				>
					<Typography variant="h3">{props.jabatan}</Typography>
					<Box sx={{ border: '1px solid #212121' }}></Box>
					<Typography variant="h4" color="themeGrey.darkest">Nama</Typography>
					<Typography variant="h5" color="themeGrey.main">{props.nama}</Typography>
					<Typography variant="h4" color="themeGrey.darkest">NIP</Typography>
					<Typography variant="h5" color="themeGrey.main">{props.nip}</Typography>
					<Typography variant="h4" color="themeGrey.darkest">Pangkat/gol/ruang</Typography>
					<Typography variant="h5" color="themeGrey.main">{props.pangkat}</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
						<Button variant="outlined" onClick={handleClickOpen}>Edit</Button>
					</Box>
				</Box>
			</Box>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogContent sx={{ p: 5 }}>
					<DialogTitle sx={{ p: 0, mb: 1 }}>Edit</DialogTitle>
					<form>
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
							<TextField label="Nama" value="" />
							<TextField label="NIP" value="" />
							<TextField label="Pangkat/gol/ruang" value="" />
							<TextField label="Provinsi" value="" />
							<TextField label="Unit" value="" />
							<TextField label="Satuan Kerja" value="" />
						</Box>
					</form>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" color="warning" onClick={handleClose}>Batal</Button>
					<Button variant="contained" onClick={handleClose} autoFocus>
						Simpan
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	)
}


const SKPD = () => {

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
					gap: 5
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						gap: 5
					}}
				>
					<img src={LogoDisdik} height="100%" width={80} />
					<Box sx={{ width: '100%', gap: 1 }}>
						<Typography variant="h4">SKPD</Typography>
						<Form />
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 5
					}}
				>
					<UserCard jabatan="Kepala SKPD" nama="Ir. H. Yessa Sarwedi Hamiseno, M.Pd" nip="196512242009011001" pangkat="Kepala SKPD"/>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							gap: 5
						}}
					>
						<UserCard jabatan="Pengurus Barang" nama="Jajang Munawar, S.ST" nip="198409072002121001" pangkat="Pengurus barang"/>
						<UserCard jabatan="Penganggung Jawab Ruangan" nama="Yana Suryana" nip="197501122009011001" pangkat="Penggung Jawab Ruangan"/>
					</Box>
				</Box>
			</Box>
		</Container>
	)
}

export default SKPD;