import { Box, Grid, Typography, Stack, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses, styled, Paper, Checkbox } from "@mui/material";
import { Box as BoxFeather, Edit, PlusSquare, Trash2 } from "react-feather";
import React from "react";

const MutasiBarang = () => {

    /* REST API EXAMPLE */
    // const [posts, setPosts] = React.useState([]);
    // React.useEffect(() => {
    //     fetch(
    //         'https://cors-anywhere.herokuapp.com/https://backend-sinbada.herokuapp.com/v1/kib/kiba/findAll',
    //         {
    //             method: 'GET',
    //             headers: {
    //                 // 'Accept': 'application/json',
    //                 'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjp7IiRvaWQiOiI2MzcxY2ViNmUyMWZhYzBjNDhlNGUxNmQifSwiZXhwIjoxNjY5MDMyMDE4fQ.PujpxQ882HAwkZjGAwHiUpj_LHf_FcF4OcwDNbBEuAY',
    //                 'X-Requested-With': 'application/json'
    //             },
    //         }
    //     )
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //             setPosts(data);
    //             console.log(posts[0]['_id']['$oid'])
    //         })
    //         .catch((err) => {
    //             console.log(err.message);
    //         });
    // }, []);

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

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

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
                        {rows.map((row, index) => (
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
                                <StyledTableCell align="center" sx={{ border: 1 }}>{row.calories}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{row.fat}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{row.carbs}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{row.protein}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{row.calories}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{row.fat}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{row.carbs}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{row.protein}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{row.calories}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{row.fat}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{row.carbs}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{row.protein}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{row.calories}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{row.fat}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{row.carbs}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{row.protein}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{row.fat}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{row.carbs}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{row.protein}</StyledTableCell>
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