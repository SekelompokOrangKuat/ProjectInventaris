/**
 * 
 * Dashboard page (content)
 * 
 * 
 */

import { Box, Button, Container, Typography, Grid } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { Calendar, FileText, Tool, Trash2, PlusSquare } from "react-feather";

const Pendataan = () => {

	var today = new Date();
	const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

	let infographicsDatas = [
		{ icon: <Tool size={50} />, title: 'Pemeliharaan', amount: 14 },
		{ icon: <Trash2 size={50} />, title: 'Penghapusan', amount: 11 }
	]

	let infographicsData = [
		{ icon: <PlusSquare size={50} />, title: 'Pemeliharaan', amount: 14 },
		{ icon: <Calendar size={50} />, title: 'Penghapusan', amount: 11 },
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
					justifyContent: 'center'
				}}
			>
				{/* Information Section */}
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						pl: 5,
						pr: 5,
						gap: 12,
						width: '50%',
						height: '100%'
						// py: 3,
					}}
					ref={ref}
				>
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
									px: 3,
									py: 8,
									gap: 3,
									width: '100%',
									background: 'linear-gradient(to right, #009B4C, #007037)',
									borderRadius: '5px'
								}}
							>
								{data.icon}
								<Typography variant="h3">{data.title}</Typography>
							</Box>
						)}
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							color: 'themeWhite.lightest',
							gap: 12
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
									px: 3,
									py: 8,
									gap: 3,
									width: '100%',
									background: 'linear-gradient(to right, #009B4C, #007037)',
									borderRadius: '5px'
								}}
							>
								{data.icon}
								<Typography variant="h3">{data.title}</Typography>
							</Box>
						)}
					</Box>
				</Box>
				{/* SOP Section */}
			</Box>
		</Container>
	)
}

export default Pendataan;