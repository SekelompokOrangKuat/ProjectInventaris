import { Box, Grid, Stack, TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logoBandungDisdik from '../assets/images/bandung_disdik_logo.png';
import logoSinbada from '../assets/images/sinbada_logo.png';
import '../components/login.css';
import React from "react";

const Login = () => {

    const navigate = useNavigate();

    return (
        <Box sx={{ width: "100%" }}>
            <Grid container rowSpacing={0}>
                <Grid item xs={6}>
                    <Stack sx={{ height: "100vh", background: "white", position: "relative" }}>
                        <img src={logoBandungDisdik} alt="Bandung & DISDIK Logo" className="header-logo"></img>
                        <Box className="sinbada-section">
                            <img src={logoSinbada} alt="SINBADA Logo" className="sinbada-logo"></img>
                            <h1>Sistem    Inventarisasi    Barang    Daerah</h1>
                            <h2>Dinas Pendidikan Pemerintah Daerah Provinsi Jawa Barat</h2>
                        </Box>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ height: "100vh", padding: "16", position: "relative", background: "#009B4C" }}>
                        <Stack
                            component="form"
                            className="login-section"
                            no-validate
                            autoComplete="off"
                            spacing={2}
                        >
                            <Typography variant="h1" sx={{ fontWeight: "bold" }}>Login</Typography>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="filled"
                                type="email"
                                InputProps={{
                                    disableUnderline: true
                                }}
                                className="TextField"
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                variant="filled"
                                type="password"
                                InputProps={{
                                    disableUnderline: true
                                }}
                                className="TextField"
                            />
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ backgroundColor: "themePrimary.darkest", }}
                                disableElevation
                                onClick={() => { navigate("/") }}
                            >
                                <Typography variant="button">Login</Typography>
                            </Button>
                            <Grid container direction="row" justifyContent="flex-end">
                                <Typography variant="caption">Forgot your password? &nbsp;</Typography>
                                <Link
                                    onClick={() => { navigate("/forgot-password") }}
                                    variant="caption"
                                    sx={{
                                        fontWeight: "bold",
                                        color: "white",
                                        '&:hover': {
                                            color: "themePrimary.darkest"
                                        },
                                        cursor: "pointer"
                                    }}
                                    underline="none"
                                >
                                    Click Here
                                </Link>
                            </Grid>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Box >
    )
}

export default Login;