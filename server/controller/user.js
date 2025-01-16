const { User } = require("../models/index");
const bcrypt = require("bcryptjs"); // for password hashing and comparison

module.exports={
    getallUser : async(req,res)=>{
        try{
            const allUser = await User.findAll()
         res.status(200).send(allUser)
        }
    catch(err){
            throw err}
    },
   addUser: async(req,res)=>{
    const { username, password } = req.body;

    // Step 1: Validate input data
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
      // Step 2: Check if the username already exists in the database
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists.' });
      }

      // Step 3: Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Step 4: Create a new user
      const newUser = await User.create({
        username,
        password: hashedPassword,
      });

      // Step 5: Respond with success
      return res.status(201).json({ message: 'User created successfully', newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while creating the user', error });
    }
  },
   deleteUser : async(req,res)=>{
    const {id}=req.body
 const deletedUser = await User.destroy({where:id})
    try{
         
     if (deletedUser) {
            res.send({ message: "User deleted successfully", deletedUser });
          } else {
            res.status(404).send({ message: " not found" });
          }
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "An error occurred", error });
        }
      },
      updateUser:async(req,res)=>{
        const {id}=req.params
        const {name}=req.body
        try{
            if(!id){
                res.status(404).send({message:"id is not found"})
            }
            const User=await User.findOne({id})
            if(!User){
                res.status(401).send({message:"user not found"})
              }
              const updateUser=await User.update({
                name:name||User.name,
               
              },
             { where:{id}}
            )
            res.send({message:"user is updated",updateUser})
        }catch(error){
            throw error
        }
    },

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Step 1: Find the user by username
      const user = await User.findOne({ where: { username: username } });
      console.log("reached");

      console.log(user);
      // Step 2: Check if user exists
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      // Step 3: Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);

      // Step 4: If the passwords don't match
      if (!isMatch) {
        return res.status(401).send({ message: "Invalid credentials" });
      }

      // Step 5: If credentials are valid, send a success message or JWT token (optional)
      res.status(200).send({
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
        },
      });

    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "An error occurred", error });
    }
  },
};

  
  
  
  
  
  













