import React, { useEffect } from 'react'
import { useState } from 'react';
import {useParams} from "react-router-dom"
import {CryptoState} from "../../CryptoContext"
import axios from "axios"
import {SingleCoin} from "../../config/config"
import CoinInfo from '../../Components/CoinInfo/CoinInfo';
import parse from "html-react-parser";
import Typography from "@mui/material/Typography";
import { numberWithCommas } from "../../Components/Banner/Carousel";
import { Button, LinearProgress } from '@mui/material';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';


const CoinPage = () => {

  const {id} = useParams();
  const [coin,setCoin] = useState();
  const {currency,symbol,user,watchlist,setAlert} = CryptoState();

  const fetchCoin = async () =>{
    const {data} = await axios.get(SingleCoin(id));
    setCoin(data);
  }

const inWatchlist = watchlist.includes(coin?.id); 
console.log("hre"+inWatchlist);

  const addToWatchList = async () =>{
    const coinRef = doc(db,"watchlist",user.uid);
    try {
      await setDoc(coinRef,{
        coins:[...watchlist,coin?.id]
      })
      setAlert({
        open:true,
        message:`${coin.name} added to watchlist`,
        type:"success"
      })
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  }


  const removeFromWatchlist = async ()=>{
    const coinRef = doc(db,"watchlist",coin.id)
    try {
       await setDoc(
         coinRef,
         { coins: watchlist.filter((wish) => wish !== coin?.id) },
         { merge: true }
       );

      setAlert({
        open: true,
        message: `${coin.name} deleted from watchlist`,
        type: "success",
      });
    } catch (error) {
      console.log(error);
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  }
 
  useEffect(() => {
    fetchCoin();
  }, [])

  if(!coin) return <LinearProgress style={{backgroundColor:"gold"}}/>


  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        style={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          marginTop: 10,
          borderRight: "2px solid grey",
          alignItems: "center",
          color: "white",
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{
            marginBottom: 20,
          }}
        />
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            marginBottom: 3,
            fontFamily: "Montserrat",
          }}
        >
          {coin?.name}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 5,
            paddingBottom: 3,
            paddingTop: 0,
            textAlign: "justify",
          }}
        >
          {typeof coin?.description.en.split(". ")[0] === "string"
            ? parse(coin?.description.en.split(". ")[0])
            : coin?.description.en.split(". ")[0]}
          .
        </Typography>
        <div>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: 3,
                fontFamily: "Montserrat",
              }}
            >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: 3,
                fontFamily: "Montserrat",
              }}
            >
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: 3,
                fontFamily: "Montserrat",
              }}
            >
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          <span>
                {user &&(
                  <Button sx={{
                    width:"100%",
                    height:"40px",
                    backgroundColor:inWatchlist?"#ff0000":"#EEBC1D",
                    color:"white"
                  }}
                  onClick={inWatchlist ? removeFromWatchlist : addToWatchList}
                  
                  >
                    {inWatchlist?"Remove from watchlist":"Add coin to watchlist"}
                  </Button>
                )}
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
}

export default CoinPage