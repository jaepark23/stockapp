import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Graph from "./Graph";

function Search() {
  const [ticker, setTicker] = useState("");
  let { sellShare, buyShare } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    setTicker(e.target[0].value);
  }

  return (
    <div className="col-md-12 border ">
      <div className="row">
        {/* <div className = "col-md-7">
          <form onSubmit={handleSubmit}> 
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="InputTicker" className="col-form-label">Ticker: </label>
            </div>
            <div className="col-auto">
              <input type="ticker" className= "input-btn-focus-box-shadow"  id="InputTicker"></input>
            </div>
            <div className="col-auto">
              <span id="TickerHelper" className="form-text">Enter ticker symbol </span>
            </div>
          </div>

          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="InputTicker" className="col-form-label">Date From: </label>
            </div>
            <div className="col-auto">
              <input type="ticker" className= "input-btn-focus-box-shadow"  id="InputTicker"></input>
            </div>
            <div className = 'col-auto'> 
              <span id="TickerHelper" className="form-text">Enter Date From </span>
            </div>  
          </div>

          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="InputTicker" className="col-form-label">Date To: </label>
            </div>
            <div className="col-auto">
              <input type="ticker" className= "input-btn-focus-box-shadow"  id="InputTicker"></input>
            </div>
            <div className="col-auto">
              <span id="TickerHelper" className="form-text">Enter Date To</span>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
            
          <div className="row g-3 align-items-center">
            <div className = "col-auto">
              <input type="ticker" className= "input-btn-focus-box-shadow" id="InputTicker"></input>
            </div>
            <div className = "col-auto">
              <button type="buy" className="btn btn-primary">Buy</button> 
            </div>
            <div className = "col-auto">
            </div>
          </div>
          </form>
        </div> */}

        <form onSubmit={sellShare}>
          <input
            type="ticker"
            className="input-btn-focus-box-shadow"
            id="ticker"
          ></input>
          <input
            type="count"
            className="input-btn-focus-box-shadow"
            id="count"
          ></input>
          <button type="sell" className="btn btn-primary">
            Sell
          </button>
        </form>
        <form onSubmit={buyShare}>
          <input
            type="ticker"
            className="input-btn-focus-box-shadow"
            id="ticker"
          ></input>
          <input
            type="count"
            className="input-btn-focus-box-shadow"
            id="count"
          ></input>
          <button type="sell" className="btn btn-primary">
            Buy
          </button>
        </form>
        <div className="col-md-5 border" id="graph-col">
          <div className="graph-container">
            <Graph ticker={ticker} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
