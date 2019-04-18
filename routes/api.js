var express = require("express");
var router = express.Router();
const notesController = require("../controllers/notes");
const joinController = require("../controllers/join");

const passport = require("passport");
require("../passport");

/***joining the app */
router.post("/register", joinController.register);

router.post(
  "/login",
  passport.authenticate("jwt", {
    session: false
  }),
  joinController.login
);

/* creating notes. */
router.post("/create", notesController.create);
router.delete("/delete", notesController.delete);
router.get("/view", notesController.view);

module.exports = router;
