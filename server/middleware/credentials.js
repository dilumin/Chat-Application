
const path = require('path');
require('dotenv').config( {path:path.resolve(__dirname,'../.env')})

const whitelist = process.env.CORS_WHITELIST ? process.env.CORS_WHITELIST.split(',') : [];



const Credentials = (req, res, next) => {
    if (whitelist.indexOf(req.headers.origin) !== -1) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = Credentials;