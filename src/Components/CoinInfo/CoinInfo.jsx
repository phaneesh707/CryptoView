import { ThemeProvider } from '@emotion/react';
import { CircularProgress, createTheme } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../../config/config';
import { CryptoState } from '../../CryptoContext';
import {Line} from "react-chartjs-2"
import { chartDays } from '../../config/data';
import SelectButton from '../SelectButton/SelectButton';
import Chart from "chart.js/auto";


const CoinInfo = ({coin}) => {

  console.log(coin);
  const [historicData, setHistoricData] = useState()
  const [days,setDays] = useState(1);
  const {currency} = CryptoState();
  const [flag, setflag] = useState(false);

  const fetchHistoricData = async () =>{
    const {data} = await axios.get(HistoricalChart(coin.id,days,currency));
    setHistoricData(data.prices);
    setflag(true);
  }


  useEffect(() => {
    fetchHistoricData();
  }, [currency,days])
  
  const darkTheme = createTheme({
    palette:{
      primary:{
        main:"#fff"
      },
      type:"dark"
    }
  })


  return (
    <ThemeProvider theme={darkTheme}>
      <div
        style={{
          width: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
          padding: 40,
        }}
      >
        {!historicData || flag === false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  selected={day.value === days}
                  onClick={() => {
                    setDays(day.value);
                    setflag(false);
                  }}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default CoinInfo