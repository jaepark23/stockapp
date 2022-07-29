import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import OrderHistory from "../components/OrderHistory";
import SideBar from "../components/SideBar";
import Search from "../components/Search";
function TradePage() {
  let { authTokens } = useContext(AuthContext);
  const [history, setHistory] = useState({});

  let getHistory = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/account/history", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    setHistory(data);
  };

  useEffect(() => {
    getHistory();
    console.log("yes");
    console.log(history);
  }, [authTokens]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 px-1 position-fixed" id="sidebar">
          <SideBar />
        </div>
        <div className="col-md-10 offset-2" id="main">
          <div className="padding-top"></div>
          <div className="row">
            <Search />
          </div>
          <div className="padding-between"></div>
          <div className="row">
            <OrderHistory orders={history} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradePage;
