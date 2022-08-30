import React, { useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

function BalanceInfo() {
  let { balance, spendingBalance, growth } = useContext(AuthContext);

  return (
    <div className="col-md-7 ">
      <div className="card border-primary mb-3" style = {{backgroundColor: '#E0E0E0'}}>
        <div class="card-header" >
          <h3 className = 'roboto' style={{fontWeight: 'bold'}}> Balance Information </h3>
        </div>
        <div className="balance-wrapper">
          <div className="row ">
            <div className="col-md-6 text-center">
              <b className = "roboto"> Stock Balance </b>
              <h3 className = "roboto"> ${balance} </h3>
            </div>
            <div className="col-md-6 text-center">
            <b className = "roboto"> Account Balance </b>
              <h3 className = "roboto"> ${spendingBalance} </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 text-center">
            <b className = "roboto"> Today's Growth </b>
              <h3 className = "roboto"> {growth}% </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceInfo;
