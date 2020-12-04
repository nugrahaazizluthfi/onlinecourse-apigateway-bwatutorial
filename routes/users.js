var express = require("express");
var router = express.Router();

const userHandler = require("./handler/users");

/* GET home page. */
router.post("/register", userHandler.register);
router.post("/login", userHandler.login);

module.exports = router;
