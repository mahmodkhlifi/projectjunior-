module.exports = (sequelize,DataTypes)=>{
    const Product = sequelize.define( 
        "Product",
        {
            name:
                {
                    type: DataTypes.STRING,
                    allowNull: false,
                  },
            imageUrl:{
                 type: DataTypes.STRING
            },
            price:{
                type:DataTypes.INTEGER,
                
            },
            description:{
                type:DataTypes.TEXT
            }
            
      
        
}
  
)
  return  Product }