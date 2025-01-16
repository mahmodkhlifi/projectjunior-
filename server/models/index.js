const {Sequelize ,DataTypes}= require ("sequelize")
const sequelize = new Sequelize('e_commerce1','root','120612061206',{
  host: 'localhost',
dialect:"mysql"
});
sequelize.authenticate()
.then(()=>{
    console.log("connect success")
}).catch((err)=>{
    throw err
});
const db= {}
db.User= require("./user")(sequelize,DataTypes)
db.Product= require("./product")(sequelize,DataTypes)
db.Category= require("./category")(sequelize,DataTypes)

db.User.hasMany(db.Product)
db.Product.belongsTo(db.User)
db.Category.hasMany(db.Product)
db.Product.belongsTo(db.Category)
// sequelize.sync({alter:true})
// .then(()=>{
//     console.log("ggood ")
// })
// .catch((err)=>{
//     throw err
// })





module.exports=db