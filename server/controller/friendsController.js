
const DB = require('../model/friends');

const getFriends = async (req, res) => {
    const email = req.body.email;
    if (!email) {
        res.status(400).json({message: 'Didnt provide email'});
        return;
    }
    try {
        const friends = await DB.myFriends(email);
        return res.status(200).json({friends});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
    
}

const getPeople = async (req, res) => {

    const email = req.body.email;
    if (!email) {
        res.status(400).json({message: 'Didnt provide email'});
        return;
    }
    try {
        const people = await DB.myPeople(email);
        console.log(people);
        return res.status(200).json({people});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
    

}

const getFriendRequests = async (req, res) => {
    const email = req.body.email;
    if (!email) {
        res.status(400).json({message: 'Didnt provide email'});
        return;
    }
    try {
        const requests = await DB.getfriendRequests(email);
        console.log(requests);
        const reqs = requests.map((request) => request.user_email);
        console.log(reqs);
        return res.status(200).json(reqs);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}
const HandleFriendRequest = async (req, res) => {
    const userEmail = req.body.myEmail;
    const friendEmail = req.body.Oemail;
    const accepted = req.body.accepted;
    if (!userEmail || !friendEmail) {
        res.status(400).json({message: 'Didnt provide email'});
        return;
    }
    try {
        if (accepted) {
            try{
            await DB.addFriend(userEmail, friendEmail);
            await DB.deleteFriendRequest(friendEmail, userEmail);
            return res.status(200).json({messageFromFriend: 'Friend added'});
            }catch(error){
                console.log("Adding friend and deleting friend request error", error);
            }
        }else{
            await DB.deleteFriendRequest(friendEmail, userEmail);
            return res.status(200).json({messageFromFriend: 'Friend request deleted'});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Error at hhandleFriendRequest'});
    }
}


        



module.exports = { getFriends , getPeople , getFriendRequests  , HandleFriendRequest};
