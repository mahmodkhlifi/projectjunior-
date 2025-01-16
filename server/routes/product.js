const express = require("express");
const Router = express.Router();

const{
    getallProduct,
    addproduct,
    deleteproduct,
    updateproduct,
    getAllProductscat
  }= require("../controller/product.js");
  
  
  
  Router.get("/getall",getallProduct);
  Router.post("/add",addproduct)
  Router.delete("/delete/:id",deleteproduct)
  Router.put("/uptade/:id",updateproduct)
Router.get("/get/:id",getAllProductscat)





module.exports= Router