const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

/* POST login. */
router.post('/login', function (req, res, next) {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info.message,
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // Se general el json web token con la clave secreta
      const token = jwt.sign(user.toJSON(), process.env.SECRETKEY);
      return res.json({ user, token });
    });
  })(req, res, next);
});

/* POST signup. */
router.post('/signup', function (req, res, next) {
  passport.authenticate('signup', (err, user, info) => {
    if (user) {
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        } else {
          res.send({
            success: true,
            response: 'signup successful',
          });
        }
      });
    }

    if (err) {
      res.send({
        success: false,
        response: 'Authentication failed',
        errors: err.message,
      });
    }
  })(req, res, next);
});

module.exports = router;
