const router = require('express').Router();
const { isGuest } = require('../middleweares/guards');
const { register, login, logout, profile, verifySession } = require('../services/user');
const mapErrors = require('../utils/mapper');
const { setUser, clearUser, getUser } = require('../utils/storage');
//const utils = require('../services/user');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sadsdsdasd';
const authCookie = 'auth-cookie';

router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim() == '' || req.body.email.trim() == '') {

            throw new Error('Email and password is required');
        }

        const result = await register(req.body.email.trim().toLowerCase(), req.body.password.trim());
        const token = createSession(result)
        req.session.user = result;
        res.cookie(authCookie, token, { httpOnly: true });
        setUser(result);
        res.status(201).json(result);
    } catch (err) {
        const error = mapErrors(err).join('\n');
        console.error(err.message);
        res.status(400).json({ message: 'This user is already registered!' });
    }

});

router.post('/login', isGuest(), async (req, res) => {
    try {
        console.log(req.body.email, '>>>>>>>>>>', req.body.password)
        const result = await login(req.body.email.trim().toLowerCase(), req.body.password.trim());
        const token = createSession(result)
        setUser(result)
        req.session.user = result;
        console.log(req.session.user);
        res.cookie(authCookie, token, { httpOnly: true })
        res.json(result);
    } catch (err) {
        const error = mapErrors(err).join('\n');
        console.error(err.message);
        res.status(400).json({ message: 'Wrong email or password' });
    }
});

router.get('/logout', (req, res) => {

    req.session.destroy(err => {
        console.log(err)
    });
    res.clearCookie(authCookie);
    logout(req.session?.user?.token);
    res.status(204).json({ message: 'Logged out!' }).end();
});

router.get('/profile', async (req, res) => {
    const userId = req.session.user;
    console.log(req.cookies)
    const token = req.cookies[authCookie] || '';

    try{
        console.log(userId);
        verifySession(token);
        const profile = await profile(userId);
        res.json(profile);
    }catch(err){
        res.status(400).json();
    }

});

function createSession(user) {
    return {
        email: user.email,
        _id: user._id,
        myPhotos: user.myPhotos,
        accessToken: jwt.sign({
            email: user.email,
            _id: user._id
        }, JWT_SECRET)
    }
}

module.exports = router;