import { Box, Grid, Stack, TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logoBandungDisdik from '../assets/images/bandung_disdik_logo.png';
import logoSinbada from '../assets/images/sinbada_logo.png';
import { ArrowLeft } from "react-feather";
import '../components/login.css';
import React from "react";

const ForgotPassword = () => {

    const navigate = useNavigate();

    return (
        <Box sx={{ width: "100%" }}>
            <Grid container rowSpacing={0}>
                <Grid item xs={6}>
                    <Stack
                        sx={{
                            height: "100vh",
                            background: "white",
                            position: "relative"
                        }}
                    >
                        <img src={logoBandungDisdik} alt="Logo Bandung & DISDIK" className="header-logo"></img>
                        <Box className="sinbada-section">
                            <img src={logoSinbada} alt="Logo SINBADA" className="sinbada-logo"></img>
                            <h1>Sistem    Inventarisasi    Barang    Daerah</h1>
                            <h2>Dinas Pendidikan Pemerintah Daerah Provinsi Jawa Barat</h2>
                        </Box>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        sx={{
                            height: "100vh",
                            padding: "16",
                            position: "relative",
                            background: "#009B4C"
                        }}
                    >
                        <Stack
                            component="form"
                            className="forgot-password-section"
                            no-validate
                            autoComplete="off"
                            spacing={2}
                        >
                            <Typography variant="h1">Lupa Kata Sandi?</Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: "themeGrey.lightest"
                                }}
                            >
                                Jangan khawatir, kami akan mengirim instruksi untuk mengganti kata sandi anda melalui email.
                            </Typography>
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
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    backgroundColor: "themePrimary.darkest"
                                }}
                                disableElevation
                            >
                                Kirim
                            </Button>
                            <Link
                                component="button"
                                sx={{
                                    color: "white",
                                    '&:hover': {
                                        color: "themePrimary.darkest"
                                    }
                                }}
                                underline="none"
                                onClick={() => { navigate("/login") }}
                            >
                                <Grid
                                    container
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    gap={1}
                                    mt={2}
                                >
                                    <ArrowLeft size={16} />
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: "bold"
                                        }}
                                    >
                                        Kembali ke halaman login
                                    </Typography>
                                </Grid>
                            </Link>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Box >
    )
}

export default ForgotPassword;