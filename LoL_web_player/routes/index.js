var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("main");
});

router.get("/matchList", function (req, res, next) {
  res.render("matchList");
});

module.exports = router;
