import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import Share from "./Share";
import axios from "axios";
import AuthContext from "../context/AuthContext";

// states are immutable objects and cannot be changed thus they must be recreated if want to be modified
function Portfolio({}) {
  let { user, shares, balance, prices, spendingBalance } =
    useContext(AuthContext);

  function getPrice(id) {
    return prices.get(id.toString());
  }

  return (
    <div className="col-md-7">
      <div className="card border-primary mb-3">
      <div class="card-header"> 
        <h3> Portfolio </h3>
        {/* <h3> ${balance} ${spendingBalance} </h3> */}
      </div>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Count</th>
              <th scope="col">Ticker</th>
              <th scope="col">Price</th>
              <th scope="col">Graph</th>
            </tr>
          </thead>
          <tbody>
            {user &&
              shares.map((share) => (
                <Share
                  key={share.id}
                  share={share}
                  price={getPrice(share.id)}
                />
              ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

export default Portfolio;
