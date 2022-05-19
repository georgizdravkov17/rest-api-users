const User = require("../models/User.js");

const getAllUsers = async (req, res) => {
   try{
       const users = await User.find();
       res.status(200).json(users);

   } catch(err){
       res.status(500).json({message: err.message});
   }
}

const getUserById = async (req, res) => {
   try{
       const user = await User.findById(req.params.id);
       res.status(200).json(user);
   } catch(err){
    res.status(500).json({message: err.message});
   }
}

const deleteUser = async (req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Succesfully deleted user",
            user: deletedUser
        }) 
    } catch(err){
     res.status(500).json({message: err.message});
    }
}

const updateUser = async (req, res) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            message: "Succesfully updated user!",
            user: updatedUser
        })
    } catch(err){
     res.status(500).json({message: err.message});
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser
}