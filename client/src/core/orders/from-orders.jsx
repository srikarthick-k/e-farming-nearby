// Display orders given by you
// Display orders based on customerID

import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FromOrder = () => {
  const [orders, setOrders] = useState([]);
  const { uid } = useParams();

  const onRender = async () => {
    try {
      const response = await fetch(`http://localhost:4000/from-orders/${uid}`);
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
        <h1>From Orders</h1>
        <table>
          <thead>
            <tr>
              <th>Product-Name |</th>
              <th>Quantity |</th>
              <th>Total-Price |</th>
              <th>City |</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {/* Do backend design and comeback */}
            {orders.map((order) => (
              <tr key={order.productid}>
                <td>{order.pname}</td>
                <td>{order.quantity}</td>
                <td>{order.quantity * order.price + order.deliverycharge}</td>
                <td>{order.city}</td>
                <td>{order.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
      {/* <button>Update</button> */}
    </Fragment>
  );
};

export default FromOrder;

{
  /* qty from order */
}
{
  /* price from product */
}
{
  /* dcharge from product */
}
