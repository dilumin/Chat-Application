const express = require('express');
const router = express.Router();
const registerController = require('../controller/registerController');
const authController = require('../controller/authController');
const logoutController = require('../controller/logoutController');
const refreshController = require('../controller/refreshController');


router.get('/', (req, res) => {
    res.json({message: 'Hello World'});
});

router.post('/register' , registerController.handleNewUser);
router.post('/login' , authController.handleAuth);
router.post('/refresh' , refreshController.handleRefresh );
router.post('/logout' , logoutController.handleLogout);
exports.router = router;