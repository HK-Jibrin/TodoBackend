const mysql = require("mysql");
require("dotenv").config();

var sql = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
});

sql.connect((err) =>{
    if(!err) {
        console.log("database connected !!!");
    }
    else{
        console.log(`Somthing went wrong !!!!! ${err}`);
    }
});
module.exports = sql;
