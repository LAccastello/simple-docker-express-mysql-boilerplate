require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');
const auth = require('./routes/auth');
const flash = require('connect-flash');
const fs = require('fs');


const app = express();

let corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }) 
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

const uploadDir = path.join(__dirname, '/public/uploads');  
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const db = require('./db');

app.use('/auth', auth);

const PORT = process.env.PORT || 8080;

// db.sequelize.sync({ force: true }).then(() => {

app.listen(PORT, function () {
  console.log(
    '==> Listening on port %s. Visit http://localhost:%s/ in your browser.',
    PORT,
    PORT
  );
});
// });
