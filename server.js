require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const { connectDB } = require("./config/db.js");

connectDB();

const app = express();

app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/users", require("./routes/usersRoute.js"));
app.use(require("./routes/authRoute.js"));

app.get("/", (req, res) => {
    res.send(`<h1>Welcome to Users REST API!</h1>`);
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})