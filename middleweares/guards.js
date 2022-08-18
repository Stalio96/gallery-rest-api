const { getUser } = require("../utils/storage");


function isAuth() {
    return (req, res, next) => {
        if (req.session.user) {
            next();
        } else {
            res.status(401).json({ message: 'Please log in' });
        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if (!req.session.user) {
            next();
        } else {
            res.status(400).json({ message: 'You are already signed in' });
        }
    }
}

function isOwner() {
    return (req, res, next) => {
        console.log(req.session.user?._id, '>>>', res.locals.item.owner)
        if (req.session.user && req.session.user._id == res.locals.item.owner) {
            next();
        } else {
            res.status(403).json({ message: 'You cannot modify this record' });
        }
    }
}

module.exports = {
    isAuth,
    isGuest,
    isOwner
}