const daoNote = require("../services/dao-note");

const notes = {
  create: (req, res) => {
    daoNote.create(req, res);
  },
  view: (req, res) => {
    daoNote.view(req, res);
  },
  update: (req, res) => {
    daoNote.update(req, res);
  },
  delete: (req, res) => {
    daoNote.delete(req, res);
  }
};

module.exports = notes;
