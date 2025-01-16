const { where } = require("sequelize")
const {Product} = require("../models/index")
const {Op}=require("sequelize")

module.exports={
    getallProduct : async(req,res)=>{
        try{
            const allproduct = await Product.findAll()
         res.status(200).send(allproduct)
        }
    catch(err){
            throw err}
    },
   addproduct: async(req,res)=>{
    try{
        const {name,imageUrl,price,description,CategoryId}=req.body 
        const newProduct = await Product.create({name,imageUrl,price,description,CategoryId})
        res.status(201).send({message:"product created",newProduct})
    }catch(err){
        throw err
    }
   },
   deleteproduct : async(req,res)=>{
    const {id}=req.params
 const deleteproduct = await Product.destroy({where:{id:id}})
    try{
         
     if (deleteproduct) {
            res.send({ message: "Product deleted successfully", deleteproduct });
          } else {
            res.status(404).send({ message: " not found" });
          }
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "An error occurred", error });
        }
      },
      updateproduct:async(req,res)=>{
        const {id}=req.params
        const {name,imageUrl,price,description}=req.body
        try{
            if(!name){
                res.status(404).send({message:"name is not found"})
            }
            const product=await Product.findOne({where:{id:id}})
            if(!product){
                res.status(401).send({message:"product not found"})
              }
              const updateproduct=await Product.update({
                name:name||product.name,
              imageUrl:imageUrl||product.imageUrl,
              price:price||product.price ,
              description:description||product.description
              },
             { where:{id}}
            )
            res.send({message:"Product is updated",updateproduct})
        }catch(error){
            throw error
        }
    },
    getAllProductscat: async (req, res) => {
      const cat = req.params.id
      try{
        const product= await Product.findAll({ where: {CategoryId: cat } })
        res.send(product)
      }catch(error){
        res.status(500).send(error)
      }
  
  
    },
    
  }













