import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import Order from "./Order";

function OrderHistory({ orders }) {
  let { user } = useContext(AuthContext);
  return (
    <div className="col-md-10">
      <div className="card border-primary mb-3">
        <div class="card-header">
          <h3> Order History </h3>
          {/* <h3> ${balance} ${spendingBalance} </h3> */}
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Ticker</th>
                <th scope="col">Count</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {user &&
                Object.entries(orders).map(([time, data]) => {
                  return <Order time={time} order={data} />;
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
