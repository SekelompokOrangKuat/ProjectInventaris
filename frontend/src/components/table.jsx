import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { Edit, Trash2, RefreshCcw } from 'react-feather';


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

const Tables = () => {
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700, border:'solid 1px', borderColor: 'themeGrey.darkest', }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="center">Nama</StyledTableCell>
              <StyledTableCell align="center">NIP</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Nomor Telepopn</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index + row.name}>
              	<StyledTableCell align="center" width="132px">
                  <IconButton onClick={()=>alert(row.Nama)}><Edit size={20} color="#0F2C64"/></IconButton>
                  <IconButton onClick={handleClickOpen}><Trash2 size={20} color="#D32F2F"/></IconButton>
                  <IconButton onClick={()=>alert(row.Nama)}><RefreshCcw size={20} color="#317011"/></IconButton>
              	</StyledTableCell>
                {Object.values(row).map((key) => <StyledTableCell >{key}</StyledTableCell>)}
              </StyledTableRow>
            ))}
          </TableBody>
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
          <Button variant="text" color="warning" onClick={handleClose} autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Tables;