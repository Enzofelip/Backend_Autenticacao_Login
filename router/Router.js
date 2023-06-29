const express = require("express");
const router = express.Router();

const UserController = require("../controller/UserController");
const checkToken = require("../helps/verify-token")

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/pessoa", checkToken,  UserController.checkUser);

module.exports = router