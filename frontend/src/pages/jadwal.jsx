import { Box, Grid, Typography, Stack, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses, styled, Paper, Select, MenuItem, LinearProgress, IconButton } from "@mui/material";
import { Calendar, Edit, PlusSquare, Trash2 } from "react-feather";
import React from "react";

const Jadwal = () => {

    const date = new Date();
    const currentDate = String(date.getFullYear()) + '-' + String(date.getMonth() + 1) + '-' + String(date.getDate());
    const [isLoading, setIsLoading] = React.useState(false);
    const [dataTable, setDataTable] = React.useState([]);
    const [inputTanggal, setInputTanggal] = React.useState(currentDate);
    const [inputKeterangan, setInputKeterangan] = React.useState('');
    const [isTambahJadwal, setIsTambahJadwal] = React.useState(true);
    const [selectedJadwal, setSelectedJadwal] = React.useState('');
    const [isTableUsulan, setIsTableUsulan] = React.useState(true);

    const handleChangeTanggal = (val) => {
        setInputTanggal(val.target.value);
    }

    const handleChangeKeterangan = (val) => {
        setInputKeterangan(val.target.value);
    }

    const addJadwal = async () => {
        const splitedText = inputTanggal.split('-');
        const fixedTanggal = splitedText[2] + '-' + splitedText[1] + '-' + splitedText[0];

        await fetch(
            'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/jadwal/create',
            {
                method: "POST",
                body: JSON.stringify({
                    tanggal: fixedTanggal,
                    keterangan: inputKeterangan
                }),
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'application/json',
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': localStorage.getItem('token'),
                }
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.response_code === 201) {
                    setInputKeterangan('');
                    getDataTable(isTableUsulan ? 0 : 1);
                } else {
                    console.log('error: ' + data.response_code + ' ' + data.response_message);
                }
            })
            .catch((err) => console.log(err));
    }

    const handleEditJadwal = (item) => {
        setIsTambahJadwal(false);
        setSelectedJadwal(item._id.$oid);
        let splitedText;
        let fixedTanggal;
        if (item.tanggal !== null) {
            splitedText = item.tanggal.split(' ');
            fixedTanggal = splitedText[2] + '-' + monthTextToNum(splitedText[1]) + '-' + splitedText[0];
        } else {
            fixedTanggal = currentDate;
        }
        setInputTanggal(fixedTanggal);
        setInputKeterangan(item.keterangan);
    }

    const monthTextToNum = (monthText) => {
        switch (monthText) {
            case 'Januari':
                return 1;
                break;
            case 'Februari':
                return 2;
                break;
            case 'Maret':
                return 3;
                break;
            case 'April':
                return 4;
                break;
            case 'Mei':
                return 5;
                break;
            case 'Juni':
                return 6;
                break;
            case 'Juli':
                return 7;
                break;
            case 'Agustus':
                return 8;
                break;
            case 'September':
                return 9;
                break;
            case 'Oktober':
                return 10;
                break;
            case 'November':
                return 11;
                break;
            case 'Desember':
                return 12;
                break;
            default:
                return date.getFullYear;
                break;
        }
    }

    const editJadwal = async () => {
        await fetch(
            'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/jadwal/edit',
            {
                method: "POST",
                body: JSON.stringify({
                    id: selectedJadwal,
                    tanggal: inputTanggal,
                    keterangan: inputKeterangan
                }),
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'application/json',
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': localStorage.getItem('token'),
                }
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.response_code === 200) {
                    clearForm();
                    setIsTambahJadwal(true);
                    getDataTable(isTableUsulan ? 0 : 1);
                } else {
                    console.log('error: ' + data.response_code + ' ' + data.response_message);
                }
            })
            .catch((err) => console.log(err));
    }

    const deleteJadwal = async (_id) => {
        await fetch(
            'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/jadwal/delete',
            {
                method: "POST",
                body: JSON.stringify({
                    id: _id
                }),
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'application/json',
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': localStorage.getItem('token'),
                }
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.response_code === 422) {
                    getDataTable(isTableUsulan ? 0 : 1);
                } else {
                    console.log('error: ' + data.response_code + ' ' + data.response_message);
                }
            })
            .catch((err) => console.log(err));
    }

    const getSearchDataTable = async (keywords) => {
        setIsLoading(true);
        await fetch(
            isTableUsulan
                ? 'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/jadwal/search'
                : 'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/jadwal/search_riwayat',
            {
                method: "POST",
                body: JSON.stringify({
                    keywords: keywords
                }),
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'application/json',
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': localStorage.getItem('token'),
                }
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.response_code == 200) {
                    setDataTable(data.data);
                } else {
                    console.log("error:" + data.response_code + data.response_message);
                }
            })
            .catch((err) => console.log(err));
        setIsLoading(false);
    }

    const getDataTable = async (status) => {
        setIsLoading(true);
        await fetch(
            'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/jadwal/findAll',
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'application/json',
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': localStorage.getItem('token'),
                }
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.response_code == 200) {
                    let selectedDataByStatus = [];
                    for (let i = 0; i < data.data.length; i++) {
                        if (data.data[i].status_jadwal === status) {
                            selectedDataByStatus.push(data.data[i]);
                        }
                    }
                    setDataTable(selectedDataByStatus);
                } else {
                    console.log("error:" + data.response_code + data.response_message);
                }
            })
            .catch((err) => console.log(err));
        setIsLoading(false);
    }

    const clearForm = () => {
        setInputTanggal(currentDate);
        setInputKeterangan('');
    }

    React.useEffect(() => {
        getDataTable(0);
    }, []);

    const fields = [];

    const labels = [
        "Tanggal",
        "Keterangan",
    ];

    for (let i = 0; i < labels.length; i++) {
        if (i === 0) {
            fields.push(
                <Grid item xs={6}>
                    <TextField
                        id="date"
                        label="Tanggal"
                        type="date"
                        value={inputTanggal}
                        onChange={handleChangeTanggal}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                </Grid>
            );
        } else {
            fields.push(
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        value={inputKeterangan}
                        onChange={handleChangeKeterangan}
                        label={labels[i]}
                        fullWidth
                    />
                </Grid>
            );
        }
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#0236A4",
            color: theme.palette.common.white,
            borderColor: "black",
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            borderColor: "black",
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: "#AAC3F3",
        },
        '&:nth-of-type(even)': {
            backgroundColor: "#D9E6FF",
        },
    }));

    return (
        <Box
            sx={{
                width: "100%",
                m: "0",
                boxSizing: "border-box"
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    p: 3,
                    boxSizing: "border-box"
                }}
            >
                <Grid
                    container
                    display="flex"
                    flexDirection="row"
                    justifyContent="flext-start"
                    alignItems="center"
                    gap={1}
                >
                    <Calendar size={20} />
                    <Typography variant="h2">
                        Jadwal
                    </Typography>
                </Grid>
            </Box>
            <Stack
                spacing={1}
                sx={{
                    backgroundColor: "#FAFAFA",
                    mx: 3,
                    mb: 3,
                    maxWidth: "100%",
                    width: "auto",
                    borderRadius: "25px",
                    boxSizing: "border-box",
                    webkitBoxSizing: "border-box",
                    mozBoxSizing: "border-box"
                }}
                pb={4}
            >
                <Grid
                    container
                    display="flex"
                    flexDirection="row"
                    justifyContent="flext-start"
                    alignItems="center"
                    gap={1}
                    mt={4}
                    ml={4}
                    sx={{
                        maxWidth: "100%",
                        width: "auto",
                        boxSizing: "border-box",
                    }}
                >
                    <PlusSquare size={24} color="#757575" />
                    <Typography variant="h2" sx={{ color: "themeGrey.darker" }}>
                        {isTambahJadwal ? "Tambah" : "Edit"} Jadwal
                    </Typography>
                </Grid>
                <Grid
                    container
                    rowSpacing={{ xs: 1, sm: 2, md: 3 }}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    sx={{
                        maxWidth: "100%",
                        width: "auto",
                        pr: 4,
                        boxSizing: "border-box"
                    }}
                >
                    {fields}
                </Grid>
                <Box
                    container
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    pt={4}
                    pr={4}
                    gap={1}
                >
                    <Button variant="outlined" onClick={isTambahJadwal ? clearForm : () => { clearForm(); setIsTambahJadwal(true) }}>
                        <Typography variant="button">Batal</Typography>
                    </Button>
                    <Button variant="contained" onClick={isTambahJadwal ? addJadwal : editJadwal} disableElevation>
                        <Typography variant="button">Simpan</Typography>
                    </Button>
                </Box>
            </Stack>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                maxWidth="100%"
                sx={{
                    px: 3,
                    mb: 2,
                    boxSizing: "border-box"
                }}
            >
                <Grid item>
                    <Select
                        value={isTableUsulan}
                        onChange={() => {
                            getDataTable(!isTableUsulan ? 0 : 1);
                            setIsTableUsulan(!isTableUsulan);
                        }}
                    >
                        <MenuItem value={true}>Usulan</MenuItem>
                        <MenuItem value={false}>Riwayat</MenuItem>
                    </Select>
                </Grid>
                <Grid item>
                    <TextField
                        variant="outlined"
                        label="Search"
                        onChange={
                            (e) => {
                                if (e.target.value !== '') {
                                    getSearchDataTable(e.target.value);
                                } else {
                                    getDataTable(isTableUsulan ? 0 : 1);
                                }
                            }
                        }
                    />
                </Grid>
            </Grid>

            {
                isLoading
                    ? <LinearProgress sx={{ mx: 3 }} />
                    : null
            }

            <TableContainer
                component={Paper}
                sx={{
                    maxWidth: "100%",
                    width: "auto",
                    m: 3
                }}
            >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>No</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Tanggal</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Triwulan</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Semester</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Keterangan</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataTable.map((item, index) => (
                            <StyledTableRow key={index + 1}>
                                <StyledTableCell align="center" sx={{ border: 1 }}>
                                    <Stack
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        <IconButton onClick={() => handleEditJadwal(item)} >
                                            <Edit size={20} />
                                        </IconButton>
                                        <IconButton onClick={() => deleteJadwal(item._id.$oid)} >
                                            <Trash2 size={20} />
                                        </IconButton>
                                    </Stack>
                                </StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{index}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.tanggal}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.triwulan}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.semester}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.keterangan}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Jadwal;