import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Components/Header/Header';
import CoinPage from './Pages/CoinPage/CoinPage';
import HomePage from './Pages/HomePage/HomePage';
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Container } from '@mui/system';
import AlertComp from './Components/Alert/AlertComp';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './Pages/ErrorBoundry/ErrorBoundry';


function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          backgroundColor: "#14161a",
          color:"white",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Header />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<div>..loading</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/coins/:id" element={<CoinPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
      <AlertComp />
    </BrowserRouter>
  );
}

export default App;
