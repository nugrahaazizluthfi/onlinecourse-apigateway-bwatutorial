var express = require("express");
var router = express.Router();

const webhookHandler = require("./handler/webhook");

/* GET home page. */
router.post("/", webhookHandler.webhook);

module.exports = router;
