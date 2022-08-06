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

//3. Post product
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
      uid
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
// Working fine
// In frontend The seller shouldn't have access to post prating

// Get category:
// Fetches categories based on delivery location without repeatition
app.get("/category/:deliverylocation", async (req, res) => {
  try {
    const { deliverylocation } = req.params;
    const category = await pool.query(
      "SELECT category FROM product WHERE deliverylocation = $1 GROUP BY category HAVING COUNT(*) >= 1;",
      [deliverylocation]
    );
    if (category.rowCount === 0) {
      return res.status(404).json(category.rows);
    }
    return res.json(category.rows);
  } catch (err) {
    console.error(err.message);
  }
});

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
// 4. View Product (All and Individual)
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
app.post("/order", async(req, res)=>{
  try {
    const {pid, uid, qty, price, address} = req.body;
    const seller = await pool.query("SELECT sellerid, deliverylocation FROM product WHERE id=$1", [pid])
    const order = await pool.query("INSERT INTO ORDERS (sellerid, customerid, productid, quantity, price, city, address) VALUES ($1, $2, $3, $4, $5, $6, $7)", [ seller.rows[0].sellerid, uid, pid, qty, price, seller.rows[0].deliverylocation, address])
    return res.json(true);
  } catch (err) {
    console.error(err.message);
  }
})



// @Low priority
// 5. Update Product
// 6. Delete Product

// Reference

// // get a todo
// app.get("/todo/:id", async(req,res)=>{
//     try {
//         const {id} = req.params
//         const printodo = await pool.query("SELECT *FROM todo WHERE id=$1", [id])
//         res.json(printodo.rows)
//     } catch (err) {
//         console.error(err.message);
//     }
// })
// // update a todo
// app.put("/todo/:id", async(req, res)=>{
//     const {id} = req.params
//     const {descript} = req.body
//     try {
//         await pool.query("UPDATE todo SET descript=$1 WHERE id=$2", [descript, id])
//         res.json("Successfully Updated")
//     } catch (err) {
//         console.error(err.message);
//     }
// })
// // delete a todo
// app.delete("/todo/:id", async(req, res)=>{
//     const {id} = req.params;
//     try {
//          await pool.query("DELETE FROM todo WHERE id = $1", [id])
//         res.json("Successfully Deleted")
//     } catch (err) {
//         console.error(err.message);
//     }
// })

app.listen(4000, () => {
  console.log("server started at port 4000");
});
