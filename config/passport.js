const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      let query = { username: username };

      User.findOne("query", function (err, user) {
        if (err) throw errl;
        if (!user) {
          return done(null, false, { message: "No user" });
        }
        bcrypt.compare(password, user.password, function (err, isMatch) {
          if (isMatch) {
            return done(null, user);
            console.log("Loggedin");
          } else {
            return done(null, false, { message: "Wrodn password" });
          }
        });
      });
    })
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
