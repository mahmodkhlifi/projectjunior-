const express = require("express");
const Router = express.Router();

const{
    getallUser,
    addUser,
    login,
  }= require("../controller/user");
  
  
  Router.post("/login",login)
  Router.get("/getall",getallUser);
  Router.post("/add",addUser)






module.exports= Router