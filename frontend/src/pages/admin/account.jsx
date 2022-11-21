import React, { useState } from 'react';
import { Box, Button, Container, FormControl, TextField, Typography } from '@mui/material';
import { Plus } from 'react-feather';
import CustomizedTables from "../../components/table.jsx";
import SearchBar from "../../components/search_bar.jsx";

const Form = (props) => {
	return(
    	<Box
    		id=""
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p:5,
                gap:2
            }}
        >
        	<Typography variant="h4">
        		{props.title}
        	</Typography>
			<FormControl>
                <Box 
                	sx={{
                		display:'flex',
                		flexDirection:'column',
                		gap:2,
                	}}
				>
					<Box 
	                	sx={{
	                		display:'flex',
	                		flexDirection:'column',
	                		gap:2,
	                	}}
					>
                		<TextField 
	                		fullWidth
	                		label="Nama"
	                	/>
	                	<TextField 
	                		fullWidth
	                		label="NIP"
	                	/>
	                	<TextField 
	                		fullWidth
	                		label="Email"
	                	/>
	                	<TextField 
	                		fullWidth
	                		label="Nomor Telepon"
                		/>
                	</Box>
                	<Box 
	                	sx={{
	                		display:'flex',
	                		flexDirection:'row',
	                		gap:2,
	                		justifyContent:'end'
	                	}}
					>
					<Button variant="text" color="warning" onClick={()=>props.setShowForm(!props.showForm)}>Batal</Button>
					<Button variant="contained">Tambah</Button>
					</Box>
            	</Box>
    		</FormControl>
        </Box>
	)
}

const Account = () => {

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
        	{ showForm && <Form title="Tambah Akun" setShowForm={setShowForm} showForm={showForm}/> }
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p:5,
                    gap:2
                }}
            >
                <Box
                	sx={{
	                    display: 'flex',
	                    flexDirection: 'row',
	                    justifyContent:'space-between',
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
		                    gap:3
		                }}
                	>
                		{!showForm ? <Button variant="contained" startIcon={<Plus size={20}/>} onClick={()=>setShowForm(!showForm)}>Tambah Entri</Button> : <React.Fragment></React.Fragment>}
                		<SearchBar></SearchBar>
                	</Box>
                </Box>
                <Box>
                	<CustomizedTables/>
                </Box>
            </Box>
        </Container>
	)
}

export default Account;