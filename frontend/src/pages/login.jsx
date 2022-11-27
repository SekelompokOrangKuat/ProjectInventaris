import { Box, Grid, Stack, TextField, Button, Typography, Link, CircularProgress } from "@mui/material";
import { red } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import logoBandungDisdik from '../assets/images/bandung_disdik_logo.png';
import logoSinbada from '../assets/images/sinbada_logo.png';
import '../components/login.css';
import React from "react";

const Login = () => {
    const [emailPasswordValidation, setEmailPasswordValidation] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    const [email, setEmail] = React.useState('');
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const [password, setPassword] = React.useState('');
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    /* REST API EXAMPLE */
    const tryLogin = async () => {
        await fetch(
            'https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/login',
            {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'application/json',
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setIsLoading(false);
                if (data.response_code === 200) {
                    setEmailPasswordValidation(true);
                    localStorage.setItem("token", data.data.token_access);
                    localStorage.setItem("email", data.data.user.email);
                    localStorage.setItem("nama", data.data.user.nama);
                    localStorage.setItem("role", data.data.user.user_role);
                    console.log(data.data);
                    navigate("/");
                } else {
                    setEmailPasswordValidation(false);
                    console.log('token not found!');
                }

            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleLogin = (e) => {
        setIsLoading(true);
        console.log(email + password);
        e.preventDefault();
        tryLogin();
    };

    const navigate = useNavigate();

    return (
        <Box sx={{ width: "100%" }}>
            <Grid
                container
                rowSpacing={0}
            >
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
                            <img src={logoSinbada} alt="SINBADA Logo" className="sinbada-logo"></img>
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
                                value={email}
                                onChange={handleEmailChange}
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
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <Typography
                                variant="h5"
                                sx={{
                                    color: red[800],
                                    textAlign: "left",
                                    display: emailPasswordValidation ? "none" : "block"
                                }}
                            >
                                Email/Password salah!
                            </Typography>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    backgroundColor: "themePrimary.darkest"
                                }}
                                disableElevation
                                onClick={isLoading ? null : handleLogin}
                            >
                                <Typography variant="button">{isLoading ? <CircularProgress size={20} sx={{ color: "white" }} /> : "Login"}</Typography>
                            </Button>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-end"
                            >
                                <Typography variant="caption">Forgot your password? &nbsp;</Typography>
                                <Link
                                    onClick={() => { navigate("/forgot-password") }}
                                    variant="caption"
                                    sx={{
                                        fontWeight: "bold",
                                        color: "white",
                                        cursor: "pointer",
                                        '&:hover': {
                                            color: "themePrimary.darkest"
                                        }
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