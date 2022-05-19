require("dotenv").config();
const jwt = require("jsonwebtoken");

const generate_JSON_WEB_TOKEN = (payload, options) => {
   return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = { 
    generate_JSON_WEB_TOKEN
 }
