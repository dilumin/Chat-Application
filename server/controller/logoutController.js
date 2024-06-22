const { getRefreshToken ,deleteRefreshToken} = require('../model/users');


const handleLogout = async (req, res) => {

    const cookie = req.cookies;
    if (!cookie?.RefreshToken) {
        res.status(400).json({message: 'No cookie found'});
        return;
    }
    const token = cookie.RefreshToken;

    const user = await getRefreshToken(token);
    if (user.length === 0) {
        res.clearCookie('RefreshToken' , {httpOnly: true ,  sameSite:'None',secure:'false' ,maxAge: 24 * 60 * 60 * 1000});
        return res.status(204).json({message: 'Token removed'});
    }
    await deleteRefreshToken(token).catch((error) => {
        console.log("Error deleting refresh token", error);
    });
    res.clearCookie('RefreshToken' , {httpOnly: true ,  sameSite:'None',secure:'false' ,maxAge: 24 * 60 * 60 * 1000});
    res.status(204).json({message: 'Token removed'});


}
module.exports = { handleLogout };