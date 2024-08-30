const db = require('./db');

async function createPosts(email, post_text, img_url){

    try{
        await db.query(
            `INSERT INTO Posts(user_id, post_text, img_url) 
             SELECT u.user_id, ?, ? 
             FROM users u 
             WHERE u.email = ?`,[post_text, img_url, email]
        )
    }
    catch(error){
        console.log("Error when creating post@DB",error);
    }

}

async function getPostsofFriend(email){

}


async function getPosts(email){
    try{
        
        return  db.query(
        `SELECT post_text , img_url , Posts.created_at  from Posts JOIN users on (Posts.user_id = users.user_id ) where users.email = ? Order by Posts.created_at DESC`,[email]);

    }catch(error){
        console.log("Error when getting post@DB",error);
        return error;
    }
            
    }
    


module.exports = { createPosts , getPosts };