import { Box, Grid, Typography, Stack, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses, styled, Paper, Checkbox, Select, MenuItem, LinearProgress } from "@mui/material";
import { Box as BoxFeather, Edit, PlusSquare, Trash2 } from "react-feather";
import React from "react";

const MutasiBarang = () => {

    const [dataTable, setDataTable] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const getSearchDataTable = async (keywords) => {
        setIsLoading(true);
        await fetch(
            'https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/pengelola/mutasi/search',
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
                if (data.response_code === 200) {
                    setDataTable(data.data);
                } else {
                    setDataTable([]);
                    console.log(`error: ${data.response_code} ${data.response_message}`);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
        setIsLoading(false);
    }

    const getDataTable = async (status) => {
        setIsLoading(true);
        await fetch(
            'https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/pengelola/mutasi/findAll',
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
                if (data.response_code === 200) {
                    setDataTable(data.data);
                } else {
                    console.log(`error: ${data.response_code} ${data.response_message}`);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
        setIsLoading(false);
    }

    /* Initiate State */
    React.useEffect(() => {
        getDataTable();
    }, []);

    const fields = [];

    const labels = [
        "Kode Lokasi",
        "Kode Barang",
        "Register",
        "Nama Barang",
        "Merk/Type",
        "Bahan",
        "No. Pabrik, Mesin, Sertifikat",
        "Asal/Cara Perolehan Barang",
        "Tahun Beli/Perolehan",
        "Ukuran, Barang/Konstrukrsi (P,SP,D)",
        "Satuan",
        "Kondisi (B, RR, RB)",
        "Jumlah Awal (Barang)",
        "Jumlah Awal (Harga)",
        "Mutasi Berkurang (Jumlah Barang)",
        "Mutasi Bertambah (Jumlah Harga)",
        "Mutasi Bertambah (Jumlah Harga)",
        "Mutasi Berkurang (Jumlah Harga)",
    ];

    for (let i = 0; i < labels.length; i++) {
        fields.push(
            <Grid item xs={4}>
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
                    <BoxFeather size={20} />
                    <Typography variant="h2">
                        Mutasi Barang
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
                justifyContent="flex-end"
                alignItems="center"
                maxWidth="100%"
                sx={{
                    px: 3,
                    boxSizing: "border-box"
                }}
            >
                <Grid item>
                    <TextField
                        variant="outlined"
                        label="Search"
                        onChange={
                            (e) => {
                                if (e.target.value !== '') {
                                    getSearchDataTable(e.target.value);
                                } else {
                                    getDataTable();
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
                            <StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" colSpan={3} sx={{ border: 1, borderBottom: 0 }}>No</StyledTableCell>
                            <StyledTableCell align="center" colSpan={4} sx={{ border: 1, borderBottom: 0 }}>Spesifikasi Barang</StyledTableCell>
                            <StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" colSpan={2} sx={{ border: 1, borderBottom: 0 }}>Jumlah Awal</StyledTableCell>
                            <StyledTableCell align="center" colSpan={4} sx={{ border: 1, }}>Mutasi Perubahan</StyledTableCell>
                            <StyledTableCell align="center" colSpan={2} sx={{ border: 1, borderBottom: 0 }}>Jumlah Akir</StyledTableCell>
                            <StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderBottom: 0 }}></StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderTop: 0, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" colSpan={3} sx={{ border: 1, borderTop: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" colSpan={4} sx={{ border: 1, borderTop: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderTop: 0, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderTop: 0, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderTop: 0, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderTop: 0, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderTop: 0, borderBottom: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" colSpan={2} sx={{ border: 1, borderTop: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" colSpan={2} sx={{ border: 1, borderTop: 0 }}>Bertambah</StyledTableCell>
                            <StyledTableCell align="center" colSpan={2} sx={{ border: 1, borderTop: 0, borderBottom: 1 }}>Berkurang</StyledTableCell>
                            <StyledTableCell align="center" colSpan={2} sx={{ border: 1, borderTop: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" colSpan={1} sx={{ border: 1, borderTop: 0, borderBottom: 0 }}></StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}></StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1 }}>No</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1 }}>Kode Barang</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1 }}>Register</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1 }}>Nama / Jenis Barang</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1 }}>Merk Type</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1 }}>No. Sertifikat/ No. Pabrik/ No. Chasis/ Mesin</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1 }}>Bahan</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Asal/Cara Perolehan Barang</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Tahun Beli/ Perolehan</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Ukuran Barang/ Konstruksi (P, SP, D)</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Satuan</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Kondisi (B, RR, RB)</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1 }}>Barang</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1 }}>Harga</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1 }}>Jumlah Barang</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1 }}>Jumlah Harga</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1 }}>Jumlah Barang</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1 }}>Jumlah Harga</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1 }}>Barang</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1 }}>Harga</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderTop: 0 }}>Keterangan</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataTable.map((item, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="center" sx={{ border: 1 }}>
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
                                <StyledTableCell align="center" sx={{ border: 1 }}>{index}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>-</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default MutasiBarang;