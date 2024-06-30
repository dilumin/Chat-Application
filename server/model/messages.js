const db = require('./db');

async function AddMsgToDb(from, to, msg) {
    try {
        const chat_id = await db.query("SELECT chat_id FROM friendlist WHERE (user_email = ? AND friend_email = ?  ) OR (user_email = ? AND friend_email = ? )", [from, to, to, from]);
        console.log( "The chat id from the DB",chat_id[0][0].chat_id);
        await db.query("INSERT INTO messages (chat_id, user_id , message_text) VALUES (?, ?, ?)", [chat_id[0][0].chat_id, from, msg]);

    } catch (error) {
        console.log(error);
    }
}


async function getMessages(from, to) {
    try {
        const chat_id = await db.query("SELECT chat_id FROM friendlist WHERE (user_email = ? AND friend_email = ?  ) OR (user_email = ? AND friend_email = ? )", [from, to, to, from]);
        const messages = await db.query("SELECT user_id ,message_text FROM messages WHERE chat_id = ? ", [chat_id[0][0].chat_id]);
        return messages[0];
}
    catch (error) {
        console.log("HEr", from , to);
        console.log("Error in DB when getting messages", error);
    }}
module.exports = { AddMsgToDb , getMessages } 