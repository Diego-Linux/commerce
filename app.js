const express = require('express');
const path = require('path');

const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const routes = require('./routes');

const app = express();

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));
app.use(flash());


const STORE = new SessionStore({
    uri: "mongodb://localhost:27017/commerce",
    collection: "sessions"
});

app.use(
    session({
        secret: "9Q87998%$#@!-*5%4252#",
        saveUninitialized: false,
        store: STORE
    })
);

app.set("view engine", "ejs");
app.set("views", "views")

app.use('/', routes);

const port = 3000;

app.listen(port);