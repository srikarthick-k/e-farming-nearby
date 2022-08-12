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
import { Button } from "@mui/material";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const uid = localStorage.getItem("uid");

  const renderProducts = async () => {
    try {
      const response = await fetch(`http://localhost:4000/myproducts`, {
        headers: { uid: uid },
      });
      const jsonData = await response.json();
      console.log(jsonData);
      setProducts(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteProduct = async (productid) => {
    try {
      await fetch(`http://localhost:4000/deleteproduct/${productid}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err.message);
    }
    setProducts(products.filter((prod) => prod.id !== productid));
  };

  useEffect(() => {
    renderProducts();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <center>
        {products[0] ? (
          <div>
            <h1>My Products</h1>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Delivery location</TableCell>
                    <TableCell>Price per / </TableCell>
                    <TableCell>Minimum Quantity</TableCell>
                    <TableCell>Delivery Charge</TableCell>
                    <TableCell>Total Price</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((prod) => (
                    <TableRow className="trow" hover={true} key={prod.id}>
                      <TableCell>{prod.pname}</TableCell>
                      <TableCell>{prod.deliverylocation}</TableCell>
                      <TableCell>{prod.price}</TableCell>
                      <TableCell>{prod.minquantity}</TableCell>
                      <TableCell>{prod.deliverycharge}</TableCell>
                      <TableCell>{prod.price + prod.deliverycharge}</TableCell>
                      <TableCell>
                        <Button onClick={() => deleteProduct(prod.id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <h2>
            You can sell your farming products and your products will appear
            here
          </h2>
        )}
      </center>
    </Fragment>
  );
};

export default MyProducts;
