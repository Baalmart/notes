const noteModel = require('../models/notes')

const notes = {
  create: (req, res) => {

{title, text} = req.body;

if (title && text){
    let newNote = new noteModel({title:title, text:text});

    newNote.
}

  },

  delete: (req, res) => {},

  view: (req, res) => {}
};


module.exports = notes;