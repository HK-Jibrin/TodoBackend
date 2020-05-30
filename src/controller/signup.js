const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sql = require("../database/db");
const signupValidation = require("../model/signupValidation");

const signup = (req, res) => {
  // destructuring
  const { first_name, last_name, email, password, Admin } = req.body;
  const user = {
    first_name,
    last_name,
    email,
    password,
    Admin,
  };
  const { error } = signupValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const emailExist = "SELECT  COUNT( * ) AS count FROM users WHERE email = ?";
  sql.query(emailExist, [email], (err, results, fields) => {
    if (err) {
      res.send(err);
    } else {
      if (results[0].count > 0) {
        res.status(400).send({
          message: "Email Already Exist",
        });
      } else {
        bcrypt.hash(user.password, 10, (err, hash) => {
          if (err) {
            console.log(err);
          } else {
            user.password = hash;
            const saveNewUser = "INSERT INTO users SET ?";
            sql.query(saveNewUser, user, (error, results, fields) => {
              if (error) {
                return res.send(error);
              } else {
                user.userId = results.insertId;
                const token = jwt.sign(user, process.env.TOKEN_SECRET, {
                  // expiresIn: "3600s" // 1min
                });
                res.cookie("token", token);
                res.status(201).json({
                  user,
                  token,
                  message: "account created Successfully",
                });
              }
            });
          }
        });
      }
    }
  });
};

module.exports = signup;