import React, { useEffect } from 'react'
import { TrendingCoins } from '../../config/config'
import axios from "axios"
import { CryptoState } from '../../CryptoContext'
import { useState } from 'react'
import AliceCarousel from "react-alice-carousel";
import { Box } from '@mui/material'
import { Router,useNavigate,Link } from 'react-router-dom'


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {


    const [trending,setTrending] = useState([])
    const { currency,symbol } = CryptoState();
    const navigate = useNavigate();
    const fetchTrendingCoins = async ()=>{
        const {data} = await axios.get(TrendingCoins(currency));
        setTrending(data);
    }

    // console.log(trending);

    useEffect(() => {
      fetchTrendingCoins();
    }, [currency]);
    
    const responsive = {
        0:{
            items:2
        },
        512:{
            items:4
        }
    }
    

    

    const items = trending.map(coin=>{

        let profit = coin.price_change_percentage_24h>=0;

        return (
            <Link
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "white",
                textTransform: "uppercase",
                pointer: "cursor",
                textDecoration: "none",
              }}
              // onClick={()=>{
              //   console.log("hee")
              //   navigate('/coins/${coin.id}')
              // }}
              to={`/coins/${coin.id}`}
              
            >
              <img
                src={coin?.image}
                alt={coin.name}
                height="80"
                style={{ marginBottom: 10 }}
              />
              <span>
                {coin?.symbol}
                &nbsp;
                <span
                  style={{
                    color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                    fontWeight: 500,
                  }}
                >
                  {profit && "+"}
                  {coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </span>

              <span style={{ fontSize: 22, fontWeight: 500 }}>
                {symbol}
                {numberWithCommas(coin?.current_price?.toFixed(2))}
              </span>
            </Link>
        );
    })

  return (
    <div
      style={{
        height: "50%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <AliceCarousel
       mouseTracking
       infinite
       autoPlayInterval={1000}
       animationDuration={1500}
       responsive={responsive}
       disableButtonsControls
       autoPlay
       disableDotsControls
       items={items}

       >

       </AliceCarousel>
    </div>
  );
}

export default Carousel