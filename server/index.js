const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json()); //used to access req.body

// Routes
app.use("/auth", require("./routes/jwtAuth"));
// Register Account or login

app.get("/districts", async (req, res) => {
  try {
    const districts = await pool.query("SELECT * FROM DISTRICTS");
    return res.json(districts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/userinfo/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const info = await pool.query(
      "SELECT city from accounts where id = $1",
      [uid]
    );
    return res.json(info.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("deleteorder/:orderid", async(req, res)=>{
  try {
    const {orderid} = req.params;
     await pool.query("DELETE FROM orders WHERE orderid = $1", [orderid]); 
     res.json("Successfully deleted")
  } catch (err) {
    console.error(err.message);
  }
})

// Post product
app.post("/product", async (req, res) => {
  try {
    const {
      pname,
      category,
      unit,
      price,
      deliverycharge,
      description,
      deliverylocation,
      minquantity,
      maxquantity,
      uid,
    } = req.body;
    const product = pool.query(
      "INSERT INTO product(pname, category, unit, price, deliverycharge, description, deliverylocation, minquantity, maxquantity, sellerid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [
        pname,
        category,
        unit,
        price,
        deliverycharge,
        description,
        deliverylocation,
        minquantity,
        maxquantity,
        uid,
      ]
    );
    res.json(true);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/category", async (req, res) => {
  try {
    const defaultDistrict = req.header("defaultDistrict");
    const category = await pool.query(
      "SELECT category FROM product WHERE deliverylocation = $1 GROUP BY category HAVING COUNT(*) >= 1;",
      [defaultDistrict]
    );
    if (category.rowCount === 0) {
      return res.status(404).json(category.rows);
    }
    return res.json(category.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/categoryselect", async (req, res) => {
  try {
    const catType = await pool.query("SELECT * FROM category");
    return res.json(catType.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// View Product (All and Individual)
// get all products in category
app.get("/products/:category/:deliverylocation", async (req, res) => {
  try {
    const { category, deliverylocation } = req.params;
    const products = await pool.query(
      "SELECT * FROM product WHERE deliverylocation = $1 AND category = $2;",
      [deliverylocation, category]
    );
    if (products.rowCount === 0) {
      return res.status(401).json("No products in category");
    }
    return res.json(products.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// individual product
app.get("/product/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await pool.query("SELECT * FROM product where id = $1", [
      pid,
    ]);
    if (product.rowCount === 0) {
      return res.status(401).json("Product not found");
    }
    return res.json(product.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Place Order
app.post("/order", async (req, res) => {
  try {
    const { pid, uid, qty, price, address } = req.body;
    const product = await pool.query(
      "SELECT sellerid, deliverylocation, pname, deliverycharge FROM product WHERE id=$1",
      [pid]
    );
    const seller = await pool.query(
      "SELECT username from accounts where id = $1",
      [product.rows[0].sellerid]
    );
    const customer = await pool.query(
      "SELECT username from accounts where id = $1",
      [uid]
    );
    const order = await pool.query(
      "INSERT INTO ORDERS (sellerid, customerid, productid, cname, sname, pname, quantity, price, deliverycharge, city, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [
        product.rows[0].sellerid,
        uid,
        pid,
        customer.rows[0].username,
        seller.rows[0].username,
        product.rows[0].pname,
        qty,
        price,
        product.rows[0].deliverycharge,
        product.rows[0].deliverylocation,
        address,
      ]
    );
    return res.json(true);
  } catch (err) {
    console.error(err.message);
  }
});

// Display orders in customer side (cid)
app.get("/from-orders/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const order = await pool.query(
      "SELECT * FROM ORDERS WHERE customerid = $1",
      [uid]
    );
    return res.json(order.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/to-orders/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const order = await pool.query("SELECT * FROM ORDERS WHERE sellerid = $1", [
      uid,
    ]);
    return res.json(order.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/myproducts", async(req, res)=>{
  try {
    const uid = req.header("uid")
    const products = await pool.query("select * from product where sellerid = $1", [uid])
    return res.json(products.rows);
  } catch (err) {
    console.error(err.message); 
  }
})

app.delete(`/deleteproduct/:productid`, async(req, res)=>{
  try {
    const {productid} = req.params;
    await pool.query("delete from product where id = $1", [productid])
    return res.status(200)
  } catch (err) {
    console.error(err.message);
  }
})

app.listen(4000, () => {
  console.log("server started at port 4000");
});
