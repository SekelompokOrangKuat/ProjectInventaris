import { Box, Grid, Typography, Stack, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses, styled, Paper, IconButton, LinearProgress, Select, MenuItem } from "@mui/material";
import { Edit, PlusSquare, Save, Trash2 } from "react-feather";
import React from "react";

const Pengadaan = () => {

    const [dataTable, setDataTable] = React.useState([]);
    const [isTableUsulan, setIsTableUsulan] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    /* FORM DATA CHANGE */
    const [namaRuangan, setNamaRuangan] = React.useState('');
    const [spesifikasiBarang, setSpesifikasiBarang] = React.useState('');
    const [namaPenanggungJawab, setNamaPenanggungJawab] = React.useState('');
    const [merkBarang, setMerkBarang] = React.useState('');
    const [kodeBarang, setKodeBarang] = React.useState('');
    const [keterangan, setKeterangan] = React.useState('');
    const [namaBarang, setNamaBarang] = React.useState('');
    const [fotoBarang, setFotoBarang] = React.useState('');
    const [jumlahBarang, setJumlahBarang] = React.useState('');
    const [ukuranBarang, setUkuranBarang] = React.useState('');
    const [bahanBarang, setBahanBarang] = React.useState('');
    const [tahunPembelian, setTahunPembelian] = React.useState('');
    const [nomorPabrik, setNomorPabrik] = React.useState('');
    const [nomorRangka, setNomorRangka] = React.useState('');
    const [nomorMesin, setNomorMesin] = React.useState('');
    const [nomorPolisi, setNomorPolisi] = React.useState('');
    const [nomorBPKB, setNomorBPKB] = React.useState('');
    const [asalUsul, setAsalUsul] = React.useState('');
    const [hargaBarang, setHargaBarang] = React.useState('');

    const concatData = (data1, data2, status) => {
        let concatedData = [];
        for (let i = 0; i < data2.length; i++) {
            const joinedObject = { ...data1[i], ...data2[i] };
            if (status === 0) {
                if (joinedObject.status_usulan === 0) {
                    concatedData.push(joinedObject);
                }
            } else {
                if (joinedObject.status_usulan !== 0) {
                    concatedData.push(joinedObject);
                }
            }
        }
        setDataTable(concatedData);
    }

    const addBarang = () => {

    }

    const getDataTable = async (status) => {
        setIsLoading(true);
        await fetch(
            'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengadaan/findAll',
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
                    console.log(data.data);
                    concatData(
                        data.data.pengadaan,
                        data.data.barang,
                        status);
                } else {
                    console.log('error' + data.response_code + data.response_message);
                }
            })
            .catch((err) => {
                console.log('error: ' + err.message);
            });
        setIsLoading(false);
    }

    const getStatusCode = (status) => {
        switch (status) {
            case 1:
                return "Accepted";
                break;
            case 2:
                return "Rejected";
                break;
            case 3:
                return "New";
                break;
            default:
                return "Deleted";
                break;
        }
    }

    React.useEffect(() => {
        getDataTable(0);
    }, []);

    const fields = [];

    const labels = [
        { name: "Nama Ruangan", controller: setNamaRuangan, value: namaRuangan },
        { name: "Spesifikasi", controller: setSpesifikasiBarang, value: spesifikasiBarang },
        { name: "Nama Penanggung Jawab", controller: setNamaPenanggungJawab, value: namaPenanggungJawab },
        { name: "Merk/Type", controller: setMerkBarang, value: merkBarang },
        { name: "Kode Barang", controller: setKodeBarang, value: kodeBarang },
        { name: "Keterangan", controller: setKeterangan, value: keterangan },
        { name: "Nama Barang", controller: setNamaBarang, value: namaBarang },
        { name: "Upload Gambar", controller: setFotoBarang, value: fotoBarang },
        { name: "Jumlah Barang", controller: setJumlahBarang, value: jumlahBarang },
        { name: "Ukuran Barang", controller: setUkuranBarang, value: ukuranBarang },
        { name: "Bahan Barang", controller: setBahanBarang, value: bahanBarang },
        { name: "Tahun Pembelian", controller: setTahunPembelian, value: tahunPembelian },
        { name: "Nomor Pabrik", controller: setNomorPabrik, value: nomorPabrik },
        { name: "Nomor Rangka", controller: setNomorRangka, value: nomorRangka },
        { name: "Nomor Mesin", controller: setNomorMesin, value: nomorMesin },
        { name: "Nomor Polisi", controller: setNomorPolisi, value: nomorPolisi },
        { name: "Nomor BPKB", controller: setNomorBPKB, value: nomorBPKB },
        { name: "Asal Usul", controller: setAsalUsul, value: asalUsul },
        { name: "Harga Barang", controller: setHargaBarang, value: hargaBarang },
    ];

    const handleChangeInput = (controller, value) => {
        controller(value.target.value);
    };

    for (let i = 0; i < labels.length; i++) {
        fields.push(
            <Grid item xs={4}>
                <TextField variant="outlined" label={labels[i].name} onChange={(e) => handleChangeInput(labels[i].controller, e)} fullWidth />
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
                    <Trash2 size={20} />
                    <Typography variant="h2">
                        Pengadaan Barang
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
                    mb: 2,
                    boxSizing: "border-box"
                }}
            >
                <Grid item>
                    <Select
                        value={isTableUsulan}
                        onChange={() => {
                            getDataTable(!isTableUsulan ? 0 : 1)
                            setIsTableUsulan(!isTableUsulan);;
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
                    // onChange={
                    //     (e) => {
                    //         if (e.target.value !== '') {
                    //             getSearchDataTable(e.target.value);
                    //         } else {
                    //             getDataTable(isTableUsulan ? 0 : 1);
                    //         }
                    //     }
                    // }
                    />
                </Grid>
            </Grid>

            {
                isLoading
                    ? <LinearProgress m={3} />
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
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Nama Ruangan</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Nama Penanggung Jawab</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Kode Barang</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Nama barang</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Jumlah Barang</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Spesifikasi</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Merk/Type</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Keterangan</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Foto</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Status</StyledTableCell>
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
                                                <IconButton >
                                                    <Edit size={20} />
                                                </IconButton>
                                                <IconButton>
                                                    <Trash2 size={20} />
                                                </IconButton>
                                            </Stack>
                                        </StyledTableCell>
                                        : null
                                }
                                <StyledTableCell align="center" sx={{ border: 1 }}>{index + 1}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.nama_ruangan}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.nama_pengusul}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.nama_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.jumlah_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.spesifikasi_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.tipe_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.keterangan}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.foto_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>
                                    {
                                        item.status_usulan === 0
                                            ?
                                            <Stack
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                                spacing={1}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<Save />}
                                                    color="success"
                                                    sx={{ minWidth: "108px" }}
                                                // onClick={() => approvalBarang(item.user_pengusulan_id.$oid, "true")}
                                                >
                                                    <Typography variant="button">Terima</Typography>
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<Save />}
                                                    color="error"
                                                    sx={{ minWidth: "108px" }}
                                                // onClick={() => approvalBarang(item.user_pengusulan_id.$oid, "false")}
                                                >
                                                    <Typography variant="button">Tolak</Typography>
                                                </Button>
                                            </Stack>
                                            : getStatusCode(item.status_usulan)
                                    }
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Pengadaan;