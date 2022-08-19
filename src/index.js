import { ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CryptoContext from './CryptoContext';
import theme from './Styles/Styles'
import "react-alice-carousel/lib/alice-carousel.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <ThemeProvider theme={theme}> */}
    <CryptoContext>
      <App />
    </CryptoContext>
    {/* </ThemeProvider> */}
  </React.StrictMode>
);
