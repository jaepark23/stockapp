import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

function Trade() {
  let { handleTrade } = useContext(AuthContext);
  const [buy, setBuy] = useState(true);
  return (
    <div className="col-md-5">
      
        <div className="card border-primary mb-3" style = {{backgroundColor: '#E0E0E0'}}>
          <div className="card-header">
            <h3 className = 'roboto' style={{fontWeight: 'bold'}}> Trade </h3>
          </div>
          <div className="row">
          <div className="trade-wrapper">
            <form onSubmit={handleTrade}>
              <div class="input-group mb-3">
                <span class="input-group-text roboto">Ticker</span>
                <input type="text" class="form-control" id="ticker"></input>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text roboto">Count</span>
                <input type="text" class="form-control" id="count"></input>
              </div>
      
              <button
                type="submit"
                className=" m-1 btn btn-primary btn-sm roboto"
              >
                Order
              </button>
              <div class=" m-1 form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="trade"
                  id="buy"
                  checked
                ></input>
                <label class="form-check-label roboto" for="flexRadioDefault1">
                  Buy
                </label>
              </div>
              <div class=" m-1 form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="trade"
                  id="sell"
                ></input>
                <label class="form-check-label roboto" for="flexRadioDefault2">
                  Sell
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trade;
