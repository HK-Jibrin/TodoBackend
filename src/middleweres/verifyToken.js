const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token);
  if (!token) {
    return res.status(401).json({
      status: "failure",
      message: "No access token provided!",
    });
  }
  if (token) {
    try {
      jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
        req.user = decoded;
        next();
      });
      // console.log(req.user);
    } catch (error) {
      return res.status(400).send({
        status: "failure",
        message: "Invalid Token!",
      });
    }
  }
};
module.exports = verifyToken;