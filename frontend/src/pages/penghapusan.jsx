import {
    Box,
    Grid,
    Typography,
    Stack,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    tableCellClasses,
    styled,
    Paper,
    Autocomplete,
    IconButton,
    Select,
    MenuItem,
    LinearProgress,
} from "@mui/material";
import { Edit, MinusSquare, PlusSquare, Save, Tool, Trash, Trash2 } from "react-feather";
import React from "react";

const Penghapusan = () => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [dataNamaBarang, setDataNamaBarang] = React.useState([]);
    const [dataRegisterBarang, setDataRegisterBarang] = React.useState([]);
    const [inputNamaBarang, setInputNamaBarang] = React.useState('');
    const [valueNamaBarang, setValueNamaBarang] = React.useState(null);
    const [inputRegisterBarang, setInputRegisterBarang] = React.useState('');
    const [valueRegisterBarang, setValueRegisterBarang] = React.useState(null);
    const [isTambahBarang, setIsTambahBarang] = React.useState(true);
    const [isTableUsulan, setIsTableUsulan] = React.useState(true);
    const [currentEditBarangId, setCurrentEditBarangId] = React.useState('');

    /* Auto fill field controller */
    const [namaRuangan, setNamaRuangan] = React.useState('');
    const [jumlahBarang, setJumlahBarang] = React.useState('1');
    const [namaPenanggungJawab, setNamaPenanggungJawab] = React.useState(localStorage.getItem('nama'));
    const [kondisiBarang, setKondisiBarang] = React.useState('');
    const [kodeBarang, setKodeBarang] = React.useState('');
    const [keterangan, setKeterangan] = React.useState('');
    const [fotoBarang, setfotoBarang] = React.useState('');

    const [dataTable, setDataTable] = React.useState([]);

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

    const handleNamaBarangChange = async (e) => {
        setValueNamaBarang(e);
        setInputNamaBarang(e);
        if (e !== '') {
            if (isTambahBarang) {
                await getNoRegister(e);
                setValueRegisterBarang(dataRegisterBarang[0].label);
                handleRegisterBarangChange(dataRegisterBarang[0].label);
            }
        } else {
            setValueRegisterBarang(null);
            handleRegisterBarangChange('');
        }
    }

    const handleRegisterBarangChange = (e) => {
        setInputRegisterBarang(e);
        if (e !== '') {
            getBarangData(inputNamaBarang, e);
        }
    }

    const handleAutoFillField = (controller, e) => {
        controller(e.target.value);
    }

    const handleEditBarang = (item) => {
        setIsTambahBarang(false);
        setCurrentEditBarangId(item.user_pengusulan_id.$oid);
        handleNamaBarangChange(item.nama_barang);
        setInputRegisterBarang(item.nomor_register);
        setValueRegisterBarang(item.nomor_register);
        console.log(item.nomor_register);
        setKodeBarang(item.kode_barang);
        setKeterangan(item.keterangan);
        setKondisiBarang(item.kondisi_barang);
        setfotoBarang(item.foto_barang);
    }

    /* ADD BARANG */
    const addBarang = async () => {
        await fetch(
            'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/create',
            {
                method: 'POST',
                body: JSON.stringify({
                    nama_barang: inputNamaBarang,
                    nomor_register: inputRegisterBarang,
                    nama_pengusul: localStorage.getItem("nama"),
                    jenis_usulan: "Penghapusan",
                    kondisi_barang: kondisiBarang,
                    keterangan: keterangan,
                    foto_barang: fotoBarang,
                }),
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'application/json',
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': localStorage.getItem('token')
                }
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.response_code === 201) {
                    clearForm();
                    getDataTable(isTableUsulan ? 0 : 1);
                } else {
                    console.log('error' + data.response_code + ': ' + data.response_message);
                }
            })
            .catch((err) => { console.log('error: ' + err); });
    }

    const editBarang = async (_id) => {
        await fetch(
            'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/edit',
            {
                method: 'POST',
                body: JSON.stringify({
                    id: _id,
                    nama_pengusul: localStorage.getItem("nama"),
                    kondisi_barang: kondisiBarang,
                    keterangan: keterangan,
                    foto_barang: fotoBarang,
                }),
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'application/json',
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': localStorage.getItem('token')
                }
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.response_code === 200) {
                    clearForm();
                    getDataTable(isTableUsulan ? 0 : 1);
                } else {
                    console.log('error' + data.response_code + ': ' + data.response_message);
                }
            })
            .catch((err) => { console.log('error: ' + err); });
    }

    /* DELETE BARANG FROM TABLE BY ID */
    const deleteBarang = async (_id) => {
        await fetch(
            'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/delete',
            {
                method: 'POST',
                body: JSON.stringify({
                    id: _id
                }),
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'application/json',
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': localStorage.getItem('token')
                }
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.response_code === 200) {
                    getDataTable(0);
                } else {
                    console.log('error' + data.response_code + ': ' + data.response_message);
                }
            })
            .catch((err) => { console.log('error: ' + err); });
    }

    /* GET DATA BARANG BY NAMA BARANG & NO REG FROM API */
    const getBarangData = async (namaBarang, noRegister) => {
        await fetch(
            'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/getBarang',
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
                    if (data.data.nama_ruangan === null || data.data.nama_ruangan === '') {
                        setNamaRuangan('-');
                    } else {
                        setNamaRuangan(data.data.nama_ruangan);
                    }
                    setKodeBarang(data.data.kode_barang);
                } else {
                    console.log('error');
                }
            })
            .catch((err) => { console.log('error: ' + err); });
    }

    /* GET NO REGISTER FROM NAMA BARANG */
    const getNoRegister = async (namaBarang) => {
        await fetch(
            'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/kib/kibb/search',
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

    /* APPROVE PEMELIHARAAN BARANG BY ID FROM API  */
    const approvalBarang = async (_id, isApprove) => {
        await fetch(
            'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/approval',
            {
                method: 'POST',
                body: JSON.stringify({
                    id: _id,
                    is_approve: isApprove
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
                    getDataTable(0);
                } else {
                    console.log('error' + data.response_code + data.response_message);
                }
            })
            .catch((err) => { console.log('error: ' + err); });
    }

    /* GET BARANG NAME AT INIT */
    React.useEffect(() => {
        fetch(
            'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/kib/kibb/findAll',
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

    /* GET DATA TABLE BY KEYWORDS FROM API (SEARCH) */
    const getSearchDataTable = async (keywords) => {
        setIsLoading(true);
        await fetch(
            isTableUsulan
                ? 'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/search_penghapusan'
                : 'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/search_riwayat_penghapusan',
            {
                method: 'POST',
                body: JSON.stringify({
                    keywords: keywords
                }),
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'application/json',
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': localStorage.getItem('token'),
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.response_code === 200) {
                    concatData(
                        data.data.pengusulan,
                        data.data.barang,
                        isTableUsulan ? 0 : 1);
                } else if (data.response_code === 422) {
                    console.log('keywords not found');
                    setDataTable([]);
                } else {
                    console.log('error' + data.response_code + data.response_message);
                }
            })
            .catch((err) => {
                console.log('error: ' + err.message);
            });
        setIsLoading(false);
    }

    /* GET DATA TABLE FROM API */
    const getDataTable = async (status) => {
        setIsLoading(true);
        await fetch(
            'http://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/find_penghapusan',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'application/json',
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': localStorage.getItem('token'),
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.response_code === 200) {
                    concatData(data.data.pengusulan, data.data.barang, status);
                } else {
                    console.log(data.response_message);
                }
            })
            .catch((err) => {
                console.log('error: ' + err.message);
            });
        setIsLoading(false);
    }

    const clearForm = () => {
        handleNamaBarangChange('');
        handleRegisterBarangChange('');
        setNamaRuangan('');
        setKondisiBarang('');
        setKodeBarang('');
        setKeterangan('');
        setfotoBarang('');
    }

    /* Initial State */
    React.useEffect(() => {
        getDataTable(0);
    }, []);

    const fields = [];

    const labels = [
        { name: "Nama Barang", controller: setInputNamaBarang, value: inputNamaBarang, isDisabled: !isTambahBarang, autocomplete: true },
        { name: "Register Barang", controller: setInputRegisterBarang, value: inputRegisterBarang, isDisabled: !isTambahBarang, autocomplete: true },
        { name: "Nama Ruangan", controller: setNamaRuangan, value: namaRuangan, isDisabled: true, autocomplete: false },
        { name: "Jumlah Barang", controller: setJumlahBarang, value: jumlahBarang, isDisabled: true, autocomplete: false },
        { name: "Nama Penanggung Jawab", controller: setNamaPenanggungJawab, value: namaPenanggungJawab, isDisabled: true, autocomplete: false },
        { name: "Kondisi (RR, RB, R)", controller: setKondisiBarang, value: kondisiBarang, isDisabled: false, autocomplete: false },
        { name: "Kode Barang", controller: setKodeBarang, value: kodeBarang, isDisabled: true, autocomplete: false },
        { name: "Keterangan", controller: setKeterangan, value: keterangan, isDisabled: false, autocomplete: false },
        { name: "Upload Gambar", controller: setfotoBarang, value: fotoBarang, isDisabled: false, autocomplete: false },
    ];

    /* SET FIELD VALUE */
    for (let i = 0; i < labels.length; i++) {
        if (!labels[i].autocomplete) {
            fields.push(
                <Grid item xs={4}>
                    <TextField variant="outlined" label={labels[i].name} value={labels[i].value} onChange={(e) => handleAutoFillField(labels[i].controller, e)} fullWidth disabled={labels[i].isDisabled} />
                </Grid>
            );
        } else {
            fields.push(
                <Grid item xs={4}>
                    <Autocomplete
                        disablePortal
                        options={labels[i].name.localeCompare('Nama Barang') === 0 ? dataNamaBarang : dataRegisterBarang}
                        renderInput={(params) => <TextField {...params} variant="outlined" label={labels[i].name} />}
                        fullWidth
                        value={labels[i].name.localeCompare('Register Barang') === 0 ? valueRegisterBarang : valueNamaBarang}
                        onChange={(event, newInput) => labels[i].name.localeCompare('Register Barang') === 0 ? setValueRegisterBarang(newInput) : setValueNamaBarang(newInput)}
                        input={labels[i].value}
                        onInputChange={(event, newInput) => labels[i].name.localeCompare('Nama Barang') === 0 ? handleNamaBarangChange(newInput) : handleRegisterBarangChange(newInput)}
                        disabled={labels[i].isDisabled}
                    />
                </Grid>
            )
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
                    <Trash size={20} />
                    <Typography variant="h2">
                        Penghapusan Barang
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
                    <MinusSquare size={24} color="#757575" />
                    <Typography variant="h2" sx={{ color: "themeGrey.darker" }}>
                        {isTambahBarang ? 'Hapus' : 'Edit'} Barang
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
                    <Button
                        variant="outlined"
                        onClick={
                            !isTambahBarang
                                ? () => { clearForm(); setIsTambahBarang(true) }
                                : clearForm
                        }
                    >
                        <Typography variant="button">Batal</Typography>
                    </Button>
                    <Button variant="contained" disableElevation onClick={isLoading ? null : isTambahBarang ? addBarang : () => editBarang(currentEditBarangId)}>
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
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>No</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Nama Ruangan</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Nama Penanggung Jawab</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Kode Barang</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Register barang</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Nama Barang</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Jumlah Barang</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Kondisi (RR, RB, R)</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Foto</StyledTableCell>
                            <StyledTableCell align="center" sx={{ border: 1, borderBottom: 0 }}>Keterangan</StyledTableCell>
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
                                                <IconButton onClick={() => handleEditBarang(item)} >
                                                    <Edit size={20} />
                                                </IconButton>
                                                <IconButton onClick={() => deleteBarang(item.user_pengusulan_id.$oid)}>
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
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.nomor_register}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.nama_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.jumlah_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.kondisi_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.foto_barang}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ border: 1 }}>{item.keterangan}</StyledTableCell>
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
                                                    onClick={() => approvalBarang(item.user_pengusulan_id.$oid, "true")}
                                                >
                                                    <Typography variant="button">Terima</Typography>
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<Save />}
                                                    color="error"
                                                    sx={{ minWidth: "108px" }}
                                                    onClick={() => approvalBarang(item.user_pengusulan_id.$oid, "false")}
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

export default Penghapusan;