// Display orders given by you
// Display orders based on customerID

import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

// CSS
import "../../style.css";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const FromOrder = () => {
  document.title = "Orders from you";
  const [orders, setOrders] = useState([]);
  const uid = localStorage.getItem("uid");

  const onRender = async () => {
    try {
      const response = await fetch(`/from-orders/${uid}`);
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
      <Navbar />
      <center>
        <h1>Orders From You</h1>

        {orders[0] ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>SELLER-NAME</TableCell>
                  <TableCell>PRODUCT-NAME</TableCell>
                  <TableCell>QUANTITY</TableCell>
                  <TableCell>TOTAL-PRICE (in INR)</TableCell>
                  <TableCell>CITY</TableCell>
                  <TableCell>ADDRESS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow className="trow" key={order.productid}>
                    <TableCell>{order.sname}</TableCell>
                    <TableCell>{order.pname}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>
                      {order.quantity * order.price + order.deliverycharge}
                    </TableCell>
                    <TableCell>{order.city}</TableCell>
                    <TableCell>{order.address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <h1>No orders shop more</h1>
        )}
      </center>
    </Fragment>
  );
};

export default FromOrder;
