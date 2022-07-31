const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json()); //used to access req.body

// Routes
app.use("/auth", require("./routes/jwtAuth"));
// create an Account

//3. Post product
app.post("/product", async (req, res) => {
  try {
    const {
      pname,
      category,
      unit,
      price,
      prating,
      deliverycharge,
      description,
      deliverylocation,
      minquantity,
      maxquantity,
    } = req.body;
    const product = pool.query(
      "INSERT INTO product(pname, category, unit, price, prating, deliverycharge, description, deliverylocation, minquantity, maxquantity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [
        pname,
        category,
        unit,
        price,
        prating,
        deliverycharge,
        description,
        deliverylocation,
        minquantity,
        maxquantity,
      ]
    );
    res.json(true);
  } catch (err) {
    console.error(err.message);
  }
});
// Working fine
// In frontend The seller shouldn't have access to post prating

// 4. View Product (All and Individual)
// individual product
app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query("SELECT * FROM product where id = $1", [
      id,
    ]);
    if (product.rowCount === 0) {
      return res.status(401).json("Product not found");
    }
    res.json(product.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
// get all products in category
app.get("/products/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const product = await pool.query(
      "SELECT * FROM product WHERE category = $1",
      [category]
    );
    if (product.rowCount === 0) {
      return res.status(401).json("No products in category");
    }
    return res.json(product.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get category:

app.get("/category", async (req, res) => {
  try {
    const { deliverylocation } = req.body;
    const category  = await pool.query(
      // "SELECT CATEGORY FROM PRODUCT WHERE DELIVERYLOCATION = $1",
      "SELECT category FROM product WHERE deliverylocation = $1 GROUP BY category HAVING COUNT(*) > 1;",
      [deliverylocation]
    );
    if (category.rowCount === 0) {
      return res.status(401).json("No products available in current location");
    }
    return res.json(category.rows);
  } catch (err) {
    console.error(err.message);
  }
});

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
