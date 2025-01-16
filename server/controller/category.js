const { Category}=require("../models/index")
module.exports={
    getallcategory : async(req,res)=>{
        try{
            const allcategory =await Category.findAll()
        return   res.status(200).send(allcategory)
        }
    catch(err){
            throw err}
    },
   addcategory: async(req,res)=>{
    try{
        const {name}=req.body 
        const newCategory = await Category.create({name})
        res.status(201).send({message:"category created",newCategory})
    }catch(err){
        throw err
    }
   },
    deletecategory : async(req,res)=>{
       const {id}=req.params
    const deletecategory = await Category.destroy({where:{id:id}})
       try{
            
        if (deletecategory) {
               res.send({ message: "Product deleted successfully", deletecategory });
             } else {
               res.status(404).send({ message: " not found" });
             }
           } catch (error) {
             console.error(error);
             res.status(500).send({ message: "An error occurred", error });
           }
         }
   
}