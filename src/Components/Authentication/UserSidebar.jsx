import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { CryptoState } from "../../CryptoContext";
import Avatar from "@mui/material/Avatar";
import { display } from "@mui/system";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../Banner/Carousel";
import {AiFillDelete} from "react-icons/ai"
import { deleteDoc, doc, setDoc } from "firebase/firestore";

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });
  const {user,setAlert,watchlist,coins,symbol} = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

const removeFromWatchlist = async (coin) => {
  const coinRef = doc(db, "watchlist", coin.id);
  try {
    const coinRef = doc(db, "watchlist", user.uid);
    
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
};

  const logout = () =>{
    signOut(auth);
    setAlert({
        open:true,
        type:"success",
        message:"Logout successful"

    })
    toggleDrawer();
  }

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            alt={user.displayName || user.email}
            src={user.photoURL}
            onClick={toggleDrawer(anchor, true)}
            sx={{
              height: 38,
              width: 38,
              marginLeft: 5,
              curson: "pointer",
              backgroundColor: "#EEBC1d",
            }}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "350px",
                height: "100%",
                padding: 10,
                fontFamily: "Montserrat",
              }}
            >
              <div style={{
                flex:1,
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                gap:"20px",
                height:"92%"
              }}>
                <Avatar
                  alt={user.displayName || user.email}
                  src={user.photoURL}
                  sx={{
                    height: 200,
                    width: 200,
                    curson: "pointer",
                    backgroundColor: "#EEBC1d",
                    objectFit:"contain"
                  }}
                />
                <span style={{
                    width:"100%",
                    fontSize:25,
                    marginTop:10,
                    textAlign:"center",
                    fontWeight:"bolder",
                    wordWrap:"break-word"
                }}>
                    {user.displayName || user.email}
                </span>
                <div style={{
                    flex:1,
                    width:"100%",
                    backgroundColor:"grey",
                    marginBottom:10,
                    borderRadius:10,
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    gap:12,
                    overflowY:"scroll"
                }}>
                    Wathchlist
                {coins.map(coin=>{
                    if(watchlist.includes(coin.id))
                        return (
                          <div
                            style={{
                              padding: 10,
                              borderRadius: 5,
                              color: "black",
                              width: "90%",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              backgroundColor: "#EEBC1D",
                              boxShadow: "0 0 3px black",
                            }}
                          >
                            <span>{coin?.name}</span>
                            <span
                              style={{
                                display: "flex",
                                gap: 8,
                              }}
                            >
                              {Symbol}
                              {numberWithCommas(coin.current_price.toFixed(2))}
                              <AiFillDelete
                                style={{ cursor: "pointer" }}
                                fontSize="16"
                                onClick={() => removeFromWatchlist(coin)}
                              />
                            </span>
                          </div>
                        );
                })}
                </div>
              </div>
              <Button
                sx={{
                    backgroundColor:"#EEBC1D",
                    color:"white",
                    height:"8%",
                    width:"100%"  
                }}
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
