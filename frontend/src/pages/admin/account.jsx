import React from 'react';
import { Box, Button, Container, IconButton } from '@mui/material';
import { Edit, Trash2, Plus, RefreshCcw } from 'react-feather';

import CustomizedTables from "../../components/table.jsx";
import SearchBar from "../../components/search_bar.jsx";

const Account = () => {
	function createData(Nama, NIP, Email, Telepon) {
	  return { Nama, NIP, Email, Telepon };
	}

	const rows = [
	  createData('Jajang', 19820511122014111001, "-", "081234567890", "222"),
	  createData('Jajang', 19820511122014111001, "-", "081234567890", "222"),
	  createData('Jajang', 19820511122014111001, "-", "081234567890", "222"),
	  createData('Jajang', 19820511122014111001, "-", "081234567890", "222"),
	  createData('Jajang', 19820511122014111001, "-", "081234567890", "222"),
	  createData('Jasng', 19820511122014111001, "-", "081234567890", "222")
	];

	var dataTable = 
	{
		actions:[
			<IconButton><Edit size={20}/></IconButton>,
          	<IconButton><Trash2 size={20}/></IconButton>,
          	<IconButton><RefreshCcw size={20}/></IconButton>
		],
		rows: rows
	}

	return (
		<Container
            disableGutters
            maxWidth={false}
            sx={{
                width: '100%',
                height: '100%',
            }}
        >
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
                	<Box>
                		Preview
                	</Box>
                	<Box
                		sx={{
		                    display: 'flex',
		                    flexDirection: 'row',
		                    gap:3
		                }}
                	>
                		<Button variant="contained" startIcon={<Plus size={20}/>}>Tambah Entri</Button>
                		<SearchBar></SearchBar>
                	</Box>
                </Box>
                <Box>
                	<CustomizedTables data={dataTable}/>
                </Box>
            </Box>
        </Container>
	)
};

export default Account;