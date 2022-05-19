const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   firstname: {
       type: String, 
       min: 3,
       max: 15,
       required: true
   },
   lastname: {
    type: String, 
    min: 3,
    max: 15,
    required: true
},
    username: {
        type: String, 
        min: 6,
        max: 20,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        min: 7,
        max: 30,
        required: true
    }
})

module.exports = mongoose.model("User", userSchema);