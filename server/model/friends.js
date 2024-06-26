const db = require('./db');

async function myFriends(email){ 
    try{
        const friends = await db.query("SELECT friend_email from friendlist WHERE user_email = ? ", [email]);
        const friends1Array = friends[0].map((friend) => friend.friend_email);
        const friend2 = await db.query("SELECT user_email from friendlist WHERE friend_email = ? ", [email]);
        const friend2Array = friend2[0].map((friend) => friend.user_email);
        const allFriends = friends1Array.concat(friend2Array);
        console.log("This is what I get",allFriends);
        return allFriends;
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

async function addFriend(userEmail, friendEmail){
    try{
        await db.query("INSERT INTO friendlist (user_email, friend_email) VALUES (?, ?)", [userEmail, friendEmail]);

        
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


async function getfriendRequests(email){
    try{
        const requests = await db.query("SELECT user_email FROM friendrequests WHERE friend_email = ?" , [email]);
        return requests[0];
    }catch(error){
        console.log(error);
    }
}
async function deleteFriendRequest(userEmail, friendEmail){
    try{
        await db.query("DELETE FROM friendrequests WHERE user_email = ? AND friend_email = ?", [userEmail, friendEmail]);
    }catch(error){
        console.log(error);
    }
}

module.exports = {myFriends , myPeople , friendRequestSent , getfriendRequests , deleteFriendRequest , addFriend };


