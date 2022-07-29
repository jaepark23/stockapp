import React from "react";

function Order({ time, order }) {
  return (
    <tr>
      <td> {time} </td>
      <td> {order.ticker}</td>
      <td> {order.count} </td>
      <td> {order.price} </td>
      <td> {order.buy ? "Buy" : "Sell"} </td>
    </tr>
  );
}

export default Order;
