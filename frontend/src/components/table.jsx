import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.themeSecondary.darker,
    color: theme.palette.themeWhite.darkest,
    border:'solid 1px',
    borderColor:theme.palette.themeGrey.darkest,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border:'solid 1px',
    borderColor:theme.palette.themeGrey.darkest,
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

const Tables = ({data}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700, border:'solid 1px', borderColor: 'themeGrey.darkest', }} aria-label="customized table">
        <TableHead>
          <TableRow>
          	{data.actions !== null && <StyledTableCell></StyledTableCell>}
            {Object.keys(data.rows[0]).map((key) => <StyledTableCell>{key}</StyledTableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map((row, index) => (
            <StyledTableRow key={index + row.name}>
              {data.actions !== null && 
              	<StyledTableCell align="center" width="132px">
              		{data.actions.map((data)=>data)}		
              	</StyledTableCell>
              }
              {Object.values(row).map((key) => <StyledTableCell >{key}</StyledTableCell>)}

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Tables;