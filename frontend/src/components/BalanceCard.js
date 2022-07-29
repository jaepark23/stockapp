import React, { useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

function BalanceInfo() {
  let { balance, spendingBalance } = useContext(AuthContext);
  return (
    <div className="col-md-7">
      <div className="card border-primary mb-3">
        <div class="card-header">
          <h3> Balance Information </h3>
        </div>
        <div className="row ">
          <div className="col-md-6 text-center">
            Stock Balance
            <h3> ${balance} </h3>
          </div>
          <div className="col-md-6 text-center">
            Account Balance
            <h3> ${spendingBalance} </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 text-center">
            Today's Growth
            <h3> %{} </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceInfo;
