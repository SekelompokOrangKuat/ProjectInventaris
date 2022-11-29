import { Box, Grid, Typography, Stack, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses, styled, Paper, Checkbox, Select, MenuItem, LinearProgress } from "@mui/material";
import { Edit, FileText, PlusSquare, Trash2 } from "react-feather";
import React from "react";

const Peminjaman = () => {

    const [dataTable, setDataTable] = React.useState([]);
    const [isTableUsulan, setIsTableUsulan] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    const concatData = (data1, data2, status) => {
        let concatedData = [];
        for (let i = 0; i < data2.length; i++) {
            const joinedObject = { ...data1[i], ...data2[i] };
            if (status === 1) {
                if (joinedObject.status_peminjaman === 1) {
                    concatedData.push(joinedObject);
                }
            } else {
                if (joinedObject.status_peminjaman !== 1) {
                    concatedData.push(joinedObject);
                }
            }
        }
        console.log(concatedData);
        setDataTable(concatedData);
    }

    const getSearchDataTable = async (keywords) => {
        setIsLoading(true);
        await fetch(
            'https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/peminjaman/peminjamans/search_peminjaman',
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
                console.log(data);
                concatData(data.data.peminjaman, data.data.barang, isTableUsulan ? 1 : 2);
            })
            .catch((err) => {
                console.log(err.message);
            });
        setIsLoading(false);
    }

    const getDataTable = async (status) => {
        setIsLoading(true);
        await fetch(
            'https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/peminjaman/peminjamans/findAll',
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
                concatData(data.data.peminjaman, data.data.barang, status);
            })
            .catch((err) => {
                console.log(err.message);
            });
        setIsLoading(false);
    }


    /* Initial State */
    React.useEffect(() => {
        getDataTable(1);
    }, []);

    const fields = [];

    const labels = [
        "Nama Peminjam",
        "No Pabrik",
        "NIP",
        "No Rangka",
        "Unit Kerja",
        "No Mesin",
        "No HP/WA",
        "No Polisi",
        "Jenis Barang/ Nama Barang",
        "No BPKB",
        "Kode Barang",
        "Tanggal Peminjaman",
        "Merk/Type",
        "Tanggal Pengembalian",
        "Tahun Pembelian",
        "Keterangan",
        "Upload Gambar",
    ];

    for (let i = 0; i < labels.length; i++) {
        fields.push(
            <Grid item xs={6}>
                <TextField variant="outlined" label={labels[i]} fullWidth />
            </Grid>
        );
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
                    <FileText size={20} />
                    <Typography variant="h2">
                        Peminjaman
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
                        Tambah Barang
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
                    <Button variant="outlined" >
                        <Typography variant="button">Batal</Typography>
                    </Button>
                    <Button variant="contained" disableElevation>
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
                    boxSizing: "border-box"
                }}
            >
                <Grid item>
                    <Select
                        value={isTableUsulan}
                        onChange={() => {
                            getDataTable(!isTableUsulan ? 1 : 2);
                            setIsTableUsulan(!isTableUsulan);
                        }}
                    >
                        <MenuItem value={true}>Peminjaman</MenuItem>
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
                                    getDataTable(isTableUsulan ? 1 : 2);
                                }
                            }
                        }
                    />
                </Grid>
            </Grid>
            {isLoading ? <LinearProgress sx={{ m: 3 }} /> : null}

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
                            {
                                isTableUsulan
                                    ? <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                                    : null
                            }
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" colSpan={5} sx={{ border: 1 }}>Nomor</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                        </TableRow>
                        <TableRow>
                            {
                                isTableUsulan
                                    ? <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}></StyledTableCell>
                                    : null
                            }
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>No</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Nama Peminjam</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>NIP</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Unit Kerja</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>No. HP/WA</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Jenis Barang/ Nama Barang</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Kode Barang</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Merk/Type</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Tahun Pembelian</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Pabrik</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Rangka</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Mesin</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Polisi</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>BPKB</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Tanggal Peminjaman</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Tanggal Pengembalian</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Keterangan</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataTable.map((item, index) => (
                            <StyledTableRow key={index}>
                                {
                                    isTableUsulan
                                        ? <StyledTableCell align="center" sx={{ border: 1 }}>
                                            <Stack
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                                spacing={2}
                                            >
                                                <Checkbox sx={{ margin: "0", padding: "0" }} size="medium" />
                                                <Edit size={20} />
                                                <Trash2 size={20} />
                                            </Stack>
                                        </StyledTableCell>
                                        : null
                                }
                                <StyledTableCell align="center" sx={{ border: 1 }}>{index + 1}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>Nama Peminjam</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>NIP</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>Unit Kerja</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>NO HP</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.nama_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.tipe_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.tahun_pembelian}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.nomor_pabrik}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.nomor_rangka}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.nomor_mesin}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.nomor_polisi}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.nomor_bpkb}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.tanggal_peminjaman}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.tanggal_pengembalian}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>-</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                pr={3}
                mb={3}
            >
                <Grid item>
                    <Button
                        variant="contained"
                        startIcon={<FileText />}
                        onClick={() => window.open('/pdf/berita-acara-peminjaman', '_blank')}
                        m={2}
                    >
                        <Typography variant="button">Berita Acara Peminjaman</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Peminjaman;