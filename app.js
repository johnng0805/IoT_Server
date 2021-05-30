const express = require('express');
const path = require('path');
const session = require('express-session');
const UserController = require('./controller/UserController');
const dotenv = require('dotenv');
var debug = require("debug")("app.js");

const app = express();
dotenv.config();

app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port: ' + process.env.PORT);
});

app.use(session({
    secret: "iotsecret",
    name: "iotapp",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 300000 }
}));

app.use(express.json());

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/', UserController);

const checkLoggedIn = (req, res, next) => {
    if (req.session.loggedIn) {
        debug(
          "checkLoggedIn(), req.session.loggedIn:",
          req.session.loggedIn,
          "executing next()"
        );
        next();
    } else {
        debug(
          "checkLoggedIn(), req.session.loggedIn:",
          req.session.loggedIn,
          "rendering login"
        );
        res.sendFile(__dirname + "/views/login.html");
    }
};

app.get('/', checkLoggedIn, async function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/register', async function(req, res) {
    res.sendFile(__dirname + '/views/register.html')
});