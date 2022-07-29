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
    <div className="col-md-12">
      <div className="search-wrapper">
        <div className="row">
          <div className="col-md-6">
            <div className="card border-primary mb-3" id="search-col">
              <div class="card-header">
                <h3> Stock Lookup </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label htmlFor="InputTicker" className="col-form-label">
                      Ticker:{" "}
                    </label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="ticker"
                      className="input-btn-focus-box-shadow"
                      id="InputTicker"
                    ></input>
                  </div>
                  <div className="col-auto">
                    <span id="TickerHelper" className="form-text">
                      Enter ticker symbol{" "}
                    </span>
                  </div>
                </div>

                <div className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label htmlFor="InputTicker" className="col-form-label">
                      Date From:{" "}
                    </label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="ticker"
                      className="input-btn-focus-box-shadow"
                      id="InputTicker"
                    ></input>
                  </div>
                  <div className="col-auto">
                    <span id="TickerHelper" className="form-text">
                      Enter Date From{" "}
                    </span>
                  </div>
                </div>

                <div className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label htmlFor="InputTicker" className="col-form-label">
                      Date To:{" "}
                    </label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="ticker"
                      className="input-btn-focus-box-shadow"
                      id="InputTicker"
                    ></input>
                  </div>
                  <div className="col-auto">
                    <span id="TickerHelper" className="form-text">
                      Enter Date To
                    </span>
                  </div>
                  <button type="submit" className="btn btn-primary ">
                    Show Graph
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-md-6" id="graph-col">
            <div
              className="card border-primary mb-3"
              id="graph-col"
              style={{
                width: "100%",
              }}
            >
              <div class="card-header">
                <h3> Graph & Info </h3>
              </div>
              <Graph ticker={ticker} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
