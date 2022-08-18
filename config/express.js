const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userSession = require('../middleweares/auth');

module.exports = (app) => {

    app.use(cookieParser());
    app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: 'auto'
        }
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use(userSession());
}