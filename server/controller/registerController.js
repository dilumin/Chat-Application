
const { getUsers , getUserbyEmail , createNewUser } =  require('../model/users')

const bcrypt = require('bcrypt');
const handleNewUser = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    
    if (!username || !email || !password) {
        res.status(400).json({message: 'Please provide all required fields'});
        return;
    }
    const YY = await getUserbyEmail(email);
    if ( YY.length > 0) {
        res.status(409).json({message: 'User already exists'});
        return;
    }
    try{
        const HashedPassword = await bcrypt.hash(password, 10);
        await createNewUser(username, email, HashedPassword).then((user) => {
            res.status(201).json({Status: "Success", message: 'User created', user: user})
        }).catch((error) => {
            res.status(500).json({message: 'Could not add ', error: error})
        })
    }catch(error){
        res.status(500).json({message: 'Could not add user', error: error})
    }
}

module.exports = { handleNewUser };