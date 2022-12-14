const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const { query } = require("express");

//1. Registration: /auth/register
router.post("/register", async (req, res) => {
  try {
    const { username, email, phone, city, password } = req.body;

    // checking for existing email in database
    const user = pool.query("select *from accounts where email = $1", [email]);
    if (await user.rows) {
      return res.status(401).json("Email Already exists");
    }

    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // Save to database
    const result = await pool.query(
      "INSERT INTO accounts(username, email, phone, city, password) values ($1, $2, $3, $4, $5) RETURNING id",
      [username, email, phone, city, bcryptPassword]
    );
    return res.json(result);
  } catch (err) {
    console.error(err.message);
  }
});

//2. Login: /auth/login
router.post("/login", async (req, res) => {
  try {
    // destructure the data email and password
    const { email, password } = req.body;

    // check for email in DB (if not present throw an error code)
    const checkEmailAvailablity = await pool.query(
      "select * from accounts where email = $1",
      [email]
    );
    if (checkEmailAvailablity.rowCount === 0) {
      return res.status(401).json("email not found ");
    }

    // check for valid password by comparing encrypted password (in DB) with non-encrypted password (in req.json)
    const isValidPassword = await bcrypt.compare(
      password,
      checkEmailAvailablity.rows[0].password
    );
    if (!isValidPassword) {
      return res.status(401).json("Invalid Email");
    }
    return res.status(200).json(checkEmailAvailablity.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;