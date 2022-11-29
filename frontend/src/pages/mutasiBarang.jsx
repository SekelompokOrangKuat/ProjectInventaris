import { Box, Grid, Typography, Stack, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses, styled, Paper, Checkbox, Select, MenuItem, LinearProgress, Autocomplete } from "@mui/material";
import { Box as BoxFeather, Edit, FileText, PlusSquare, Trash2 } from "react-feather";
import React from "react";

const MutasiBarang = () => {

    const [dataTable, setDataTable] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    /* FORM DATA CHANGE */
    const [kodeLokasi, setkodeLokasi] = React.useState('')
    const [kodeBarang, setkodeBarang] = React.useState('')
    const [register, setregister] = React.useState('')
    const [namaBarang, setnamaBarang] = React.useState('')
    const [merkBarang, setmerkBarang] = React.useState('')
    const [bahanBarang, setbahanBarang] = React.useState('')
    const [sertifikatBarang, setsertifikatBarang] = React.useState('')
    const [asalPerolehan, setasalPerolehan] = React.useState('')
    const [tahunPerolehan, settahunPerolehan] = React.useState('')
    const [ukuranBarang, setukuranBarang] = React.useState('')
    const [satuanBarang, setsatuanBarang] = React.useState('')
    const [kondisiBarang, setkondisiBarang] = React.useState('')
    const [jumlahAwalBarang, setjumlahAwalBarang] = React.useState('')
    const [jumlahAwalHarga, setjumlahAwalHarga] = React.useState('')
    const [mutasiBerkurangJumlahBarang, setmutasiBerkurangJumlahBarang] = React.useState('')
    const [mutasiBertambahJumlahBarang, setmutasiBertambahJumlahBarang] = React.useState('')
    const [mutasiBertambahJumlahHarga, setmutasiBertambahJumlahHarga] = React.useState('')
    const [mutasiBerkurangJumlahHarga, setmutasiBerkurangJumlahHarga] = React.useState('')

    const [dataRegisterBarang, setDataRegisterBarang] = React.useState([]);
    const [dataNamaBarang, setDataNamaBarang] = React.useState([]);

    const concatData = (data1, data2) => {
        let concatedData = [];
        for (let i = 0; i < data2.length; i++) {
            const joinedObject = { ...data1[i], ...data2[i] };
            concatedData.push(joinedObject);
        }
        setDataTable(concatedData);
    }

    const addBarang = async () => {
        console.log(satuanBarang);
        console.log(parseInt(jumlahAwalBarang));
        console.log(kodeBarang);
        console.log(register);
        console.log(parseInt(mutasiBertambahJumlahBarang));
        console.log(parseInt(mutasiBerkurangJumlahBarang));
        console.log(parseInt(mutasiBerkurangJumlahHarga));
        console.log(parseInt(mutasiBertambahJumlahHarga));

        const jumlah_awal_barang = parseInt(jumlahAwalBarang);
        const mutasi_bertambah_jumlah_barang = parseInt(mutasiBertambahJumlahBarang);
        const mutasi_berkurang_jumlah_barang = parseInt(mutasiBerkurangJumlahBarang);
        const mutasi_bertambah_jumlah_harga = parseInt(mutasiBertambahJumlahHarga);
        const mutasi_berkurang_jumlah_harga = parseInt(mutasiBerkurangJumlahHarga);


        await fetch(
            'https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/pengelola/mutasi/create',
            {
                method: "POST",
                body: JSON.stringify({
                    satuan: satuanBarang,
                    jumlah_awal: jumlah_awal_barang,
                    kode_barang: kodeBarang,
                    nomor_register: register,
                    jumlah_bertambah: mutasi_bertambah_jumlah_barang,
                    jumlah_berkurang: mutasi_berkurang_jumlah_barang,
                    harga_berkurang: mutasi_bertambah_jumlah_harga,
                    harga_bertambah: mutasi_berkurang_jumlah_harga
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
                getDataTable();
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

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

    const getDataTable = async () => {
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
                console.log(data);
                if (data.response_code === 200) {
                    concatData(data.data.mutasi, data.data.barang);
                } else {
                    console.log(`error: ${data.response_code} ${data.response_message}`);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
        setIsLoading(false);
    }
    const getNoRegister = async (namaBarang) => {
        await fetch(
            'https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/kib/kibb/search',
            {
                method: 'POST',
                body: JSON.stringify({
                    keywords: namaBarang
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
                    let barangRegister = [];
                    for (let i = 0; i < data.data.length; i++) {
                        barangRegister.push({ label: data.data[i].nomor_register, id: i });
                    }
                    setDataRegisterBarang(barangRegister);
                } else {
                    console.log('error');
                }
            })
            .catch((err) => { console.log('error: ' + err); });
    }
    const getBarangData = async (namaBarang, noRegister) => {
        await fetch(
            'https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/getBarang',
            {
                method: 'POST',
                body: JSON.stringify({
                    nama_barang: namaBarang,
                    nomor_register: noRegister
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
                    // if (data.data.nama_ruangan === null || data.data.nama_ruangan === '') {
                    //     setNamaRuangan('-');
                    // } else {
                    //     setNamaRuangan(data.data.nama_ruangan);
                    // }
                    setkodeLokasi(data.data.kode_lokasi);
                    setkodeBarang(data.data.kode_barang);
                    setmerkBarang(data.data.tipe_barang);
                    setbahanBarang(data.data.bahan_barang);
                    setsertifikatBarang(data.data.nomor_pabrik);
                    setasalPerolehan(data.data.asal_usul);
                    settahunPerolehan(data.data.tahun_pembelian);
                    setukuranBarang(data.data.ukuran_barang);
                } else {
                    console.log('error');
                }
            })
            .catch((err) => { console.log('error: ' + err); });
    }

    React.useEffect(() => {
        fetch(
            'https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/kib/kibb/findAll',
            {
                method: 'GET',
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
                    let barangName = [];
                    let barangNameFix = [];
                    for (let i = 0; i < data.data.length; i++) {
                        barangName.push(data.data[i].nama_barang);
                    }
                    barangName = [...new Set(barangName)];
                    for (let i = 0; i < barangName.length; i++) {
                        barangNameFix.push({ label: barangName[i] });
                    }
                    setDataNamaBarang(barangNameFix);
                } else {
                    console.log('error');
                }
            })
            .catch((err) => { console.log('error: ' + err); });
    }, []);

    /* Initiate State */
    React.useEffect(() => {
        getDataTable();
    }, []);

    const fields = [];

    const labels = [
        { nama: "Nama Barang", value: namaBarang, controller: setnamaBarang, autoComplete: true, isDisable: false },
        { nama: "Register", value: register, controller: setregister, autoComplete: true, isDisable: true },
        { nama: "Kode Lokasi", value: kodeLokasi, controller: setkodeLokasi, autoComplete: false, isDisable: true },
        { nama: "Kode Barang", value: kodeBarang, controller: setkodeBarang, autoComplete: false, isDisable: true },
        { nama: "Merk/Type", value: merkBarang, controller: setmerkBarang, autoComplete: false, isDisable: true },
        { nama: "Bahan", value: bahanBarang, controller: setbahanBarang, autoComplete: false, isDisable: true },
        { nama: "No. Pabrik, Mesin, Sertifikat", value: sertifikatBarang, controller: setsertifikatBarang, autoComplete: false, isDisable: true },
        { nama: "Asal/Cara Perolehan Barang", value: asalPerolehan, controller: setasalPerolehan, autoComplete: false, isDisable: true },
        { nama: "Tahun Beli/Perolehan", value: tahunPerolehan, controller: settahunPerolehan, autoComplete: false, isDisable: true },
        { nama: "Ukuran, Barang/Konstrukrsi (P,SP,D)", value: ukuranBarang, controller: setukuranBarang, autoComplete: false, isDisable: true },
        { nama: "Satuan", value: satuanBarang, controller: setsatuanBarang, autoComplete: false, isDisable: false },
        { nama: "Kondisi (B, RR, RB)", value: kondisiBarang, controller: setkondisiBarang, autoComplete: false, isDisable: false },
        { nama: "Jumlah Awal (Barang)", value: jumlahAwalBarang, controller: setjumlahAwalBarang, autoComplete: false, isDisable: false },
        { nama: "Jumlah Awal (Harga)", value: jumlahAwalHarga, controller: setjumlahAwalHarga, autoComplete: false, isDisable: false },
        { nama: "Mutasi Berkurang (Jumlah Barang)", value: mutasiBerkurangJumlahBarang, controller: setmutasiBerkurangJumlahBarang, autoComplete: false, isDisable: false },
        { nama: "Mutasi Bertambah (Jumlah Harga)", value: mutasiBertambahJumlahBarang, controller: setmutasiBertambahJumlahBarang, autoComplete: false, isDisable: false },
        { nama: "Mutasi Bertambah (Jumlah Harga)", value: mutasiBertambahJumlahHarga, controller: setmutasiBertambahJumlahHarga, autoComplete: false, isDisable: false },
        { nama: "Mutasi Berkurang (Jumlah Harga)", value: mutasiBerkurangJumlahHarga, controller: setmutasiBerkurangJumlahHarga, autoComplete: false, isDisable: false },
    ];

    const handleChangeDataForm = (controller, e) => {
        controller(e.target.value);
    }

    const handleNamaBarangChange = async (e) => {
        setnamaBarang(e);
        if (e !== '') {
            await getNoRegister(e);
            handleRegisterBarangChange(dataRegisterBarang[0].label);
        } else {
            handleRegisterBarangChange('');
        }
    }

    const handleRegisterBarangChange = (e) => {
        setregister(e);
        if (e !== '') {
            getBarangData(namaBarang, e);
        }
    }

    for (let i = 0; i < labels.length; i++) {
        fields.push(
            <Grid item xs={4}>
                {labels[i].autoComplete
                    ? <Autocomplete
                        disablePortal
                        options={labels[i].nama.localeCompare('Nama Barang') === 0 ? dataNamaBarang : dataRegisterBarang}
                        renderInput={(params) => <TextField {...params} variant="outlined" label={labels[i].nama} />}
                        fullWidth
                        input={labels[i].value}
                        onInputChange={(event, newInput) => labels[i].nama.localeCompare('Nama Barang') === 0 ? handleNamaBarangChange(newInput) : handleRegisterBarangChange(newInput)}
                    />
                    : <TextField variant="outlined" label={labels[i].nama} value={labels[i].value} onChange={(e) => handleChangeDataForm(labels[i].controller, e)} fullWidth disabled={labels[i].isDisable} />}
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
                    <Button variant="contained" disableElevation onClick={addBarang}>
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
                                <StyledTableCell align="center" sx={{ border: 1 }}>{index + 1}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kode_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.nomor_register}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.nama_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.tipe_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.nomor_pabrik}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.bahan_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.asal_usul}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.tahun_pembelian}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.ukuran_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.satuan}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kondisi_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.jumlah_awal}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.jumlah_akhir}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.jumlah_bertambah}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.harga_bertambah}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.jumlah_berkurang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.harga_berkurang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.jumlah_akhir}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.harga_akhir}</StyledTableCell>
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
                        onClick={() => window.open('/pdf/berita-acara-mutasi', '_blank')}
                        m={2}
                    >
                        <Typography variant="button">Berita Acara Mutasi</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default MutasiBarang;