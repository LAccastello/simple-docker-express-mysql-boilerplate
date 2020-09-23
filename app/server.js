const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('./controllers/auth.controller');
const auth = require('./routes/auth.route');
const flash = require('connect-flash');
const db = require('./db');
require('dotenv').config();

const app = express();

let corsOptions = {
  origin: 'http://localhost:8081', // Modificar URL acorde desde donde estén consumiendo la API. 8081 es el ejemplo de Ionic
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRETKEY_SESSION,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth);

const PORT = process.env.PORT || 8080;
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, function () {
    console.log(
      '==> Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT
    );
  });
});
