import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

function Trade() {
  let { handleTrade } = useContext(AuthContext);
  const [buy, setBuy] = useState(true);
  return (
    <div className="col-md-5">
      <div className="card border-primary mb-3">
        <div className="card-header">
          <h3> Trade </h3>
        </div>
        <div className="row">
          <form onSubmit={handleTrade}>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="trade"
                id="buy"
                checked
              ></input>
              <label class="form-check-label" for="flexRadioDefault1">
                Buy
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="trade"
                id="sell"
              ></input>
              <label class="form-check-label" for="flexRadioDefault2">
                Sell
              </label>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Ticker</span>
              <input type="text" class="form-control" id="ticker"></input>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Count</span>
              <input type="text" class="form-control" id="count"></input>
            </div>
            <button type="submit" className="btn btn-primary ">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Trade;
