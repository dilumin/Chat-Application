const db = require('./db');

async function getUsers() {
    try {
        const users = await db.query('SELECT * FROM users');
        return users[0];
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

async function addRefreshToken(email , refreshToken){
    try{
        const user = await db.query('UPDATE users SET refreshToken = ? WHERE email = ?' , [refreshToken , email]);
        return user[0];
    }catch(error){
        console.log(error);
    }
}





module.exports = { getUsers , getUserbyEmail , createNewUser , addRefreshToken };