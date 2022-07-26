import { createContext, useState, useEffect, useRef } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  var HashMap = require("hashmap");
  const [prices, setPrices] = useState(new Map());
  const [shares, setShares] = useState([]);
  const [balance, setBalance] = useState(0);
  const [spendingBalance, setSpendingBalance] = useState(0);
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(false);
  const history = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch(`http://127.0.0.1:8000/api/token/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history("/");
    } else {
      alert("Something went wrong");
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    setBalance(null);
    setSpendingBalance(null);
    localStorage.removeItem("authTokens");
  };

  let updateToken = async () => {
    console.log("update token called");
    let response = await fetch(`http://127.0.0.1:8000/api/token/refresh`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens.refresh }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
  };

  let registerUser = async (e) => {
    e.preventDefault();
    let response = await fetch(`http://127.0.0.1:8000/api/token/register/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
        password2: e.target.password2.value,
        balance: e.target.balance.value,
      }),
    });
    if (response.status === 201) {
      console.log("successful");
      history("/");
    } else {
      console.log("error try again");
    }
  };

  let getShares = async () => {
    if (user) {
      let response = await fetch("http://127.0.0.1:8000/api/shares/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      let data = await response.json();
      setShares(data); 
      getPrices(data); // ^^ after retrieval of shares from API, update share list and prices of each share
    }
  };

  let buyShare = async (e) => {
    e.preventDefault();
    let response = await fetch(
      `http://127.0.0.1:8000/api/shares/buy/${e.target.ticker.value}/${e.target.count.value}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();
    getShares(); //update shares upon purchase of share
    setSpendingBalance(data); 
  };

  let sellShare = async (e) => {
    e.preventDefault();
    let response = await fetch(
      `http://127.0.0.1:8000/api/shares/sell/${e.target.ticker.value}/${e.target.count.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();
    getShares(); //update shares upon purchase of share
    setSpendingBalance(data);
  };

  let getPrices = async (shares) => {
    var counter = 0;
    if (shares.length == 0) {
      setBalance(counter);
    } else {
      for (const share of shares) {
        const response = await axios.get(
          `http://127.0.0.1:8000/data/${share.ticker}`
        );
        var addition = Math.round(response.data["c"] * 100 * share.count) / 100;
        counter += addition;
        setPrices(
          (map) =>
            new Map(
              map.set(
                share.id.toString(),
                Math.round(response.data["c"] * 100) / 100
              )
            )
        );
        setBalance(counter);
      }
    }
  };
  // getBalance is for account balance
  let getBalance = async () => {
    if (authTokens) {
      let response = await fetch("http://127.0.0.1:8000/api/account", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      let data = await response.json();
      setSpendingBalance(data.balance); 
    }
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    shares: shares,
    balance: balance,
    prices: prices,
    spendingBalance: spendingBalance,
    loginUser: loginUser,
    logoutUser: logoutUser,
    registerUser: registerUser,
    sellShare: sellShare,
    buyShare: buyShare,
  };
  // refresh token every 4 minutes
  useEffect(() => {
    let minutes = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, minutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  //upon login, reset the shares and balance of the user's portfolio
  useEffect(() => {
    getShares();
    getBalance();
  }, [user]);

  //
  // useEffect(() => {
  //     getPrices(shares);
  // }, [shares])

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
