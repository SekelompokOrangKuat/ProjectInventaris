import { Box, Grid, Typography, Stack, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses, styled, Paper, Checkbox, Select, MenuItem, LinearProgress, Autocomplete } from "@mui/material";
import { Edit, FileText, PlusSquare, Trash2 } from "react-feather";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import React from "react";

const Peminjaman = () => {

    const date = new Date();
    const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    // const getCurrentDate = () => {
    //     const curDate = String(date.getDate());
    //     const curMonth = String(date.getMonth() + 1);
    //     const curYear = String(date.getFullYear());
    //     const currentFullDate = String(`${curDate}-${curMonth}-${curYear}`);
    //     console.log(currentFullDate);
    //     return currentFullDate;
    // }

    const [dataTable, setDataTable] = React.useState([]);
    const [isTableUsulan, setIsTableUsulan] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    /* DATA FORM CHANGE */
    const [namaBarang, setNamaBarang] = React.useState('');
    const [noRegister, setNoRegister] = React.useState('');
    const [namaPeminjam, setNamaPeminjam] = React.useState(localStorage.getItem('nama'));
    const [noPabrik, setNoPabrik] = React.useState('');
    const [NIP, setNIP] = React.useState('');
    const [noRangka, setNoRangka] = React.useState('');
    const [unitKerja, setUnitKerja] = React.useState('');
    const [noMesin, setNoMesin] = React.useState('');
    const [noHP, setNoHP] = React.useState('');
    const [noPolisi, setNoPolisi] = React.useState('');
    const [jenisBarang, setJenisBarang] = React.useState('');
    const [noBPKB, setNoBPKB] = React.useState('');
    const [kodeBarang, setKodeBarang] = React.useState('');
    const [tanggalPeminjaman, setTanggalPeminjaman] = React.useState(dayjs(currentDate, 'DD-MM-YYYY'));
    const [merkBarang, setMerkBarang] = React.useState('');
    const [tanggalPengembalian, setTanggalPengembalian] = React.useState(dayjs(currentDate, 'DD-MM-YYYY'));
    const [tahunPembelian, setTahunPembelian] = React.useState('');
    const [keterangan, setKeterangan] = React.useState('');
    const [fotoBarang, setFotoBarang] = React.useState('');

    const [dataNamaBarang, setDataNamaBarang] = React.useState([]);
    const [dataRegisterBarang, setDataRegisterBarang] = React.useState([]);

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

    const addBarang = async () => {
        await fetch(
            'https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/peminjaman/peminjamans/create',
            {
                method: "POST",
                body: JSON.stringify({
                    nama_barang: namaBarang,
                    nomor_register: noRegister,
                    nama_peminjam: namaPeminjam,
                    nip_peminjam: NIP,
                    hp_peminjam: noHP,
                    unit_kerja: unitKerja,
                    tanggal_peminjaman: tanggalPeminjaman,
                    tanggal_pengembalian: tanggalPengembalian
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
                getDataTable(isTableUsulan ? 1 : 2);
            })
            .catch((err) => {
                console.log(err.message);
            });
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
        getNamaBarang();
    }, []);

    const fields = [];

    const labels = [
        { nama: "Nama Barang", value: namaBarang, controller: setNamaBarang, isDisabled: false, autoComplete: true },
        { nama: "Nomor Register", value: noRegister, controller: setNoRegister, isDisabled: false, autoComplete: true },
        { nama: "Nama Peminjam", value: namaPeminjam, controller: setNamaPeminjam, isDisabled: true, autoComplete: false },
        { nama: "NIP", value: NIP, controller: setNIP, isDisabled: false, autoComplete: false },
        { nama: "Nomor HP/WA", value: noHP, controller: setNoHP, isDisabled: false, autoComplete: false },
        { nama: "Unit Kerja", value: unitKerja, controller: setUnitKerja, isDisabled: false, autoComplete: false },
        { nama: "Nomor Pabrik", value: noPabrik, controller: setNoPabrik, isDisabled: true, autoComplete: false },
        { nama: "Nomor Rangka", value: noRangka, controller: setNoRangka, isDisabled: true, autoComplete: false },
        { nama: "Nomor Mesin", value: noMesin, controller: setNoMesin, isDisabled: true, autoComplete: false },
        { nama: "Nomor Polisi", value: noPolisi, controller: setNoPolisi, isDisabled: true, autoComplete: false },
        { nama: "Jenis Barang/ Nama Barang", value: jenisBarang, controller: setJenisBarang, isDisabled: true, autoComplete: false },
        { nama: "Nomor BPKB", value: noBPKB, controller: setNoBPKB, isDisabled: true, autoComplete: false },
        { nama: "Kode Barang", value: kodeBarang, controller: setKodeBarang, isDisabled: true, autoComplete: false },
        { nama: "Merk/Type", value: merkBarang, controller: setMerkBarang, isDisabled: true, autoComplete: false },
        { nama: "Tahun Pembelian", value: tahunPembelian, controller: setTahunPembelian, isDisabled: true, autoComplete: false },
        { nama: "Keterangan", value: keterangan, controller: setKeterangan, isDisabled: false, autoComplete: false },
        { nama: "Upload Gambar", value: fotoBarang, controller: setFotoBarang, isDisabled: false, autoComplete: false },
    ];

    const handleTanggalPeminjamanChange = (e) => {
        setTanggalPeminjaman(e);
    }

    const handleTanggalPengembalianChange = (e) => {
        setTanggalPengembalian(e);
    }

    const handleDataChange = (controller, e) => {
        controller(e.target.value);
    }

    /* GET NO REGISTER FROM NAMA BARANG */
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

    const getNamaBarang = async () => {
        await fetch(
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
    }

    const handleNamaBarangChange = (val) => {
        setNamaBarang(val);
        getNoRegister(val);
    }

    const handleNoRegisterChange = (val) => {
        setNoRegister(val);
    }

    for (let i = 0; i < labels.length; i++) {
        fields.push(
            <Grid item xs={4}>
                {
                    labels[i].autoComplete
                        ? <Autocomplete
                            disablePortal
                            options={labels[i].nama.localeCompare('Nama Barang') === 0 ? dataNamaBarang : dataRegisterBarang}
                            renderInput={(params) => <TextField {...params} variant="outlined" label={labels[i].nama} />}
                            fullWidth
                            input={labels[i].value}
                            onInputChange={
                                (event, newInput) => labels[i].nama.localeCompare('Nama Barang') === 0
                                    ? handleNamaBarangChange(newInput)
                                    : handleNoRegisterChange(newInput)
                            }
                            disabled={labels[i].isDisabled}
                        />
                        : <TextField
                            variant="outlined"
                            label={labels[i].nama}
                            value={labels[i].value}
                            disabled={labels[i].isDisabled}
                            onChange={(e) => handleDataChange(labels[i].controller, e)}
                            fullWidth
                        />
                }
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
                    <Grid item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Tanggal Peminjaman"
                                inputFormat="DD/MM/YYYY"
                                value={tanggalPeminjaman}
                                onChange={handleTanggalPeminjamanChange}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Tanggal Pengembalian"
                                inputFormat="DD/MM/YYYY"
                                value={tanggalPengembalian}
                                onChange={handleTanggalPengembalianChange}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
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