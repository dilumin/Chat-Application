const path = require('path');

require('dotenv').config( {path:path.resolve(__dirname,'../.env')})

const whitelist = process.env.CORS_WHITELIST ? process.env.CORS_WHITELIST.split(',') : [];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    },
    Credentials: true,
    optionsSuccessStatus: 200
};

module.exports = corsOptions;


