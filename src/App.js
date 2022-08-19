import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Components/Header/Header';
import CoinPage from './Pages/CoinPage/CoinPage';
import HomePage from './Pages/HomePage/HomePage';
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Container } from '@mui/system';
function App() {
  return (
    <BrowserRouter>
      <div style={{
        backgroundColor:'#14161a',
        minHeight:'100vh',
        width:'100%'
      }}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
