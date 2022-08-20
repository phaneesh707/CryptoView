import { Box, Button, TextField } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase';

const Signup = () => {
  const [email,setEmail] = useState()
  const [password, setPassword] = useState();
  const [confirmpassword, setconfirmPassword] = useState();
  const {setAlert} = CryptoState()

  const handleSubmit = async (e)=>{
    if(password !== confirmpassword){
      setAlert({open:true,message:"Password miss-match",type:"error"})
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(auth,email,password);
      console.log(result);
      setAlert({
        open:true,
        message:`Sign up successful.Welcome ${result.user.email}`,
        type:"success"
      })
      
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type:"error"
      });
    }
    

  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
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
      <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        value={confirmpassword}
        onChange={(e) => setconfirmPassword(e.target.value)}
      />
      <Button
        size="large"
        variant='contained'
        sx={{
          backgroundColor: "#EEBC1D",
          color: "white",
        }}
        onClick={handleSubmit}
      >
        Signup
      </Button>
    </Box>
  );
}

export default Signup