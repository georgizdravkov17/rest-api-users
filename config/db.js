require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
   try{
     await mongoose.connect(process.env.DB_URI);
     console.log("Successfully connected to db!"); 
   } catch(err){
       console.log(err.message);
   }
}

module.exports = { connectDB }