var express = require("express");
var router = express.Router();
const notesController = require("../controllers/notes");
const joinController = require("../controllers/join");

const passport = require("passport");
require("../passport");

/***joining the app */
router.post("/register", joinController.register);

router.post("/login", joinController.login);

/* creating notes. */
router.post(
  "/notes/create/:user",
  passport.authenticate("jwt", {
    session: false
  }),
  notesController.create
);
router.get(
  "/notes/view/:user",
  passport.authenticate("jwt", {
    session: false
  }),
  notesController.view
);
router.put(
  "/notes/update/:note",
  passport.authenticate("jwt", {
    session: false
  }),
  notesController.update
);

router.delete("/notes/delete/:note", passport.authenticate("jwt", {
  session: false
}), notesController.delete);

module.exports = router;
