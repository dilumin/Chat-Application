const db = require('./db');

async function getUsers() {
    try {
        const users = await db.query('SELECT * FROM users');
        return users[0];
    } catch (error) {
        console.log(error);
    }
}

async function getUsernamebyEmail(email) {
    try {
        const user = await db.query('SELECT username FROM users WHERE email = ?', [email]);
        return user[0];
    } catch (error) {
        console.log(error);
    }
}

async function getUserbyEmail(email) {
    try {
        const user = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return user[0];
    } catch (error) {
        console.log(error);
    }
}

async function createNewUser(username, email, password) {
    try {
        const newUser = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]).catch((error) => {
            console.log("Found a error when adding here in users.js" , error);
        });
        return newUser[0];
    } catch (error) {
        console.log(error);
    }
    
}



async function addRefreshToken(userID , refreshToken){
    try{
        const user = await db.query('INSERT INTO refreshtokens (user_id, refresh_token) VALUES (? , ?);' , [userID , refreshToken]);
        return user[0];
    }catch(error){
        console.log(error);
    }
}

async function getRefreshToken(token){
    try{
        const RTU = await db.query('SELECT user_id FROM refreshtokens WHERE refresh_token = ?' , [token]);
        return RTU[0];
    }catch(error){
        console.log(error);
    }
}

async function getUserfromRefreshToken(token){
    
    const user1 = await getRefreshToken(token).then(async (userID) =>  {
        const user = await db.query('SELECT * FROM users WHERE user_id = ?' , [userID[0]?.user_id]);
        console.log("The user is :" , user[0]);
        return user[0];
    }).catch((error) => {
        console.log(error);
    });
    return user1;
}

async function deleteRefreshToken(token){
    try{
        const user = await db.query('DELETE FROM refreshtokens WHERE refresh_token = ? ' , [ token]);
        return user[0];
    }catch(error){
        console.log(error);
    }
}





module.exports = { getUsernamebyEmail, getUsers , getUserbyEmail , createNewUser , addRefreshToken , getRefreshToken ,deleteRefreshToken , getUserfromRefreshToken };