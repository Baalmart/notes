const dao = require("../services/dao");

const user = {
  register: (req, res) => {
    dao.addUser(req, res);
  },

  login: (req, res) => {
    dao.login(req, res);
  }
};

module.exports = user;
