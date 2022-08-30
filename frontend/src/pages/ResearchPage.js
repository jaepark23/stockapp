import React, { useContext, useEffect, useState } from "react";
import Search from "../components/Search";
import SideBar from "../components/SideBar";
import AuthContext from "../context/AuthContext";
import Information from "../components/Information";
import axios from "axios"

const API_KEY = 'cb6avbiad3i70tu62u4g'

function ResearchPage() {
  let { handleTrade } = useContext(AuthContext);
  const [ticker, setTicker] = useState("");
  const [length, setLength] = useState(0); // in days
  const [quote, setQuote] = useState({})

  function handleSearch(e) {
    e.preventDefault();
    const localTicker = e.target[0].value
    setTicker(e.target[0].value);
    if (e.target.trade[0].checked) {
      setLength(1);
    } else if (e.target.trade[1].checked) {
      setLength(7);
    } else if (e.target.trade[2].checked) {
      setLength(30);
    } else if(e.target.trade[3].checked) {
      setLength(365);
    } else if(e.target.trade[4].checked) {
      setLength(1825)
    }
    axios.get(`https://finnhub.io/api/v1/quote?symbol=${localTicker}&token=${API_KEY}`)
    .then(function(response) {
      setQuote(response.data)
    })
  }

  return (
    <div className="container-fluid container-nav">
      <div className="row">
        <div className="col-md-2 px-0 position-fixed" id="sidebar">
          <SideBar />
        </div>
        <div className="col-md-10 offset-2">
        <div className="padding-top"></div>
          <div className="row">
            <Search handleSearch = {handleSearch} ticker = {ticker} length = {length} quote = {quote}/>
          </div>
          <div className="padding-between"></div>
          <div className="row">
            <Information ticker = {ticker} quote = {quote}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResearchPage;
