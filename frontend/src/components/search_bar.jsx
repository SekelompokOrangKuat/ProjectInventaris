import React from "react";
import { InputAdornment, TextField} from '@mui/material';
import { Search } from "react-feather";

const SearchBar = () => {
	return(
		<TextField variant="outlined"
			label="Cari"
			type="search"
			InputProps={{
	          startAdornment: (
	            <InputAdornment position="start">
	              <Search />
	            </InputAdornment>
	          ),
	        }}
		/>
	)
};

export default SearchBar;