const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const userModel = require("./models/user.js");
const localStrategy = require("passport-local").Strategy;

let localStrategyOptions = {};
localStrategyOptions.username = "username";
localStrategyOptions.password = "password";

let strategy = new localStrategy(
  localStrategyOptions,
  (username, password, callback) => {
    return userModel

      .findOne({ username, password })

      .then(user => {
        if (!user) {
          return callback(null, false, {
            message: "incorrect user or password"
          });
        } else {
          return callback(null, user, { message: "Logged in Successfully" });
        }
      })

      .catch(error => callback(error));
  }
);

passport.use(strategy);

let jwtStrategyOptions = {};
let extractJWTFromHeader = function(request) {
  console.log("consoling the JWT strategy....");
  let token;
  if (request.headers.authorization) {
    let tokenBearer = request.headers.authorization;
    token = tokenBearer.split(" ");
    return token[1];
  } else {
    return "please add an authorization header";
  }
};

jwtStrategyOptions.jwtFromRequest = extractJWTFromHeader; //extractJWT.fromAuthHeaderAsBearerToken();
jwtStrategyOptions.secretOrKey = "totallySecretiveSecret";
jwtStrategyOptions.ignoreExpiration = false;

//the callback func in this case is in the form (error, user, info)
strategy = new jwtStrategy(jwtStrategyOptions, (jwtPayload, next) => {
  let user = userModel.findById(jwtPayload._id);
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);
