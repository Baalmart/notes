const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

let users = {
  addUser: (req, res) => {
    // confirm that user typed same password twice
    let { username, fullname, password } = req.body.user;
    if (username && fullname && password) {
      userModel.find(
        {
          username: username
        },
        (error, result) => {
          if (error) {
            let response = {};
            response.success = false;
            response.message = "internal server error";
            res.send(response).status(500);
          } else if (result.length) {
            let response = {};
            response.success = false;
            response.message = `${username} exists, please try another!`;
            res.send(response).status(400);
          } else {
            const user = new userModel(req.body.user);
            bcrypt.genSalt(saltRounds, function(err, salt) {
              bcrypt.hash(user.password, salt, function(err, hash) {
                user.password = hash;
                user.save((error, userDetails) => {
                  if (error) {
                    let response = {};
                    response.success = false;
                    response.message = `The email and username have to be unique, please check documentation`;
                    res.send(response).status(500);
                    console.log(error);
                  } else {
                    let tokenPayload = {
                      id: userDetails._id
                    };
                    const token = jwt.sign(
                      {
                        data: tokenPayload,
                        exp: Math.floor(Date.now() / 1000) + 60 * 60
                      },
                      "totallySecretiveSecret"
                    );

                    let userData = {};
                    userData.fullname = userDetails.fullname;
                    userData.username = userDetails.username;
                    userData.userid = userDetails._id;
                    userData.library = userDetails.library;
                    userData.playlists = userDetails.playlists;

                    let response = {};
                    response.message = "successfully created an account";
                    response.success = true;
                    response.access_token = token;
                    response.userdata = userData;
                    res.send(response).status(200);
                    console.log(
                      "successfully saved the new user with id: " +
                        userData.userid
                    );
                  }
                });
              });
            });
          }
        }
      );
    } else {
      let response = {};
      response.success = false;
      response.statusCode = 400;
      response.message =
        "Some required fields are missing, please check documentation";
      res.send(response);
    }
  },

  login: (req, res) => {
    let { username, password } = req.body.user;
    userModel.find(
      {
        username: username
      },
      (error, results) => {
        if (error) {
          res.status(500).send("there is a server error");
        } else if (results.length) {
          console.log(results[0]);
          bcrypt.compare(password, results[0].password, (error, resp) => {
            if (error) {
              let response = {};
              response.username = username;
              response.success = false;
              response.message = "the username or password are incorrect";
              res.status(500).send(response);
            } else if (resp === false) {
              let response = {};
              response.success = false;
              response.message = "wrong password or username";
              response.statusCode = 404;
              res.status(404).send(response);
            } else if (results[0].accountStatus === "inactive") {
              let response = {};
              response.success = false;
              response.message = "the account is inactive";
              response.statusCode = 404;
              res.status(404).send(response);
            } else {
              let response = {};
              let tokenPayload = {
                id: results[0]._id
              };
              const token = jwt.sign(
                {
                  data: tokenPayload,
                  exp: Math.floor(Date.now() / 1000) + 60 * 60
                },
                "totallySecretiveSecret"
              );
              response.username = username;
              response.access_token = token;
              response.user_id = results[0]._id;
              response.message = "successfully loggin in!";
              response.success = true;
              res.status(200).send(response);
            }
          });
        } else {
          let response = {};
          response.statusCode = 400;
          response.success = false;
          response.message = "the username or password do not exist";
          res.status(404).send(response);
        }
      }
    );
  }
};

module.exports = users;
