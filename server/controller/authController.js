const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const { addRefreshToken , getUserbyEmail } = require('../model/users');
require('dotenv').config( {path:path.resolve(__dirname,'../.env')})



const handleAuth = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        res.status(400).json({message: 'Please provide all required fields'});
        return;
    }
    const [user] = await getUserbyEmail(email);
    if (!user) {
        res.status(404).json({message: 'User not found'});
        return;
    }
    // console.log(password,"   ", user.password);
    if (!await bcrypt.compare(password, user.password)) {
        return res.status(401).json({message: 'Invalid credentials'});
    }
    else{
        const AccessToken = jwt.sign(
            {email: user.email}
            , process.env.ACCESS_TOKEN_SECRET
            , {expiresIn: '40m'}
        );
        const RefreshToken = jwt.sign(
            {email: user.email}
            , process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );


        await addRefreshToken(user.user_id, RefreshToken).catch((error) => {
            console.log("Error adding refresh token", error);
        });
        res.cookie('RefreshToken', RefreshToken, {httpOnly: true ,  sameSite:'None',secure:'false' ,maxAge: 24 * 60 * 60 * 1000});
        res.json({AccessToken: AccessToken , Status : 'Success'});
    }
}

module.exports = { handleAuth };