// requiring all installed dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");
require("dotenv").config();
const signup = require("./src/controller/signup");
const signin = require("./src/controller/signin");
const todo = require("./src/route/todo.route");
// initializing the express app
const app = express();

// helmet middlewares
app.use(helmet());
// express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// body-parser middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// cors middlewares
app.use(cors());
// cookies-parser middlewares
app.use(cookieParser());

app.post("/api/signup", signup);
app.post("/api/signin", signin);

app.use("/api", todo);

var PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server Started at Port : ${PORT}`);
});