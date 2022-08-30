import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios"
const API_KEY = 'cb6avbiad3i70tu62u4g'
function Information( {ticker, quote} ) {
  const [data, setData] = useState({})
  let getFinancials = async () => {
    axios.get(`https://finnhub.io/api/v1/stock/metric?symbol=${ticker}&metric=all&token=${API_KEY}`)
    .then(function (response) {
      setData(response.data['metric'])
    })
  }
  useEffect(() => {
    getFinancials()
  }, [ticker])

  return (
    <div className="col-md-12" id="information">
      <div className="card border-primary mb-3" style = {{backgroundColor: '#E0E0E0'}}>
        <div class="card-header">
          <h3 className = 'roboto' style={{fontWeight: 'bold'}}> Information </h3>
        </div>
        <div className ='information-wrapper'>
          <div className = "row">
            <div className="col-md-4 text-center">
              <b className="roboto"> Open </b>
              <h3 className = "roboto"> ${quote['o']}</h3>
            </div>
            <div className="col-md-4 text-center">
            <b className="roboto"> High </b>
              <h3 className = "roboto"> ${quote['h']}</h3>
            </div>
            <div className="col-md-4 text-center">
            <b className="roboto"> Low </b>
              <h3 className="roboto"> ${quote['l']}</h3>
            </div>
          </div>
          <div className = "row">
            <div className="col-md-4 text-center">
            <b className="roboto"> P/E Ratio </b>
              <h3 className="roboto"> ${data['peExclExtraAnnual']}</h3>
            </div>
            <div className="col-md-4 text-center">
            <b className="roboto"> EPS </b>
              <h3 className="roboto"> ${data['epsInclExtraItemsTTM']}</h3>
            </div>
            <div className="col-md-4 text-center">
            <b className="roboto"> Div Yield </b>
              <h3 className="roboto"> {data['currentDividendYieldTTM']}%</h3>
            </div>
          </div>
          <div className = "row">
            <div className="col-md-4 text-center">
            <b className="roboto"> 52W High </b>
              <h3 className="roboto"> ${data['52WeekHigh']}</h3>
            </div>
            <div className="col-md-4 text-center">
            <b className="roboto"> 52W Low </b>
              <h3 className="roboto"> ${data['52WeekLow']}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
