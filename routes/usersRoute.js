const express = require("express");
const router = express.Router();

const { getAllUsers, getUserById, deleteUser, updateUser } = require("../controllers/usersController.js");

router.get("/", getAllUsers);
router.all("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;