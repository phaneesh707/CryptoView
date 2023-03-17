import React, { useState } from 'react'
import { Box, Button, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase';



const Login = () => {
const [email, setEmail] = useState();
const [password, setPassword] = useState();
const {setAlert} = CryptoState();


const handleSubmit =async () => {
    if(!email || !password){
        setAlert({
            open:true,
            message:"Enter all fields",
            type:"error"
        })
        return;
    }
    try {
        const result = await signInWithEmailAndPassword(auth,email,password);
        setAlert({
          open: true,
          message: `User login Success`,
          type: "success",
        });
    } catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
    }
};
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          margin:5
        }}
      >
        <TextField
          variant="outlined"
          label="Enter Email"
          type="email"
          value={email}
          
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <Button
          size="large"
          variant="contained"
          sx={{
            backgroundColor: "#EEBC1D",
            color: "white",
          }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Box>
    </div>
  );
}

export default Login