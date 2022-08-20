import { AppBar, createTheme, FormControl, InputLabel, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { CryptoState } from '../../CryptoContext'
import AuthModal from '../Authentication/AuthModal'
import UserSidebar from '../Authentication/UserSidebar'


const Header = () => {
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette:{
      mode:'dark'
    },
  })

  const {currency,setCurrency,user} = CryptoState();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                flex: 1,
                color: "gold",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              Crypto View
            </Typography>
            <FormControl>
              <Select
                variant="outlined"
                sx={{
                  height: 40,
                  width: 100,
                  marginRight:3
                }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"INR"}>INR</MenuItem>
                <MenuItem value={"USD"}>USD</MenuItem>
              </Select>
            </FormControl>
            {user?<UserSidebar />:<AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header