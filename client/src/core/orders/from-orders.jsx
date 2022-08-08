// Display orders given by you
// Display orders based on customerID

import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

// CSS
import "../../style.css"

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";


const FromOrder = () => {
  const [orders, setOrders] = useState([]);
  const [deliverylocation, setDeliveryLocation] = useState("")
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
  const getDefaultCity = async() =>{
    try {
      const response = await fetch(`http://localhost:4000/userinfo/${uid}`)
      const jsonData = await response.json();
      setDeliveryLocation(jsonData[0].city)
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    onRender();
    getDefaultCity();
  }, []);

  return (
    <Fragment>
      <Navbar uid={uid} deliverylocation={deliverylocation} />
        <h1>Orders From You</h1>

        {orders[0] ? (
          <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SELLER-NAME</TableCell>
                <TableCell>PRODUCT-NAME</TableCell>
                <TableCell>QUANTITY</TableCell>
                <TableCell>TOTAL-PRICE</TableCell>
                <TableCell>CITY</TableCell>
                <TableCell>ADDRESS</TableCell>
                <TableCell>UPDATE</TableCell>
                </TableRow>
          </TableHead>
          <TableBody>
              {orders.map((order) => (
                <TableRow 
                className="trow"
                key={order.productid}
                >
                  <TableCell>{order.sname}</TableCell>
                  <TableCell>{order.pname}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.quantity * order.price + order.deliverycharge}</TableCell>
                  <TableCell>{order.city}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>
                    <Button>UPDATE</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        ) : (
          <h1>No orders shop more</h1>
        )}
    </Fragment>
  );
};

export default FromOrder;
