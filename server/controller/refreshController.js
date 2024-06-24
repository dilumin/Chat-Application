const userDB = require('../model/users');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const handleRefresh = async (req, res) => {
    const token = req.cookies;
    if (!token?.RefreshToken) {
        return res.status(401).json({ message: 'No token found' });
    }
    const refreshToken = token.RefreshToken;

    try {
        const userLI = await userDB.getUserfromRefreshToken(refreshToken);
        
        const user = userLI[0];
        if (!user) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err || decoded.email !== user.email) {
                    console.log(err , decoded);
                    await userDB.deleteRefreshToken(refreshToken);
                    return res.status(403).json({ message: 'Forbidden' });
                }

                const accessToken = jwt.sign(
                    { email: user.email },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '40m' }
                );
                console.log('\nNew Access Token:', accessToken);
                res.json({ AccessToken: accessToken });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { handleRefresh };
