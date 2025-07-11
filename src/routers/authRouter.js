const express = require("express");
const User = require("../models/UserModel");
const { hashPassword } = require("../hashingFunctions/hash");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { register, login } = require("../controllers/authController");

router.post("/register", register);

router.post("/login", login);

module.exports = router;