// Display orders to be served
// Display orders based on selleriD

import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { Button } from "@mui/material";

const ToOrder = () => {
  const [orders, setOrders] = useState([]);
  const [deliverylocation, setDeliveryLocation] = useState("");
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

  const getDefaultCity = async () => {
    try {
      const response = await fetch(`http://localhost:4000/userinfo/${uid}`);
      const jsonData = await response.json();
      setDeliveryLocation(jsonData[0].city);
    } catch (err) {
      console.error(err.message);
    }
  };

  const delivered = async (orderid) => {
    try {
      await fetch(`http://localhost:4000/deleteorder/${orderid}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err.message);
    }
    setOrders(orders.filter((order) => order.orderid !== orderid));
  };

  useEffect(() => {
    onRender();
    getDefaultCity();
  }, []);

  return (
    <Fragment>
      <center>
        <Navbar uid={uid} deliverylocation={deliverylocation} />
        <h1>Orders To You</h1>
        {orders[0] ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>CUSTOMER-NAME</TableCell>
                  <TableCell>PRODUCT-NAME</TableCell>
                  <TableCell>QUANTITY</TableCell>
                  <TableCell>TOTAL-PRICE</TableCell>
                  <TableCell>CITY</TableCell>
                  <TableCell>ADDRESS</TableCell>
                  <TableCell>DELIVERED</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow className="trow" key={order.productid}>
                    <TableCell>{order.cname}</TableCell>
                    <TableCell>{order.pname}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>
                      {order.quantity * order.price + order.deliverycharge}
                    </TableCell>
                    <TableCell>{order.city}</TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell>
                      <Button onClick={() => delivered(order.orderid)}>
                        DELIVERED
                      </Button>
                    </TableCell>
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

export default ToOrder;
