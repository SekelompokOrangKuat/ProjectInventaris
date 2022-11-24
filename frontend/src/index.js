import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    h1: {
      fontSize: '34px',
      fontWeight: 'bold'
    },
    h2: {
      fontSize: '24px',
      fontWeight: 'bold'
    },
    h3: {
      fontSize: '20px',
      fontWeight: '600'
    },
    h4: {
      fontSize: '16px',
      fontWeight: '600'
    },
    h5: {
      fontSize: '14px',
      fontWeight: '600'
    },
    h6: {
      fontSize: '12px',
      fontWeight: '600'
    },
    body1: {
      fontSize: '14px'
    },
    caption: {
      fontSize: '12px',
      fontWeight: '300'
    },
    button: {
      fontSize: '14px',
      fontWeight: '600',
      textTransform: "none"
    }
  },
  palette: {
    themePrimary: {
      main: '#009B4C',
      darkest: '#007037'
    },
    themeGrey: {
      darkest: '#212121',
      darker: '#616161',
      main: '#757575',
      ligther: '#9E9E9E',
      lightest: '#E0E0E0'
    }
  },

})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
