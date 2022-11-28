import { Box, Grid, Paper, styled, Typography, InputLabel, MenuItem, FormControl, Select, Link, } from "@mui/material";
import React from "react";
import { FileText } from "react-feather";

const Laporan = () => {

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

    const Item = styled(Paper)(({ theme }) => ({
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.themeSecondary.darkest,
        borderColor: theme.palette.themeGrey.lighter,
        borderRadius: "10px",
        transition: "150ms",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: theme.palette.themeSecondary.darkest,
            color: "white",
        }
    }));

    const fileTextIcon = <FileText strokeWidth={1} size={50} />;

    return (
        <Box
            sx={{
                width: "100%",
                m: "0",
                boxSizing: "border-box"
            }}
        >
            <Grid
                container
                spacing={2}
                sx={{
                    width: "auto",
                    mx: "auto",
                    py: 2,
                    px: 2,
                    boxSizing: "border-box",
                }}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs="auto">
                    <Link
                        onClick={() => window.open('/pdf/kib-a', '_blank')}
                        underline="none">
                        <Item variant="outlined">
                            {fileTextIcon}
                            <Typography variant="h1">KIB - A</Typography>
                        </Item>
                    </Link>
                </Grid>
                <Grid item xs="auto">
                    <Link
                        onClick={() => window.open('/pdf/kib-b', '_blank')}
                        underline="none">
                        <Item variant="outlined">
                            {fileTextIcon}
                            <Typography variant="h1">KIB - B</Typography>
                        </Item>
                    </Link>
                </Grid>
                <Grid item xs="auto">
                    <Link
                        onClick={() => window.open('/pdf/kib-c', '_blank')}
                        underline="none">
                        <Item variant="outlined">
                            {fileTextIcon}
                            <Typography variant="h1">KIB - C</Typography>
                        </Item>
                    </Link>
                </Grid>
                <Grid item xs="auto">
                    <Link
                        onClick={() => window.open('/pdf/kib-d', '_blank')}
                        underline="none">
                        <Item variant="outlined">
                            {fileTextIcon}
                            <Typography variant="h1">KIB - D</Typography>
                        </Item>
                    </Link>
                </Grid>
                <Grid item xs="auto">
                    <Link
                        onClick={() => window.open('/pdf/kib-e', '_blank')}
                        underline="none">
                        <Item variant="outlined">
                            {fileTextIcon}
                            <Typography variant="h1">KIB - E</Typography>
                        </Item>
                    </Link>
                </Grid>
                <Grid item xs="auto">
                    <Link
                        onClick={() => window.open('/pdf/kib-f', '_blank')}
                        underline="none">
                        <Item variant="outlined">
                            {fileTextIcon}
                            <Typography variant="h1">KIB - F</Typography>
                        </Item>
                    </Link>
                </Grid>
                <Grid item xs="auto">
                    <Link
                        onClick={() => window.open('/pdf/rbi', '_blank')}
                        underline="none"
                    >
                        <Item variant="outlined">
                            {fileTextIcon}
                            <Typography variant="h1">RBI</Typography>
                        </Item>
                    </Link>
                </Grid>
                <Grid item xs="auto">
                    <Link
                        onClick={() => window.open('/pdf/rekap-mutasi', '_blank')}
                        underline="none"
                    >
                        <Item variant="outlined">
                            {fileTextIcon}
                            <Typography variant="h1">Mutasi</Typography>
                        </Item>
                    </Link>
                </Grid>
                <Grid item xs="auto">
                    <Link
                        onClick={() => window.open('/pdf/rekap-peminjaman', '_blank')}
                        underline="none"
                    >
                        <Item variant="outlined">
                            {fileTextIcon}
                            <Typography variant="h1">Peminjaman</Typography>
                        </Item>
                    </Link>
                </Grid>
                <Grid item xs="8">
                    <Item
                        variant="outlined"
                        sx={{
                            "&:hover": {
                                backgroundColor: "white",
                                color: "themeSecondary.darkest",
                            }
                        }}
                    >
                        <Grid
                            container
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                            sx={{ color: "themeSecondary.darkest" }}
                        >
                            {/* <Grid item xs="auto">test</Grid>
                            <Grid item xs="auto">test</Grid> */}
                            <Grid item xs="auto">
                                {fileTextIcon}
                            </Grid>
                            <Grid item xs="auto">
                                <Typography variant="h1" sx={{ color: 'themeGrey.main' }}>KIR</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth >
                                    <InputLabel>Ruangan</InputLabel>
                                    <Select
                                        value='KIR Bid. GTK'
                                        label="Ruangan"
                                        onChange={() => { }}
                                    >
                                        <MenuItem value="KIR Bid. GTK">KIR Bid. GTK</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs="auto">
                                <Link
                                    onClick={() => window.open('/pdf/kir-qrcode', 'blank')}
                                    underline="none"
                                >
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            color: "themeSecondary.darkest",
                                            transition: "250ms",
                                            "&:hover": {
                                                color: "white",
                                                backgroundColor: "themeSecondary.darkest",
                                            }
                                        }}
                                    >
                                        QR Code
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item xs="auto">

                                <Link
                                    onClick={() => window.open('/pdf/kir-pdf', 'blank')}
                                    underline="none"
                                >
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            color: "red",
                                            transition: "250ms",
                                            "&:hover": {
                                                color: "white",
                                                backgroundColor: "themeSecondary.darkest",
                                            }
                                        }}
                                    >
                                        PDF
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Laporan;