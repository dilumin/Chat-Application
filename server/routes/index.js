const express = require('express');
const router = express.Router();
const registerController = require('../controller/registerController');
const authController = require('../controller/authController');


router.get('/', (req, res) => {
    res.json({message: 'Hello World'});
});

router.post('/register' , registerController.handleNewUser);
router.post('/login' , authController.handleAuth);

exports.router = router;