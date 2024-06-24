
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



module.exports = { getFriends , getPeople };
