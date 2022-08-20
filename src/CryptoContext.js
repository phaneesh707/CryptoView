import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from './firebase';

const Crypto = createContext();

const CryptoContext = ({children}) => {

    const [currency,setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");
    const [coins, setCoins] = useState([]);
    const [user,setUser] = useState(null);
    const [watchlist,setWatchlist] = useState([])
    const [alert,setAlert] = useState({
      open:false,
      message:"",
      type:"success"
    })

    useEffect(() => {
      if(user){
        const coinRef = doc(db,"watchlist",user.uid);
        var unsubscribe = onSnapshot(coinRef,coin=>{
          if(coin.exists())
          setWatchlist(coin.data().coins);
          else
          console.log("No items in watchlist");
        })
        return () => {
          unsubscribe();
        };
    
      }
      
    }, [user])
    

    useEffect(() => {
      onAuthStateChanged(auth,(user)=>{
        if(user)
          setUser(user);
        else
          setUser(null);
      })
      
    }, [])
    
    useEffect(() => {
      if(currency ==="INR")
        setSymbol("₹");
       else if(currency==="USD");
        setSymbol('$');
    }, [currency])

  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        alert,
        setAlert,
        user,
        watchlist,
        coins,
        setCoins
      }}
    >
      {children}
    </Crypto.Provider>
  );
}

export default CryptoContext;


export const CryptoState = () =>{
    return useContext(Crypto);
}