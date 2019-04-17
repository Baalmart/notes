var express = require("express");
var router = express.Router();
const notesController = require("../controllers/notes");

/* create notes. */
router.get("/create", notesController.create);

/**delete notes */
router.get("/delete", function(req, res, next) {});

/**view notes */
router.get("/view", function(req, res, next) {});

module.exports = router;
