import * as React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';


export default function SplashScreen() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#000000',
            },
        },
    });


    return (
        <div id="splash-screen">
            <h1>Playlister</h1>
            <h2>Create and Share Playlists</h2>
            <h3>Welcome to Playlister!</h3>

            <ThemeProvider theme={theme}>
                <Button variant="contained" href="/register/" color="primary" id="register-button">
                    Register
                </Button>
            </ThemeProvider>

            <ThemeProvider theme={theme}>
                <Button variant="contained" href="/login/" color="primary" id="login-button">
                    Login
                </Button>
            </ThemeProvider>

            <ThemeProvider theme={theme}>
                <Button variant="contained" href="#contained-buttons" color="primary" id="guest-button">
                    Continue as Guest
                </Button>
            </ThemeProvider>

            <h4>Created by Alan Lin</h4>

        </div>
    )
}