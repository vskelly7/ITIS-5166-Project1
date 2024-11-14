const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const { isGuest, isLoggedIn } = require('../middleware/auth')

//render new user page at /users/new
router.get('/new', isGuest, controller.new);

//create new user
router.post('/new', isGuest, controller.newUser);

//get login page at /users/login
router.get('/login', isGuest, controller.login);

//process login request
router.post('/login', isGuest, controller.processLogin);

//get profile
router.get('/profile', isLoggedIn, controller.profile);

//logout request
router.use('/logout', isLoggedIn, controller.logout);

module.exports = router;