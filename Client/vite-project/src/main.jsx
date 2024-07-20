import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from 'react-router-dom'


const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>

      <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>

    </BrowserRouter>
)