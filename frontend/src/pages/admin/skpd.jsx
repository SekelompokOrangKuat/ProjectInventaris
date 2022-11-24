import React, { useState } from 'react';
import { Avatar, Box, Button, Container, FormControl, Select, MenuItem, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper, styled, Menu, InputLabel, TextField } from '@mui/material';
import { Edit, Trash2, Plus } from 'react-feather';

import LogoDisdik from "../../assets/images/logo-dinas-pendidikan-jabar.png";
import SearchBar from "../../components/search_bar.jsx";

const Form = (props) => {
	return (
		<Box
			id=""
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
                width:'100%'
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
								defaultValue=""
								label="Provinsi"
								labelId="label-provinsi"
								id="select-provinsi"
							>
	                            <MenuItem value={1}>Data</MenuItem>
	                        </Select>
						</FormControl>
                        <FormControl>
                        	<InputLabel id="label-unit">Unit</InputLabel>
	                        <Select
	                        	defaultValue=""
	                            label="Unit"
	                            labelId="label-unit"
	                            id="select-unit"
	                        >
	                            <MenuItem value={30}>Data</MenuItem>
	                        </Select>
                        </FormControl>
						<FormControl>
                        	<InputLabel id="label-satuan-kerja">Satuan Kerja</InputLabel>
							<Select
								defaultValue=""
								label="Satuan Kerja"
								labelId="label-satuan-kerja"
								id="select-satuan-kerja"
							>
	                            <MenuItem value={10}>Data</MenuItem>
	                        </Select>
						</FormControl>
					</Box>
				</Box>
			</form>
		</Box>
	)
}


const UserCard = () => {
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
					display:'flex',
					flexDirection:'row',
					gap:5,
				}}
			>
				<Avatar sx={{width:80, height:80}}></Avatar>
				<Box
					sx={{
						display:'flex',
						flexDirection:'column',
						gap:1
					}}
				>
					<Typography variant="h3">Kepala SKPD</Typography>
					<Box sx={{border:'1px solid #212121'}}></Box>
					<Typography variant="h4" color="themeGrey.darkest">Nama</Typography>
					<Typography variant="h5" color="themeGrey.main">Jajang</Typography>
					<Typography variant="h4" color="themeGrey.darkest">NIP</Typography>
					<Typography variant="h5" color="themeGrey.main">19820511122014111001</Typography>
					<Typography variant="h4" color="themeGrey.darkest">Pangkat/gol/ruang</Typography>
					<Typography variant="h5" color="themeGrey.main">Kepala SKPD</Typography>
					<Box sx={{display:'flex', flexDirection:'column', alignItems:'end'}}>
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
				<DialogContent sx={{p:5}}>
					<DialogTitle sx={{p:0, mb:1}}>Edit</DialogTitle>
					<DialogContentText id="alert-dialog-description">
						<form>
							<Box sx={{display:'flex', flexDirection:'column', gap:1}}>
								<TextField label="Nama" value="Warman"/>
								<TextField label="NIP" value="19820511122014111001"/>
								<TextField label="Pangkat/gol/ruang"  value="Pengurus Barang"/>
							</Box>
						</form>
					</DialogContentText>
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
					p:5,
					gap:5
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
	                    alignItems:'center',
	                    gap:5
					}}
				>
	                <img src={LogoDisdik} height="100%" width={80}/>
	                <Box sx={{width:'100%', gap:1}}>
	                    <Typography variant="h4">SKPD</Typography>
					    <Form/>
	                </Box>
	            </Box>
                <Box
                	sx={{
                		display:'flex',
                		flexDirection:'column',
                		gap:5
                	}}
                >
                	<UserCard/>
                	 <Box
	                	sx={{
	                		display:'flex',
	                		flexDirection:'row',
	                		gap:5
	                	}}
	                >
	                	<UserCard/>
	                	<UserCard/>
                	</Box>
                </Box>
			</Box>
		</Container>
	)
}

export default SKPD;