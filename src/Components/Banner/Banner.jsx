import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import img from '../../Asset/banner2.jpg'
import Carousel from './Carousel'
const Banner = () => {
  return (
    <div
      style={{
        backgroundImage:"url('./banner2.jpg')",
      }}
    >
      <Container
        sx={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          paddingTop: 6,
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
              fontFamily: "Montserrat",
            }}
          >
            Crypto View
          </Typography>

          <Typography variant='subtitle2' sx={{
                color:"darkgray",
                fontFamily:"Montserrat",
                textTransform:"capitalize"
          }}>
            Get all info regarding your favourite crypto currency
          </Typography>
        </div>
          <Carousel />
      </Container>
    </div>
  );
}

export default Banner