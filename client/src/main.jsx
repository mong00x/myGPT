import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider,extendTheme } from '@chakra-ui/react'
import './main.css'

const theme = extendTheme({
  colors: {
    fonts:{
      body: 'Roboto, sans-serif',
      heading: 'Roboto, sans-serif',
    }
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
