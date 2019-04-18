const noteModel = require("../models/notes");

let note = {
  view: (req, res) => {
    let { user } = req.params;

    noteModel.view(user, (error, result) => {
      if (result) {
        console.log(result[0]);
        let r = {};
        r.success = true;
        r.title = result[0].title;
        r.description = result[0].description;
        r.body = result[0].body;
        r.noteId = result[0]._id;
        r.userId = user;
        res.send(r).status(200);
      } else if (error) {
        let r = {};
        r.success = false;
        r.error = error;
        res.send(r).status(500);
      }
    });
  },
  create: (req, res) => {
    let user = req.params;
    let newNoteDetails = req.body.note;
    console.log(newNoteDetails);
    newNoteDetails.user = user["user"];
    var newNote = new noteModel(newNoteDetails);
    var response = {};
    newNote.save((err, result) => {
      console.log("the result" + result);
      if (err) {
        res.send("Something bad happened");
        throw err;
      } else {
        response.success = true;
        response.title = result.title;
        response.body = result.body;
        response.description = result.description;
        response.userId = result.user;
        response.id = result._id;
        res.send(response);
      }
    });
  },

  update: (req, res) => {
    let { note } = req.params;
    let newNoteDetails = req.body.note;
    console.log('the note' + note)

    noteModel.findAndModify(
      note,
      newNoteDetails,
      { new: true },
      (error, newNoteSaved) => {
        if (error) {
          let response = {};
          response.success = false;
          response.message = "An Error has occured!";
          res.status(500).send(response);
        } else if (newNoteSaved.length) {
          let response = {};
          response.success = true;
          response.message = "Note updated successfully";
          response.content = newNoteSaved;
          res.send(response).status(200);
        } else {
          let response = {};
          response.success = false;
          response.message = "Note not Found";
          res.status(404).send(response);
        }
      }
    );
  },

  delete: (req, res) => {
    let noteId = req.params.note;
    let response = {};

    noteModel.findByIdAndRemove(noteId, (error, noteRemoved) => {
      if (error) {
        response.success = false;;
        response.message = "Internal server error!";
        res.status(500).send(response);
      }
      else {
        response.success = true;
        response.message = "note deleted successfully";
        res.status(200).send(response);
      }
    })
  }
};

module.exports = note;
