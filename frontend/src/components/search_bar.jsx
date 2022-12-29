import React from "react";
import { InputAdornment, TextField } from '@mui/material';
import { Search } from "react-feather";

const SearchBar = ({ func }) => {
	return (
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
			onInput={(e) => { setTimeout(() => { func(e.target.value) }, 500) }}
		/>
	)
};

export default SearchBar;