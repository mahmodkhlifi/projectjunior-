const express = require("express");
const Router = express.Router();

const{
    getallcategory,
    addcategory,
    deletecategory
  }= require("../controller/category");
  
  
  Router.delete("/delete/:id",deletecategory);
  Router.get("/getall",getallcategory);
  Router.post("/add",addcategory)






module.exports= Router
