import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import Order from "./Order";

function OrderHistory({ orders }) {
  let { user } = useContext(AuthContext);
  return (

    <div className="col-md-12">
      <div className="card border-primary mb-3" style={{ backgroundColor: '#E0E0E0' }}>
        <div class="card-header">
          <h3 className='roboto' style={{ fontWeight: 'bold' }}> Order History </h3>
          {/* <h3> ${balance} ${spendingBalance} </h3> */}
        </div>
        <div className="order-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className='roboto'>Date</th>
                <th scope="col" className='roboto'>Ticker</th>
                <th scope="col" className='roboto'>Count</th>
                <th scope="col" className='roboto'>Price</th>
                <th scope="col" className='roboto'>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
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
