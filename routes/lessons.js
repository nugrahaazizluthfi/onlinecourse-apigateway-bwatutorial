var express = require("express");
var router = express.Router();

const lessonsHandler = require("./handler/lessons");

router.get("/", lessonsHandler.getAll);
router.get("/:id", lessonsHandler.get);
router.post("/", lessonsHandler.create);
router.put("/:id", lessonsHandler.update);
router.delete("/:id", lessonsHandler.destroy);

module.exports = router;
