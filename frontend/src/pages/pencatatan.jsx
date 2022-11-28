/**
 * 
 * Dashboard page (content)
 * 
 * 
 */

import { Box, Button, Container, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { Calendar, FileText, Tool, Trash2, PlusSquare, Trello, Repeat, Copy, Package } from "react-feather";

const Pencatatan = () => {

	let infographicsDatas = [
		{ icon: <Trello size={50} />, title: 'Kartu Inventaris Ruangan' },
		{ icon: <Repeat size={50} />, title: 'Mutasi Barang' },
		{ icon: <Copy size={50} />, title: 'Peminjaman' }
	]

	let infographicsData = [
		{ title: 'KIB A' },
		{ title: 'KIB B' },
		{ title: 'KIB C' },
		{ title: 'KIB D' },
		{ title: 'KIB E' },
		{ title: 'KIB F' },
	]

	const sopDatas = [
		{ icon: <FileText size={50} />, title: 'SOP Pengelolaan Barang Milik Daerah', url: '/pdf/mutasi' },
		{ icon: <FileText size={50} />, title: 'SOP Mutasi', url: '/pdf/pengelolaan' }
	]

	const [contentHeight, setContentHeight] = useState(0);
	const [anotherContentHeight, setAnotherContentHeight] = useState(0);
	const ref = useRef(null);
	const anotherRef = useRef(null);

	useEffect(() => {
		setContentHeight(ref.current.clientHeight - 80);
		setAnotherContentHeight(anotherRef.current.clientHeight);
	}, []);

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
					flexDirection: 'row',
					pr: 5
				}}
			>
				{/* Information Section */}
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						pl: 5,
						// py: 3,
						width: '100%',
						gap: 3,
					}}
					ref={ref}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							background: 'linear-gradient(to right, #009B4C, #007037)',
							gap: 3,
							p: 3,
							alignItems: 'center',
							color: 'themeWhite.lightest',
							borderRadius: '5px'
						}}
					>
						<Package size={50}></Package>
						<Typography variant="h2">Kartu Inventaris Barang</Typography>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								gap: 3,
								color: 'themeWhite.lightest'
							}}
							ref={anotherRef}
						>
							{infographicsData.map((data, index) =>
								<Box
									key={index + "-" + data.title}
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										py: 3,
										px: 5,
										gap: 3,
										width: '100%',
										background: 'linear-gradient(to right, #009B4C, #007037)',
										borderRadius: '5px'
									}}
								>

									<Typography variant="h3">{data.title}</Typography>
								</Box>
							)}
						</Box>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							gap: 12,
							color: 'themeWhite.lightest'
						}}
						ref={anotherRef}
					>
						{infographicsDatas.map((data, index) =>
							<Box
								key={index + "-" + data.title}
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'space-between',
									px: 3,
									py: 5,
									gap: 3,
									width: '100%',
									background: 'linear-gradient(to right, #009B4C, #007037)',
									borderRadius: '5px'
								}}
							>
								{data.icon}
								<Typography variant="h2" align="center" >{data.title}</Typography>
								<Typography variant="h1">{data.amount}</Typography>
							</Box>
						)}
					</Box>
				</Box>
			</Box>
		</Container>
	)
}

export default Pencatatan;