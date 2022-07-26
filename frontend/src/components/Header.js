import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import Portfolio from "./Portfolio";
import News from "./News";
import Search from "./Search";
function Header() {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 px-1 position-fixed" id="sidebar">
          <SideBar />
        </div>
        <div className="col-md-10 offset-2" id="main">
          <div className="padding-top"></div>
          <div className="row">
            <Portfolio />
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
}

export default Header;
