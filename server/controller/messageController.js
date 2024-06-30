const messageDB = require('../model/messages');

const getMessages = async (req, res) => {
    console.log("Getting messages");
    const { myEmail, fEmail } = req.body;
    const messages = await messageDB.getMessages(myEmail, fEmail);
    // console.log("Messages are ", messages);
    if (!Array.isArray(messages) || messages.length === 0) {
        res.status(200).json({ messages: [] });
        return;
    }
    const messageArray = messages.map((message) => {
        return {
            me: message.user_id == myEmail? true:"",
            msg: message.message_text,
        }})
    res.status(200).json({ messages: messageArray });
    
}

module.exports = { getMessages };