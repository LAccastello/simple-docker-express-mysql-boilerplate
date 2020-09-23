const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db').models;

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      db.User.findOne({ where: { email } }).then(function (dbUser, err) {
        if (err) {
          return done(err);
        }
        if (!dbUser) {
          return done(null, false, {
            message: 'Incorrect email.',
          });
        } else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: 'Incorrect password.',
          });
        }
        return done(null, dbUser);
      });
    }
  )
);

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      process.nextTick(function () {
        const { firstname, lastname, role } = req.body;
        db.User.findOne({ where: { email: email } })
          .then(function (user, err) {
            if (err) {
              // console.log('Error en SignUp: ' + err);
              return done(err);
            }

            if (user) {
              console.log('Usuario existente');
              return done(null, false);
            } else {
              db.User.create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                roleId: role
              })
                .then((user) => {
                  return done(null, user);
                })
                .catch((err) => {
                  return done(err);
                });
            }
          })
          .catch((e) => {
            return e;
          });
      });
    }
  )
);
//
// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
//
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
//
// Exporting our configured passport
module.exports = passport;
