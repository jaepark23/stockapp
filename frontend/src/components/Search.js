import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import Graph from "./Graph";
import axios from "axios"
const API_KEY = 'cb6avbiad3i70tu62u4g'
function Search( {handleSearch, ticker, length, quote}) {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [companyInfo, setCompanyInfo] = useState({})
  
  function getBusinessDates() {
    if(length === 1) {
      var startDate = new Date()
      Date.parse(startDate.setDate(startDate.getDate() - length))
      var endDate = new Date()

      while(true) {
        var weekDay = endDate.getDay()
        if(weekDay != 0 && weekDay != 6) { // not a weekend
          break;
        }
        else {
          startDate.setDate(startDate.getDate() - length)
          endDate.setDate(endDate.getDate() - length)
        }
      }
    }
    else {
      var startDate = new Date()
      Date.parse(startDate.setDate(startDate.getDate() - length))
      var endDate = new Date()
    }
    return [startDate, endDate]
  }
  
  useEffect(() => {
    console.log('comapnyInfo: ' + companyInfo)
    axios
    .get(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${API_KEY}`)
    .then(function (response) {
      if(Object.keys(response.data).length === 0 && ticker.length > 0) {
        setCompanyInfo({'nothing': 1})
      }else {
        setCompanyInfo(response.data)
      }
    });
  }, [ticker])
  return (
    <div className="col-md-12" id="graph-col">
      <div
        className="card border-primary mb-3"
        id="graph-col"
        style={{
          width: "100%",
          backgroundColor: '#E0E0E0'
        }}
      >
        <div class="card-header">
          <h3 className = 'roboto' style={{fontWeight: 'bold'}}> Graph & Info </h3>
        </div>
        <div className="row">
          <form onSubmit={handleSearch}>
              {Object.keys(companyInfo).length > 1 && <p className = "fs-3 ps-2 pt-3 roboto" > {companyInfo['name']} ({companyInfo['country']}) </p>}
              {Object.keys(companyInfo).length === 1 && <p className = "fs-3 ps-2 pt-3 roboto" > {ticker.toUpperCase()} </p> }
              {Object.keys(quote).length > 0 && <p className = "fs-4 ps-2 roboto" id = 'percent' > ${quote['c']}</p>}
              {quote['dp'] < 0 && <p className = "fs-6 text-danger" id = 'percent' > ({quote['dp']}%) </p>}
              {quote['dp'] > 0 && <p className = "fs-6 text-primary" id = 'percent'> ({quote['dp']}%) </p>}
            {ticker && <Graph ticker={ticker} length={length} getBusinessDates = {getBusinessDates} />}
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="InputTicker" className="col-form-label ps-2 roboto">
                  Ticker
                </label>
              </div>
              <div className="col-auto">
                <input
                  type="ticker"
                  className="input-btn-focus-box-shadow roboto"
                  id="InputTicker"
                ></input>
              </div>
              <div className="col-auto">
                <span id="TickerHelper" className="form-text roboto">
                  Enter ticker symbol{" "}
                </span>
              </div>
            </div>
            <div class=" m-1 form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="trade"
                id="1D"
              ></input>
              <label className="form-check-label roboto" for="flexRadioDefault2">
                1D
              </label>
            </div>
            <div class=" m-1 form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="trade"
                id="1W"
              ></input>
              <label className="form-check-label roboto" for="flexRadioDefault2">
                1W
              </label>
            </div>
            <div class=" m-1 form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="trade"
                id="1M"
              ></input>
              <label class="form-check-label roboto" for="flexRadioDefault2">
                1M
              </label>
            </div>
            <div class=" m-1 form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="trade"
                id="1Y"
              ></input>
              <label class="form-check-label roboto" for="flexRadioDefault2">
                1Y
              </label>
            </div>
            <div class=" m-1 form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="trade"
                id="5Y"
              ></input>
              <label class="form-check-label roboto" for="flexRadioDefault2">
                5Y
              </label>
            </div>
            <button type="submit" className=" m-1 btn btn-primary btn-sm roboto">
              Show Graph
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Search;
