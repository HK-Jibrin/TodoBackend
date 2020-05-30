const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sql = require("../database/db");
const signinValidation = require("../model/signinValidation");

const signin = (req, res) => {
  const { email, password } = req.body;
  const { error } = signinValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const userEmail = "SELECT * FROM users WHERE email = ?";
  sql.query(userEmail, [email], (error, user, fields) => {
    console.log(user);
    if (error) {
      res.json({
        status: "error",
        message: "please debug me!!!",
      });
    } else {
      if (user.length) {
        const match = bcrypt.compareSync(password, user[0].password);
        if (match) {
          const token = jwt.sign(
            { id: user[0].userId, isAdmin: user[0].isAdmin },
            process.env.TOKEN_SECRET,
            {
              expiresIn: 60 * 24, // 24hours
            }
          );
          res.header("Authorization", token).status(201).json({
            user: user[0],
            token,
            status: "success",
            message: "logged in!",
          });
        } else {
          res.json({
            status: "error",
            message: "Email and password does not match",
          });
        }
      } else {
        res.json({
          status: "error",
          message: "Email does not exits",
        });
      }
    }
  });
};
module.exports = signin;