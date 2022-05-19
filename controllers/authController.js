const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

const { generate_JSON_WEB_TOKEN } = require("../helpers/functions.js");

const { registerUserSchema, loginUserSchema } = require("../validations/userValidation.js");



const registerUser = async (req, res) => {

   const { firstname, lastname, username, email, password } = req.body;

   try{
         const isUserDataValid = await registerUserSchema.validate(req.body);
         if(!isUserDataValid){
             res.status(500).json({message: "Invalid user data!"});
         }

         const users = await User.find();

         const isEmailFound = users.find(user => user.email === email);

         if(isEmailFound){
             res.status(500).json({message: "Email already exists!"});
         }

         const isUsernameFound = users.find(user => user.username === username);

         if(isUsernameFound){
            res.status(500).json({message: "Username already exists!"});
         }

         const hashedPassword = await bcrypt.hash(password, 10);

         const newUser = new User({
             firstname,
             lastname,
             username,
             email,
             password: hashedPassword
         })

         await newUser.save();

         const token = generate_JSON_WEB_TOKEN({ id: newUser._id }, { expiresIn: '10d' });

         res.status(200).json({
             message: "Succesfully created user!",
             user: newUser,
             token
         })

   } catch(err){
      res.status(500).json({message: err.message});
   }
}

const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try{

       const isUserDataValid = await loginUserSchema.validate(req.body);
       
       if(!isUserDataValid){
           res.status(500).json({message: "Invalid user data!"});
       }

       const foundUser = await User.findOne({ email: email });

       if(!foundUser){
           res.status(500).json({message: "Invalid user credentials!"});
       }  

       const isPasswordValid = await bcrypt.compare(password, foundUser.password);

       if(!isPasswordValid){
        res.status(500).json({message: "Invalid user credentials!"});
    } 


    const token = generate_JSON_WEB_TOKEN({ id: foundUser._id }, { expiresIn: "10d" });

    res.json({
        message: "Succesfully login",
        user: foundUser,
        token
    })
       
    } catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    registerUser,
    loginUser
}