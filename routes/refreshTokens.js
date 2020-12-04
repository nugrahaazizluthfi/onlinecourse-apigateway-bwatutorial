var express = require("express");
var router = express.Router();

const refreshTokenHandler = require("./handler/refresh_token");

/* GET home page. */
router.post("/", refreshTokenHandler.refreshToken);

module.exports = router;
