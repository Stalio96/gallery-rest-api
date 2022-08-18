const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { clearUser, getUser } = require('../utils/storage');

const authCookie = 'auth-cookie';
const JWT_SECRET = 'sadsdsdasd';

const blackList = [];

async function login(email, password){
    const user = await User.findOne({email: new RegExp(`^${email}$`, 'i')});

    if(!user){
        throw new Error('Incorrect email or password');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if(!match){
        throw new Error('Incorrect email or password');
    }

    return createSession(user);
}

async function register(email, password){
    const existing = await User.findOne({email: new RegExp(`^${email}$`, 'i')});

    if(existing){
        throw new Error('Email already exists');
    }
    
    const user = {
        email,
        hashedPassword: await bcrypt.hash(password, 10)
    };

    const use = new User(user)

    await use.save();

    return createSession(user);
}

async function profile(id){
    const profile = await User.findById(id);

    return profile;
}

function logout(token){
    blackList.push(token);
    //clearUser();
}

function createSession(user){
    return {
        email: user.email,
        _id: user._id,
        myShoes: user.myShoes,
        accessToken: jwt.sign({
            email: user.email,
            _id: user._id
        }, JWT_SECRET)
    }
}

function verifySession(token){

    if(blackList.includes(token)){
        throw new Error('Token is invalidated');
    }

    const payload = jwt.verify(token, JWT_SECRET);

    return {
        email: payload.email,
        _id: payload._id,
        token
    }
}

module.exports = {
    register,
    login,
    logout,
    profile,
    verifySession
}