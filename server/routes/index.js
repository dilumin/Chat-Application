const express = require('express');
const router = express.Router();
const registerController = require('../controller/registerController');
const authController = require('../controller/authController');
const logoutController = require('../controller/logoutController');
const refreshController = require('../controller/refreshController');
const friendsController = require('../controller/friendsController')
const messageController = require('../controller/messageController')


router.get('/', (req, res) => {
    res.json({message: 'Hello World'});
});

router.post('/register' , registerController.handleNewUser);
router.post('/login' , authController.handleAuth);
router.post('/refresh' , refreshController.handleRefresh );
router.post('/logout' , logoutController.handleLogout);

router.post('/getPerson' , friendsController.getPeople );

router.post('/getFriendRequests' , friendsController.getFriendRequests);
router.post('/acceptFriendRequest' , friendsController.HandleFriendRequest);

router.post('/getAllMessages' , messageController.getMessages);

router.post('/getFriends' , friendsController.getFriends );

router.post('/myinfo' , authController.myinfo);

exports.router = router;