import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import SideBar from "../components/SideBar";
import News from "../components/News";
import Search from "../components/Search";
import Portfolio from "../components/Portfolio";

const HomePage = () => {
  let [shares, setShares] = useState([]);
  let { authTokens, user } = useContext(AuthContext);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 px-1 position-fixed" id="sidebar">
          <SideBar />
        </div>
        <div className="col-md-10 offset-2" id="main">
          <div className="padding-top"></div>
          <div className="row">
            <Portfolio shares={shares} />
            <News />
          </div>
          <div className="padding-between"></div>
          <div className="row">
            <Search />
          </div>
        </div>
      </div>
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
