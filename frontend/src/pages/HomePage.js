import React, { useState, useEffect, useContext, Fragment } from "react";
import AuthContext from "../context/AuthContext";
import SideBar from "../components/SideBar";
import News from "../components/News";
import Search from "../components/Search";
import Portfolio from "../components/Portfolio";
import BalanceCard from "../components/BalanceCard";
import Trade from "../components/Trade"
import TopBar from "../components/TopBar"

const HomePage = () => {
  let [shares, setShares] = useState([]);
  let { authTokens, user } = useContext(AuthContext);

  return (
    <div className="container-fluid container-nav" id="homepage">
      <div className="row">
        <TopBar />
      </div>
      <div className="padding-top"></div>
      <main class>
        <div className="row">
          <Portfolio shares={shares} />
          <News />
        </div>
        <div className="padding-between"></div>
        <div className="row">
          <BalanceCard />
          <Trade />
        </div>
      </main>
    </div>
  );
};

export default HomePage;

{
  /* <div>
<p>Testing123</p>
<ul>
    {shares.map(share => (
        <li key = {share.id}> {share.ticker} {share.count} </li>
    ))}
</ul>
</div> */
}
