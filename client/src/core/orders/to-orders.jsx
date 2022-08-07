// Display orders to be served
// Display orders based on selleriD

import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
const ToOrder = () => {
  const [orders, setOrders] = useState([]);
  const { uid } = useParams();

  const onRender = async () => {
    try {
      const response = await fetch(`http://localhost:4000/to-orders/${uid}`);
      const jsonData = await response.json();
      setOrders(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    onRender();
  }, []);

  return (
    <Fragment>
      <center>
        <h1>To Orders</h1>
        {orders[0] ? (
          <table>
            <thead>
              <tr>
                <th>Customer-Name |</th>
                <th>Product-Name |</th>
                <th>Quantity |</th>
                <th>Total-Price |</th>
                <th>City |</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.productid}>
                  <td>{order.cname}</td>
                  <td>{order.pname}</td>
                  <td>{order.quantity}</td>
                  <td>{order.quantity * order.price + order.deliverycharge}</td>
                  <td>{order.city}</td>
                  <td>{order.address}</td>
                  <td>
                    <button>Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1>No orders shop more</h1>
        )}
      </center>
    </Fragment>
  );
};

export default ToOrder;
