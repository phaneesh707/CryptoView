import { createTheme, ThemeProvider} from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../../config/config";
import { CryptoState } from "../../CryptoContext";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import {useNavigate} from "react-router-dom"
import { numberWithCommas } from "../Banner/Carousel";
import { updateCurrentUser } from "firebase/auth";


const CoinsTable = () => {
  
  const [loading, setLoading] = useState(false);
  const [search,setSearch] = useState("");
  const [page,setPage] = useState(1);
  const { currency,symbol,coins,setCoins } = CryptoState();
  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

    const darkTheme = createTheme({
      palette: {
        mode: "dark",
      },
    });


  const handleSearch = () =>{
    return coins.filter(coin=>{
      return coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    })
  }
  

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ margin: 4, fontFamily: "Montserrat", color: "white" }}
        >
          Cryptocurrency Prices By Market Cap
        </Typography>

        <TextField
          variant="outlined"
          label="Search for a cryptocurrency ... "
          sx={{
            marginBottom: 5,
            width: "100%",
            color: "white",
            input: { color: "white" },
          }}
         
          onChange={(e) => setSearch(e.target.value)}
        ></TextField>

        <TableContainer>
          {loading ? (
            <LinearProgress sx={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead
                sx={{ backgroundColor: "#EEBC1D", fontFamily: "Montserrat" }}
              >
                <TableRow>
                  {["Coins", "Prices", "24h Change", "Market Cap"].map(
                    (head) => (
                      <TableCell
                        sx={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                        align={head === "Coins" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        sx={{
                          backgroundColor: "#16171a",
                          cursor: "pointer",
                          fontFamily: "Montserrat",
                          "&:hover": {
                            backgroundColor: "#131111",
                          },
                        }}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                color: "white",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell
                          align="right"
                          style={{
                            color: "white",
                          }}
                        >
                          {currency==="INR"?"₹":"$"}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: "white",
                          }}
                        >
                          {currency==="INR"?"₹":"$"}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          sx={{
            padding: 5,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": {
              color: "gold",
            },
            
          }}
          
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
