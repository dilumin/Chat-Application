const db = require('./db');

async function myFriends(email){ 
    try{
        const friends = await db.query("SELECT u.username, u.email FROM users u JOIN friendlist f1 ON u.user_id = f1.user_id JOIN friendlist f2 ON f1.friend_id = f2.friend_id AND f1.user_id = f2.user_id JOIN users u2 ON f2.friend_id = u2.user_id WHERE u2.email = ?", [email]);
        return friends[0];
    }catch(error){
        console.log(error);
    }
}

async function myPeople(email){
    try{
        const people = await db.query("SELECT username, email FROM users WHERE email = ?", [email]);
        return people[0];
    }catch(error){
        console.log(error);
    }
}

async function friendRequestSent (userEmail , friendEmail){
    try{
        await db.query("INSERT INTO friendrequests (user_email , friend_email) VALUES (? , ?)" , [userEmail , friendEmail]);
    }
    catch(error){
        console.log(error);
    }}

module.exports = {myFriends , myPeople , friendRequestSent};


