const Pool = require("pg").Pool

const pool = new Pool({
    user:"postgres",
    password:"2fb4cac9",
    host:"localhost",
    port:5432,
    database:"efarm"
})

module.exports = pool