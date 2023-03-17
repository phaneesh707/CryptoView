import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Login from "./Login";
import Signup from "./Signup";
import { createTheme } from "@mui/system";
import { ThemeProvider } from "@emotion/react";
import GoogleButton from  "react-google-button"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../CryptoContext";
import { Container } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  backgroundColor: "#292929",
  border: "2px solid #000",
  borderRadius: 2,
  boxShadow: 24,
   
};

    


export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {setAlert} = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        mode: "dark",
      },
    },
  });

  const googleProvider = new GoogleAuthProvider()

  const handleGoogle = async () =>{
    const res = await signInWithPopup(auth,googleProvider);
    try {
        if(res){
            setAlert({
                open:true,
                message:`Login successful . Welcome ${res.user.displayName|| res.user.email}`,
                type:"success"
            })
        }
    } catch (error) {
        setAlert({
          open: true,
          message:error.message,
          type: "error",
        });
    }
  }

  return (
    <div>
     
        
      <Button
        sx={{ width: 90, height: 40, backgroundColor: "#EEBC1D" }}
        onClick={handleOpen}
        variant="contained"
      >
        Login
      </Button>


      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box>
          <Box sx={style}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Login" sx={{ marginRight: 5, marginLeft: 10 }} />
              <Tab label="Signup" />
            </Tabs>
            {value === 0 && <Login />}
            {value === 1 && <Signup />}

            <Box
              sx={{
                padding: 5,
                paddingTop: 2,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <span style={{ color: "white" }}>OR</span>
              <GoogleButton
                style={{
                  width: "100%",
                  outline: "none",
                  borderRadius: 5,
                  fontSize: 18,
                }}
                type="dark"
                onClick={handleGoogle}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
      
    </div>
  );
}
