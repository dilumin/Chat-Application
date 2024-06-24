const jwt = require('jsonwebtoken');
//to get env for the jwts secret
const path = require('path');
require('dotenv').config( {path:path.resolve(__dirname,'../.env')})

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ msg: 'No token provided' });
    }
    //console.log(authHeader); //Bearer <token>
    const token = authHeader.split(' ')[1]; //splitting the token from the Bearer and getting the token (1st element of the array)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                console.log("TOKEN EXPIRED" , err)
                return res.status(403).json({ msg: 'Token is not valid' , authFailed:"403" }); //403 is the status code for forbidden ,invalid token                
            }
            console.log("TOKEN OKAY" );
            req.user = decoded.username;
            console.log("The decoded username is :" , decoded.email);
            next();
        }
    )
};
module.exports = verifyJWT;