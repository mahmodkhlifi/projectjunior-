const express = require("express");
let app = express("express");
const cors =require("cors")
let port = 2200;
app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + "/../client/dist"));
require("./models/index.js")
const Userrouter = require("./routes/user.js")
const productrouter = require("./routes/product.js")
const categoryrouter = require("./routes/category.js")
app.use("/api/product",productrouter)
app.use("/api/user", Userrouter)
app.use("/api/category",categoryrouter)
app.listen(port, function () {
    console.log(`listening on port ${port}`);
  });